/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { codeWrapper } from "./proxy-utils";

console.log("%c[BreadboardProxy] MODULE LOADED", "color:blue;font-weight:bold;font-size:16px");

// 1. Export everything from the standard index
export * from "/workspaces/BreadboardAI/node_modules/@google-labs/breadboard/dist/src/index.js";

// 1.5. Legacy exports needed by many Breadboard tools
import { KitBuilder } from "/workspaces/BreadboardAI/node_modules/@google-labs/breadboard/dist/src/legacy/builder.js";
export { KitBuilder };

export class StreamCapability {
    stream: ReadableStream;
    constructor(stream: ReadableStream) {
        this.stream = stream;
    }
}

export const inflateData = (data: any) => data; // Shim
export const asBlob = (data: any) => new Blob([data]); // Shim

export const addKit = (ctor: any) => {
    return (KitBuilder as any).wrap({
        title: ctor.title || "Legacy Kit",
        description: ctor.description || "Legacy Kit",
        version: ctor.version || "0.0.1",
        url: ctor.url || "local://legacy-kit"
    }, ctor.handlers || {});
};

// 2. Specialized exports
export const code = codeWrapper;

/**
 * Checks if a value is a Breadboard Capability.
 */
export const isBreadboardCapability = (value: any) => {
    if (typeof value !== "object" || value === null) return false;
    return value.kind === "board" || value.kind === "stream";
};

/**
 * Checks if a value is a Breadboard Capability of kind 'board'.
 */
export const isBoardCapability = (value: any) => {
    return isBreadboardCapability(value) && value.kind === "board";
};

export const isGraphDescriptorCapability = (capability: any) => {
    const maybe = capability;
    const board = maybe.board;
    return !!board && !!board.edges && !!board.nodes;
};

export const isResolvedURLBoardCapability = (capability: any) => {
    const maybe = capability;
    const url = maybe.url;
    return !!url;
};

export const isUnresolvedPathBoardCapability = (capability: any) => {
    const maybe = capability;
    const path = maybe.path;
    return !!path;
};

export const getGraphDescriptor = async (board: any, context: any) => {
    if (!board) return { success: false, error: "No board provided" };
    if (typeof board === "string") {
        const loaderResult = await context?.graphStore?.load(board, context);
        if (!loaderResult?.success || !loaderResult.graph) {
            throw new Error(`Unable to load graph from "${board}"`);
        }
        return loaderResult;
    } else if (isBreadboardCapability(board)) {
        if (isGraphDescriptorCapability(board)) return { success: true, graph: board.board };
        return { success: false, error: "URL/Path capabilities not fully supported in proxy mock yet" };
    }
    return { success: false, error: "Unable to get GraphDescriptor" };
};

export const resolveBoardCapabilitiesInInputs = (values: any, _context: any, _url: any) => {
    return values; // Passthrough for now
};

export const resolveBoardCapabilities = async (outputs: any, context: any, url: any) => {
    return resolveBoardCapabilitiesInInputs(outputs, context, url);
};
