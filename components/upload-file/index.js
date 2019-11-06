import template from './template';


export default class UploadFile extends HTMLElement {
    constructor() {
        super();
        UploadFile.template = document.createElement('template').innerHTML = template;
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = UploadFile.template;

        this.fileSelector = this.shadowRoot.querySelector('#fileSelector');
        this.debugContainer = this.shadowRoot.querySelector('#debugContainer');
    }
    connectedCallback() {
        this.fileSelector.addEventListener('change', e => {this.selectFile(e)});
    }
    log(msg) {
        // show debug/state message on screen
        this.debugContainer.innerHTML += '<p>' + msg + '</p>';
    }
    selectFile(e) {
        // get all selected Files
        var files = e.target.files;
        var file;
        for (var i = 0; i < files.length; ++i) {
            file = files[i];
            // check if file is valid Image (just a MIME check)
            switch (file.type) {
                case 'image/jpeg':
                case 'image/png':
                case 'image/gif':
                    this.fileName =file.name;
                    this.image = new Image();
                    this.image.src = window.URL.createObjectURL(file);

                    let eventData = {
                        fileName: this.fileName,
                        image: this.image
                    };
                    let event = new CustomEvent('fileOploaded', {detail: eventData});
                    document.dispatchEvent(event);
                    return;
                default:
                    this.log(`not a valid Image file: ${file.name}`);
            }
        }
    }
    disconnectedCallback() {
        this.fileSelector.removeEventListener('change', e => {this.selectFile(e)});
    }
  }
window.customElements.define('upload-file', UploadFile);
