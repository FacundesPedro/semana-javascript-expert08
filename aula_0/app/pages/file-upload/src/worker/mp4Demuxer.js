import { createFile } from '../deps/mp4box.0.5.2.js';

export default class Mp4Demuxer {
    #onConfig
    #onChunk
    #file

    constructor(){}

    /**
     * 
     * @param { ReadableStream } stream 
     * @param { object } opt 
     * @param {(config: object) => void} opt.onConfig
     * 
     * @returns {Promise<void>}
     */
    async init(stream, { onConfig, onChunk }) {
        this.#onConfig = onConfig;
        this.#onChunk = onChunk;

        this.#file = createFile();

        this.#file.onReady = this.#onReady.bind(this);
        this.#file.onSamples = this.#onSamples.bind(this);
        this.#file.onError = (error) => {
            debugger;
        }

        return this.#stream(stream);
    }

    #onReady (args) {
        const tracks = args.videoTracks;
        const [track] = tracks;

        this.#onConfig({
            track
        })

        this.#file.setExtractionOptions(track.id);
        this.#file.start();
    }
    #onSamples (trackId, ref, samples) {
        debugger;
    }

    /** 
     * @param {ReadableStream} stream
     *  
     * @return {Promise<void>}
     * 
     */
    async #stream (stream) {
        let _offset = 0;
        
        const writable = new WritableStream({
            /** @param {Uint8Array} chunk */
            write: (chunk) => {
                const buffer = chunk.buffer;
                buffer.fileStart = _offset;
                this.#file.appendBuffer(buffer);

                _offset += chunk.length;
                debugger;
            },
            close: () => {
                debugger;
            }
        });

        return stream.pipeTo(writable)
    }
}