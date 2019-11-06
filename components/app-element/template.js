export default `
    <style>
        body {
            height: 100%;
        }
        :host {
            font-family: Helvetica, Verdana, sans-serif;
            line-height: 1.5em;
        }
        .columns {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .column {
            width: 45%;
            margin: 5px;
            border: 1px solid #000;
            vertical-align: top;
        }
        p {
            margin: 0 0 5px;
        }
    </style>
    <h1>Test application</h1>
    <p>
        Your application is ready. There should be a message in your browsers
        console indicating the JavaScript application has loaded.
    </p>
    <upload-file></upload-file>
    <div class="columns">
        <div class="column">
            <image-element></image-element>
        </div>
        <div class="column">
            <generate-report></generate-report>
        </div>
    </div>
`;