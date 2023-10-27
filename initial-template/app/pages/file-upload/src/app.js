import Clock from './deps/clock.js';
import { View } from './view.js';

const view = new View();
const clock = new Clock();

view.configFileChange((file) => {
    clock.start((time) => {
        // took = time;
        view.updateElapsedTime(time)
    })

    setTimeout(() => {
        clock.stop()
        view.updateElapsedTime(time, { finish: true })
    }, 5000)
})

async function mockFetch() {
    // const filepath = '/videos/frag_bunny.mp4';
    const response = await fetch('/videos/frag_bunny.mp4',
    {
        method: 'HEAD'
    });
    // debugger;
}

mockFetch()

