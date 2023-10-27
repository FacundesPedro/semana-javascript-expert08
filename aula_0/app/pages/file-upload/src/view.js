

export class View {
    #fileUpload = document.getElementById('fileUpload')
    #btnUploadVideo = document.getElementById('btnUploadVideos')
    #fileSize = document.getElementById('fileSize')
    #fileInfo = document.getElementById('fileInfo')
    #txtfileName = document.getElementById('fileName')
    #fileUploadWrapper = document.getElementById('fileUploadWrapper')
    #elapsed = document.getElementById('elapsed')
    #canvas = document.getElementById('preview-144p')
    
    constructor(){
        this.#configBtnUploadClick()
    }

    #onChange(func) {
        return (evt) => {
            const file = evt.target.files[0]
            const { name, size } = file
            func(file)

            this.#txtfileName.innerText = name
            this.#fileSize.innerText = this.#parseBytesIntoMBAndGB(size)
            this.#fileInfo.classList.remove('hide')
            this.#fileUploadWrapper.classList.add('hide')
        
        }
    }
    #configBtnUploadClick() {
        this.#btnUploadVideo.addEventListener('click', () => {
            // trigger file input
            this.#fileUpload.click()
        })
    }
    #parseBytesIntoMBAndGB(bytes) {
        const mb = bytes / (1024 * 1024)
        // if mb is greater than 1024, then convert to GB
        if (mb > 1024) {
            // rount to 2 decimal places
            return `${Math.round(mb / 1024)}GB`
        }
        return `${Math.round(mb)}MB`
    }
    
    updateElapsedTime(time = "",  opt = { finish:false }) {
        let str;

        if(opt.finish) {
            str = `Process took ${time.replace('ago', '')}`;
        } else {
            str = `Process started ${time}`;
        }

        this.#elapsed.innerText = str;
    }
    configFileChange(func) {
        this.#fileUpload.addEventListener('change', this.#onChange(func))
    }
}