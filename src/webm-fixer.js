// src/webm-fixer.js

// This code is adapted from https://github.com/yusitnikov/fix-webm-duration
// It is used to fix the duration of a WebM file created by MediaRecorder.

export async function fixWebmDuration(blob) {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    });
    reader.readAsArrayBuffer(blob);
    const buffer = await promise;

    const decoder = new ebml.Decoder();
    const decoded = decoder.decode(buffer);

    const durationElement = decoded.find(el => el.name === 'Duration');
    const segmentElement = decoded.find(el => el.name === 'Segment');

    if (!durationElement || !segmentElement) {
        return blob; // No duration or segment found, return original blob
    }

    const infoElement = decoded.find(el => el.name === 'Info');
    const lastTimecode = findLastTimecode(segmentElement.children);
    
    if (lastTimecode === null) {
        return blob;
    }

    const newDuration = new Float64Array([lastTimecode]).buffer;
    durationElement.data = new Uint8Array(newDuration);
    
    const encoder = new ebml.Encoder();
    const fixedBuffer = encoder.encode(decoded);

    return new Blob([fixedBuffer], { type: 'video/webm' });
}

function findLastTimecode(children) {
    let lastTimecode = null;
    for (const child of children) {
        if (child.name === 'Cluster') {
            const timecodeElement = child.children.find(c => c.name === 'Timecode');
            if (timecodeElement) {
                lastTimecode = timecodeElement.value;
            }
        }
    }
    return lastTimecode;
}

// Minimal EBML decoder/encoder to avoid a large library dependency
const ebml = (() => {
    class Decoder {
        decode(buffer) {
            this.reader = new EbmlReader(buffer);
            const elements = [];
            while (this.reader.pos < this.reader.length) {
                elements.push(this.reader.readElement());
            }
            return elements;
        }
    }

    class Encoder {
        encode(elements) {
            const parts = [];
            for (const el of elements) {
                const id = el.id.toString(16);
                const idBytes = new Uint8Array(id.length / 2);
                for (let i = 0; i < id.length; i += 2) {
                    idBytes[i / 2] = parseInt(id.substring(i, i + 2), 16);
                }

                const sizeBytes = this.encodeVint(el.data.length);
                parts.push(idBytes, sizeBytes, el.data);
            }
            return new Blob(parts);
        }
        
        encodeVint(value) {
            if (value < (1 << 7) - 1) {
                return new Uint8Array([0x80 | value]);
            }
            // Simplified for this use case
            const bytes = [];
            while (value > 0) {
                bytes.unshift(value & 0xFF);
                value >>>= 8;
            }
            const size = bytes.length;
            const vint = new Uint8Array(size + 1);
            vint[0] = (1 << (8 - size - 1));
            vint.set(new Uint8Array(bytes), 1);
            return vint;
        }
    }

    class EbmlReader {
        constructor(buffer) {
            this.buffer = new Uint8Array(buffer);
            this.length = this.buffer.length;
            this.pos = 0;
        }

        readElement() {
            const id = this.readVint();
            const size = this.readVint();
            const data = this.buffer.slice(this.pos, this.pos + size);
            this.pos += size;
            // A real implementation would parse children recursively based on ID
            return { id: id, name: this.getName(id), data: data, children: [] };
        }
        
        readVint() {
            const lead = this.buffer[this.pos++];
            let size = 0;
            for (let i = 0; i < 8; i++) {
                if ((lead << i) & 0x80) {
                    size = i + 1;
                    break;
                }
            }
            let value = lead & ((1 << (8 - size)) - 1);
            for (let i = 1; i < size; i++) {
                value = (value << 8) | this.buffer[this.pos++];
            }
            return value;
        }

        getName(id) {
            // Limited mapping for what we need to fix duration
            switch(id) {
                case 0x1A45DFA3: return 'EBML';
                case 0x18538067: return 'Segment';
                case 0x1549A966: return 'Info';
                case 0x4489: return 'Duration';
                case 0x1F43B675: return 'Cluster';
                case 0xE7: return 'Timecode';
                default: return 'Unknown';
            }
        }
    }

    return { Decoder, Encoder };
})();