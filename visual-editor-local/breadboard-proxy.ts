/**
 * This proxy module resolves export inconsistencies between @google-labs/breadboard 
 * and other packages in the environment.
 */

// 1. Export everything from the unminified standard breadboard bundle.
// This includes writablePathFromString and other core exports.
export * from "../node_modules/@google-labs/breadboard/dist/src/index.js";

// 2. Polyfill missing Capability guards and types that shared-ui/core-kit expects.
// These are functionally identical to the ones in the canonical breadboard source.

export function isGraphDescriptorCapability(o: any): boolean {
    return o && typeof o === "object" && o.kind === "graph";
}

export function isResolvedURLBoardCapability(o: any): boolean {
    return o && typeof o === "object" && o.kind === "board" && "url" in o;
}

export function isUnresolvedPathBoardCapability(o: any): boolean {
    return o && typeof o === "object" && o.kind === "board" && "path" in o;
}

export function isDataCapability(o: any): boolean {
    return o && typeof o === "object" && (o.kind === "data" || "inlineData" in o || "storedData" in o);
}
console.log("%c[BreadboardProxy] MODULE LOADED", "color:green;font-weight:bold;font-size:16px");

// StreamCapability is used by core-kit's fetch node.
export const StreamCapability = "stream";

/**
 * Legacy addKit helper. 
 * In newer Breadboard, kits are often used directly or via factories.
 * core-kit uses it like: export const core = addKit(Core);
 */
export function addKit(ctor: any) {
    if (typeof ctor === 'function') {
        try {
            // Try to instantiate it as a legacy kit.
            return new ctor();
        } catch (e) {
            // If it's not a constructor, return as is.
            return ctor;
        }
    }
    return ctor;
}

// Export 'code' which json-kit expects from breadboard, but is now in core-kit.
// We also need to be careful about the 'schema' property which can cause Symbol errors if not handled.
import { code as originalCode } from "../node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/code.js";

export function code(inputs: any, outputs: any, fn: any) {
    console.log('[BreadboardProxy] code() called', { inputsType: typeof inputs, outputsType: typeof outputs, fnType: typeof fn, inputsIsFunc: typeof inputs === 'function' });

    // Handle legacy signature code(fn) or code(fn, config) where inputs is the function
    if (typeof inputs === 'function') {
        console.log('[BreadboardProxy] Detected legacy code(fn) signature');
        fn = inputs;
        inputs = { "*": "unknown" }; // Wildcard inputs
        outputs = { "*": "unknown" }; // Wildcard outputs
    }

    // Santize inputs: remove any Symbols that might confuse serialization/validation
    const safeInputs = { ...inputs };
    for (const key in safeInputs) {
        if (typeof safeInputs[key] === 'symbol') {
            console.warn('[BreadboardProxy] Removing symbol input:', key);
            delete safeInputs[key];
        }
    }
    // Explicitly kill 'schema' if it's there, as it conflicts with the port definition
    if ('schema' in safeInputs) {
        delete safeInputs.schema;
    }

    return originalCode(safeInputs, outputs, fn);
}
