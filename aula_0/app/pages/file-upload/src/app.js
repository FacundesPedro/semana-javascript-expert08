import Clock from './deps/clock.js';
import { View } from './view.js';

const view = new View();
const clock = new Clock();
const worker = new Worker('./src/worker/worker.js', { type: 'module' });

worker.onmessage = ({data}) => console.log('Worker mandou essa mensagem: \n', data)

view.configFileChange((file) => {
    let took;

    worker.postMessage({ file });
    
    clock.start((time) => {
        took = time;
        view.updateElapsedTime(took)
    })
})
    
async function mockFileChange() {
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

mockFileChange();

