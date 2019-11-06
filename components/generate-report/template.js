export default `
    <style>
    .report-container {
        padding: 1em;
        line-height: 1.3;
    }
    h4 {
        margin: 10px 0 5px;
    }
    p {
        margin: 0 0 5px;
    }
    .image-container {
        width: 0;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
    </style>
    <div>
        <button id="generateButton">Generate!</button>
        <button id="importButton">Import!</button>
    </div>
    <div id="reportContainer" class="report-container"></div>
    <div class="image-container"></div>

`;