/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { code as originalCode } from "/workspaces/BreadboardAI/node_modules/@breadboard-ai/bbrt/node_modules/@google-labs/core-kit/dist/src/nodes/code.js";

/**
 * Sanitizes input for runJavascript/code by removing Symbols and 'schema' property.
 * This prevents the 'Symbol(nodejs.util.inspect.custom)' error in browser environments.
 */
const CYCLE = Symbol('CYCLE');

export function sanitize(obj: any, visited = new WeakSet()): any {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (visited.has(obj)) return CYCLE;
    visited.add(obj);

    if (Array.isArray(obj)) {
        return obj.map(v => sanitize(v, visited)).filter(v => v !== CYCLE);
    }

    const clean: any = {};
    for (const key of Object.keys(obj)) {
        if (key === 'schema') continue;
        const val = obj[key];
        if (typeof val === 'symbol') continue;

        const sanitized = sanitize(val, visited);
        if (sanitized !== CYCLE) {
            clean[key] = sanitized;
        }
    }
    return clean;
}

/**
 * Sophisticated code() wrapper that handles legacy signatures and sanitization.
 */
export function codeWrapper(inputs: any, outputs: any, fn: any) {
    // console.log('[ProxyUtils] codeWrapper() called', { inputsType: typeof inputs, outputsType: typeof outputs, fnType: typeof fn, inputsIsFunc: typeof inputs === 'function' });

    // For legacy signatures or when invoked from higher level kits
    if (typeof inputs === 'function') {
        const handler = (originalCode as any);
        return handler(inputs);
    }

    const handler = (originalCode as any);
    return handler(sanitize(inputs), outputs, fn);
}
