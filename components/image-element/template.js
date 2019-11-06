export default `
    <style>
        .image-container {
            margin: 1em;
            box-sizing: border-box;
        }
        .image-container {
            height: var(--height);
            overflow: hidden;
        }
        .image-container img {
            width: 100%;
        }
        canvas {
            width: 15in;
            height: 10in;
            transform: translate(0,0) scale(var(--scale));
            transform-origin: 0 0;
        }
        p {
            margin: 0 0 5px;
        }
    </style>
    <div class="buttons">
        <button id="buttonMoveUp">Move up</button>
        <button id="buttonMoveDown">Move down</button>
        <button id="buttonMoveLeft">Move left</button>
        <button id="buttonMoveRight">Move right</button>

        <button id="buttonZoomIn">Zoom in</button>
        <button id="buttonZoomOut">Zoom out</button>
    </div>
    <div id="imageContainer" class="image-container">
        <canvas id="canvas"></canvas>
    </div>
`;