/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { codeWrapper, sanitize } from "./proxy-utils";
// Source everything from BBRT modules which provide Node Factories (functions)
import originalRunJavascript from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/run-javascript.js";
import { KitBuilder } from "/workspaces/BreadboardAI/node_modules/@google-labs/breadboard/dist/src/legacy/builder.js";

console.log("%c[CoreKitProxy] MODULE LOADED", "color:green;font-weight:bold;font-size:16px");

// 1. Re-export everything from the standard index
export * from "/workspaces/BreadboardAI/node_modules/@google-labs/core-kit/dist/src/index.js";

// Define BBRT Core Kit Path
const BBRT_CORE = "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/";

// Import nodes from BBRT for Kit Construction and Exports
import fetch from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/fetch.js";
import invoke from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/invoke.js";
import runModule from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/run-module.js";
import secrets, { secret } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/secrets.js";

// Named Exports
export { fetch, invoke, runModule, secrets, secret };

// Legacy supplemental nodes from more complete kit (BBRT)
export { default as passthrough } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/passthrough.js";
export { default as reflect } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/reflect.js";
export { default as map } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/map.js";
export { default as curry } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/curry.js";
export { default as reduce } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/reduce.js";
export { default as slot } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/slot.js";
export { default as append } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/append.js";
export { default as include } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/include.js";
export { default as import } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/import.js";
export { default as batch } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/batch.js";
export { default as resolve } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/resolve.js";
export { default as deflate } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/deflate.js";
export { default as inflate } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/inflate.js";
export { default as service } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/service.js";

// Named exports for specific nodes
import { unnestNode } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/unnest.js";
export { unnestNode };

// Safe wrapper for unnest to handle missing arguments during initialization
export const unnest = Object.assign(
    (config: any) => {
        const safeConfig = (config && config.nested) ? config : { nested: {} };
        return unnestNode(safeConfig);
    },
    unnestNode
);

export { retrieveDataNode as retrieveData } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/retrieveData.js";
export { storeDataNode as storeData } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/storeData.js";

export { KitBuilder };

// Cast helper
export const cast = (ctor: any) => {
    return (KitBuilder as any).wrap({
        title: ctor.title || "Legacy Core Node",
        description: ctor.description || "Legacy Core Node",
        version: ctor.version || "0.0.1",
        url: ctor.url || "local://legacy-core-node"
    }, ctor.handlers || {});
};

// Specialized Code Node
export const code = codeWrapper;

// Specialized RunJavascript
// Must be callable (factory) AND have invoke property (handler).
export const runJavascript = Object.assign(
    (config: any) => (originalRunJavascript as any)(config),
    originalRunJavascript,
    {
        invoke: (inputs: any) => {
            // console.log('[CoreKitProxy] runJavascript() intercepted');
            return originalRunJavascript.invoke(sanitize(inputs));
        }
    }
);

// DEFAULT EXPORT: Must be the Kit Class
const builder = new KitBuilder({
    title: "Core Kit",
    description: "A Breadboard kit that enables composition and reuse of boards",
    version: "0.0.1",
    url: "npm:@google-labs/core-kit",
});

const Core = builder.build({
    invoke,
    fetch,
    runJavascript, // Uses our wrapper object
    runModule,
    secrets,
});

export default Core;
