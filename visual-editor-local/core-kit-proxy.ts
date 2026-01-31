import originalRunJavascript from "../node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/run-javascript.js";
console.log("%c[CoreKitProxy] MODULE LOADED", "color:green;font-weight:bold;font-size:16px");

// Re-export everything from the nested, more complete core-kit
export * from "../node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/index.js";
export { default } from "../node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/index.js";

// Override runJavascript to sanitize inputs and remove 'schema' if it's a Symbol
export const runJavascript = (inputs: any) => {
    console.log('[CoreKitProxy] runJavascript called with inputs:', inputs);
    if (inputs && typeof inputs === 'object') {
        if ('schema' in inputs) {
            console.warn('[CoreKitProxy] Removing schema input from runJavascript:', inputs.schema);
            delete inputs.schema;
        }
    }
    // The original export is a NodeDefinition, which is a function.
    // We call it with our sanitized inputs.
    return originalRunJavascript(inputs);
};
