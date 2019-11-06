export default `
<style>
    .debug-container {
        margin: 1em;
        box-sizing: border-box;
        color: red;
    }
</style>
<form action="#">
    <fieldset>
        <label for="fileSelector" id="test">Select an Image file</label>
        <input type="file" id="fileSelector" />
    </fieldset>
</form>
<div class="debug-container" id="debugContainer"></div>
`;