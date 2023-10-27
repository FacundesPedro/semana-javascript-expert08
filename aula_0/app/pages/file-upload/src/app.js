import Clock from './deps/clock.js';
import { View } from './view.js';

const view = new View();
const clock = new Clock();

view.configFileChange((file) => {
    let took;
    clock.start((time) => {
        took = time;
        view.updateElapsedTime(took)
    })

    setTimeout(() => {
        clock.stop()
        view.updateElapsedTime(took, { finish: true })
    }, 5000)
})
    
async function mockFetch() {
    const filepath = '/videos/frag_bunny.mp4';
    const response = await fetch(filepath);
    // await response.blob()
    // const lenght = response.headers.get('content-lenght')
    // debugger;
    const file = new File([await response.blob()], filepath, { type:'video/mp4', lastModified: Date.now() });

    const evt = new Event('change');
    Reflect.defineProperty(
        evt,
        'target',
        {value: { files: [file] }}
    ) 
    
    document.getElementById('fileUpload').dispatchEvent(evt);

}

mockFetch()

