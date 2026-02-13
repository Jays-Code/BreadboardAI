const fs = require('fs');
const targetFile = 'g:\\My Drive\\CodingProjects\\BreadboardAI\\main.ipynb';

try {
    const rawData = fs.readFileSync(targetFile, 'utf8');
    const data = JSON.parse(rawData);

    // Patch Cell 3 (Index 2)
    const cell = data.cells[2];
    if (cell && cell.source) {
        let fullContent = cell.source.join('');

        // Target the UI block we added previously
        const uiBlockMarker = '# 7. Access Links'; // Or the updated header
        // Actually, let's look for a unique string from the previous state
        // "from IPython.display import HTML, display" is a good anchor for the UI block

        // We will replace everything from the start of the UI block to the end of the cell
        // The UI block started with "# 7." in previous versions, let's just find the last "else:" block 
        // to be safe, as that's where the success logic is.

        const elseMarker = '        else:\n';
        const elseIndex = fullContent.lastIndexOf(elseMarker);

        if (elseIndex !== -1) {
            const beforeElse = fullContent.substring(0, elseIndex + elseMarker.length);

            const newIframeBlock =
                `            # 7. UI Access (Embedded IFrame Strategy)
            print("🚀 Servers are active. Embedding application below...")
            
            # Verify ports are actually listening
            print("🔍 Port Status (Internal VM):")
            get_ipython().system("netstat -tuln | grep -E ':3000|:5173'")

            try:
                from google.colab import output
                # Allow external access to the iframe
                output.serve_kernel_port_as_iframe(5173, path="/", height=800)
            except Exception as e:
                print(f"❌ Error embedding Iframe: {e}")
`;

            cell.source = (beforeElse + newIframeBlock).split('\n').map((line, i, arr) => i === arr.length - 1 ? line : line + '\n');
        } else {
            console.log("Could not find 'else:' block in Cell 3. Patching might be incorrectly targeting.");
        }
    }

    fs.writeFileSync(targetFile, JSON.stringify(data, null, 1));
    console.log("Patched main.ipynb to use Embedded Iframes.");

} catch (err) {
    console.error("Patch failed: " + err.message);
    process.exit(1);
}
