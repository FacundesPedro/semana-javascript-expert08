
class VideoProcessor {
    #mp4Demuxer
    /**
     * 
     * @param {Object} opt 
     * @param {import('./mp4Demuxer.js').default} opt.mp4Demuxer
     * 
     */
    constructor({ mp4Demuxer }) {
        this.#mp4Demuxer = mp4Demuxer;
    }

    async init({ file, encoderConfig, send }) {
        const stream = file.stream();
        const fileName = file.name.split('/').pop().replace('.mp4', '');
        this.#mp4Decoder(stream);
        // debugger
    }

    async #mp4Decoder(stream, encoderConfig) {
        this.#mp4Demuxer.init(stream,
            {
                onConfig: (config) => {
                    debugger;
                },
                onChunk: (chunk) => {
                    debugger;
                }
            }
        );
    }
}

export default VideoProcessor;
export {
    VideoProcessor,
}