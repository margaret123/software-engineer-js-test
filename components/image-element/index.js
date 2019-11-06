import template from './template';

export const CANVAS_WIDTH = 15;
export const CANVAS_HEIGHT = 10;
export const MOVE_STEP = 10;
export const ZOOM_STEP = 2;
export const MAX_ZOOM = 4;
export const MIN_ZOOM = 1;

export default class ImageElement extends HTMLElement {
    constructor() {
        super();
        ImageElement.template = document.createElement('template').innerHTML = template;
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = ImageElement.template;

        this.imageContainer = this.shadowRoot.querySelector('#imageContainer');
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.buttonUp = this.shadowRoot.querySelector('#buttonMoveUp');
        this.buttonDown = this.shadowRoot.querySelector('#buttonMoveDown');
        this.buttonLeft = this.shadowRoot.querySelector('#buttonMoveLeft');
        this.buttonRight = this.shadowRoot.querySelector('#buttonMoveRight');
        this.buttonZoomIn = this.shadowRoot.querySelector('#buttonZoomIn');
        this.buttonZoomOut = this.shadowRoot.querySelector('#buttonZoomOut');
    }
    connectedCallback() {
        this.loadCanvas();
        
        this.buttonUp.addEventListener('click', () => {this.moveImageUp()});
        this.buttonDown.addEventListener('click', () => {this.moveImageDown()});
        this.buttonLeft.addEventListener('click', () => {this.moveImageLeft()});
        this.buttonRight.addEventListener('click', () => {this.moveImageRight()});
        this.buttonZoomIn.addEventListener('click', () => {this.zoomIn()});
        this.buttonZoomOut.addEventListener('click', () => {this.zoomOut()});

        document.addEventListener('fileOploaded', (e) => {this.fileUploaded(e)});
        document.addEventListener('importImage', e => {this.importImage(e)});
        document.addEventListener('needDataForReport', () => {this.SendDataForReport()})
    }
    get parameters() {
        return {
            dpi: this.dpi,
            renderableWidth: this.renderableWidth,
            renderableHeight: this.renderableHeight,
            xStart: this.xStart,
            yStart: this.yStart,
            fileName: this.fileName,
            zoom: this.zoom,
            image: this.image
        }
    }
    SendDataForReport() {
        let event = new CustomEvent('sentDataForReport', {detail: this.parameters});
        document.dispatchEvent(event);
    }
    loadCanvas() {
        const scaleOption = this.imageContainer.clientWidth / this.canvas.clientWidth;
        this.dpi = this.canvas.clientWidth / CANVAS_WIDTH;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        const ration = this.canvas.width / this.canvas.height;
        const imageContainerHeight = this.imageContainer.clientWidth / ration;
        this.imageContainer.style = `--scale: ${scaleOption}; --height: ${imageContainerHeight}px;`;
    }

    fileUploaded(e) {
        this.image = e.detail.image;
        this.fileName = e.detail.fileName;

        this.image.onload = () => {
            this.xStart = 0;
            this.yStart = 0;
            this.zoom = 1;
            this.fitImageOn();
        }
    }

    fitImageOn () {
        var imageAspectRatio = this.image.width / this.image.height;
        var canvasAspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
        
    
        // If image's aspect ratio is less than canvas's we fit on height
        // and place the image centrally along width
        if(imageAspectRatio < canvasAspectRatio) {
            this.renderableWidth = this.canvas.clientWidth
            this.renderableHeight = this.renderableWidth / imageAspectRatio;
        }
    
        // If image's aspect ratio is greater than canvas's we fit on width
        // and place the image centrally along height
        else if(imageAspectRatio > canvasAspectRatio) {
            this.renderableHeight = this.canvas.clientHeight;
            this.renderableWidth = this.renderableHeight * imageAspectRatio;
        }
    
        // Happy path - keep aspect ratio
        else {
            this.renderableHeight = this.canvas.clientHeight;
            this.renderableWidth = this.canvas.clientWidth;
        }
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        if (this.zoom) {
            this.renderableWidth = this.renderableWidth * this.zoom;
            this.renderableHeight = this.renderableHeight * this.zoom;
        }
        this.ctx.drawImage(this.image, this.xStart, this.yStart, this.renderableWidth, this.renderableHeight);
    }

    importImage(e) {
        this.fileName = e.detail.fileName;
        this.image = e.detail.image;
        this.xStart = e.detail.xStart;
        this.yStart = e.detail.yStart;
        this.zoom = e.detail.zoom;
        this.fitImageOn();

        let event = new CustomEvent('sentDataForReport', {detail: this.parameters});
        document.dispatchEvent(event);
    }

    moveImageUp() {
        let movingLength = this.renderableHeight - this.canvas.height;
        if (Math.abs(this.yStart) < movingLength) {
            let diff = movingLength - Math.abs(this.yStart);
            if (diff < MOVE_STEP) {
                this.yStart = this.yStart - diff;
            } else {
                this.yStart = this.yStart - MOVE_STEP;
            }
            this.fitImageOn()
        }
    }

    moveImageDown() {
        if (this.yStart < 0) {
            if (Math.abs(this.yStart) < MOVE_STEP) {
                this.yStart = this.yStart + Math.abs(this.yStart);
            } else {
                this.yStart = this.yStart + MOVE_STEP;
            }
            this.fitImageOn()
        }
    }

    moveImageLeft() {
        let movingLength = this.renderableWidth - this.canvas.width;
        if (Math.abs(this.xStart) < movingLength) {
            let diff = movingLength - Math.abs(this.xStart);
            if (diff < MOVE_STEP) {
                this.xStart = this.xStart - diff;
            } else {
                this.xStart = this.xStart - MOVE_STEP;
            }
            this.fitImageOn()
        }
    }

    moveImageRight() {
        if (this.xStart < 0) {
            if (Math.abs(this.xStart) < MOVE_STEP) {
                this.xStart = this.xStart + Math.abs(xStart);
            } else {
                this.xStart = this.xStart + MOVE_STEP;
            }
            this.fitImageOn()
        }
    }

    zoomIn() {
        if (this.zoom < MAX_ZOOM) {
            this.zoom = this.zoom * ZOOM_STEP;
        }
        this.fitImageOn()
    }

    zoomOut() {
        if (this.zoom > MIN_ZOOM) {
            this.zoom = this.zoom / ZOOM_STEP;
        }
        this.xStart = 0;
        this.yStart = 0;
        this.fitImageOn()
    }
}
window.customElements.define('image-element', ImageElement);
