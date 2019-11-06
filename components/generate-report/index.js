import template from './template';
import {CANVAS_WIDTH, CANVAS_HEIGHT} from '../image-element/index'


export default class GenerateReport extends HTMLElement {
    constructor() {
        super();
        GenerateReport.template = document.createElement('template').innerHTML = template;
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = GenerateReport.template;

        this.generateButton = this.shadowRoot.querySelector('#generateButton');
        this.reportContainer = this.shadowRoot.querySelector('#reportContainer');
        this.imageContainer = this.shadowRoot.querySelector('.image-container');
        this.importButton = this.shadowRoot.querySelector('#importButton');
        this.printReports = [];
    }
    connectedCallback() {
        this.generateButton.addEventListener('click', () => {this.askDataForReport()});
        this.importButton.addEventListener('click', () => {this.importImage()})
        document.addEventListener('sentDataForReport', e => {this.generatereport(e)});
    }
    
    disconnectedCallback() {
        this.generateButton.removeEventListener('click', () => {this.askDataForReport()});
        this.importButton.removeEventListener('click', () => {this.importImage()})
        document.removeEventListener('sentDataForReport', (e) => {this.generatereport()});
    }

    askDataForReport() {
        let event = new CustomEvent('needDataForReport')
        document.dispatchEvent(event);
    }
    generatereport(e) {
        let params = e.detail;
        let widthInch = params.renderableWidth / params.dpi;
        let heightInch = params.renderableHeight / params.dpi;
        let xStartInch = params.xStart / params.dpi;
        let yStartInch = params.yStart / params.dpi;
     
        let printReport = {
            canvas: {
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT
            },
            photo: {
                id: params.fileName,
                width: params.renderableWidth,
                widthInch: widthInch,
                height: params.renderableHeight,
                heightInch: heightInch,
                x: params.xStart,
                y: params.yStart,
                xInch: xStartInch,
                yInch: yStartInch,
                zoom: params.zoom
            }
        };
    
        if(this.printReports.length == 2) {
            this.printReports.splice(0, 1);
        }
        this.printReports.push(printReport);
    
        let images = this.imageContainer.querySelectorAll('img');
        if (images.length === 2) {
            this.imageContainer.removeChild(images[0]);  
        }
        this.imageContainer.appendChild(params.image);
    
        let string = `
        <h4>Canvas:</h4>
            <p>width: ${CANVAS_WIDTH},</p>
            <p>height: ${CANVAS_HEIGHT}</p>
        <h4>Photo:</h4>
            <p>id: ${params.fileName}</p>
            <p>width: ${widthInch},</p>
            <p>height: ${heightInch},</p>
            <p>x: ${xStartInch}</p>
            <p>y: ${yStartInch}</p>
        `;
        this.reportContainer.innerHTML = string;
    }
    importImage() {
        let printReport = this.printReports[0];
        let images = this.imageContainer.querySelectorAll('img');

        let data = {
            fileName: printReport.photo.id,
            image: images[0],
            xStart: printReport.photo.x,
            yStart: printReport.photo.y,
            zoom: printReport.photo.zoom
        }
        let event = new CustomEvent('importImage', {detail: data});
        document.dispatchEvent(event);
    }
  }
window.customElements.define('generate-report', GenerateReport);
