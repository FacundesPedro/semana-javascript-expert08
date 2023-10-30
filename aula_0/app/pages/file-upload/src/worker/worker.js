import {VideoProcessor} from "./videoProcessor.js";
import Mp4Demuxer from "./mp4Demuxer.js";

const qvgaConstraints = {
    width: 320,
    height: 240,
}
const vgaConstraints = {
    width: 640,
    height: 480,
}
const hdConstraints = {
    width: 1280,
    height: 720,
}
const encoderConfig = {
    ...qvgaConstraints,
    bitrage: 10e6,
    //WEBM
    codec: 'vp09.00.10.08',
    pt: 4,
    hardwareAcceleration: 'prefer-software',
    // MP4
    // codec: 'avc1.42002A',
    // pt: 1,
    // hardwareAcceleration: 'hardware',
    // avc: {format: 'annexb'}
}

// const VideoProcessor = (await import('./videoProcessor.js')).default;
// const Mp4Demuxer = (await import('./mp4Demuxer.js')).default;
const videoProcessor = new VideoProcessor({
    mp4Demuxer: new Mp4Demuxer(),
});

onmessage = async ({ data }) => {
    if (data.file) {

        await videoProcessor.init({
            file: data.file,
            encoderConfig,
            send: (msg) => self.postMessage(msg)
        });
    }

    self.postMessage('Ok from worker!')
}