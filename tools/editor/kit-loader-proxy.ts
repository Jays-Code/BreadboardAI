/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { asRuntimeKit } from "@google-labs/breadboard";
import { kitFromGraphDescriptor, registerKitGraphs } from "@google-labs/breadboard/kits";
// @ts-ignore
import GoogleDriveKit from "@breadboard-ai/google-drive-kit/google-drive.kit.json" with { type: "json" };
// @ts-ignore
import PythonWasmKit from "@breadboard-ai/python-wasm";
// @ts-ignore
import AgentKit from "@google-labs/agent-kit/agent.kit.json" with { type: "json" };
import Core from "@google-labs/core-kit"; // Resolves to core-kit-proxy via Vite alias
import GeminiKit from "@google-labs/gemini-kit";
import JSONKit from "@google-labs/json-kit";
import TemplateKit from "@google-labs/template-kit";

export function registerLegacyKits(graphStore: any) {
    try {
        registerKitGraphs([AgentKit, GoogleDriveKit], graphStore);
    } catch (e) {
        console.warn("[KitLoaderProxy] Failed to register legacy kits:", e);
    }
}

export const loadKits = () => {
    console.log("[KitLoaderProxy] Loading kits...");
    const kits = [];

    // Core Kit (Proxied)
    try {
        kits.push(asRuntimeKit(Core));
    } catch (e) {
        console.error("[KitLoaderProxy] Error loading Core kit:", e);
    }

    // Other Kits
    try { kits.push(asRuntimeKit(JSONKit)); } catch (e) { console.error("[KitLoaderProxy] Error loading JSON kit:", e); }
    try { kits.push(asRuntimeKit(TemplateKit)); } catch (e) { console.error("[KitLoaderProxy] Error loading Template kit:", e); }
    try { kits.push(asRuntimeKit(GeminiKit)); } catch (e) { console.error("[KitLoaderProxy] Error loading Gemini kit:", e); }
    try { kits.push(asRuntimeKit(PythonWasmKit)); } catch (e) { console.error("[KitLoaderProxy] Error loading PythonWasm kit:", e); }

    // Graph Descriptor Kits
    try {
        const agentKit = kitFromGraphDescriptor(AgentKit);
        if (agentKit) kits.push(agentKit);
    } catch (e) {
        console.warn("[KitLoaderProxy] Failed to load AgentKit:", e);
    }

    try {
        const googleDriveKit = kitFromGraphDescriptor(GoogleDriveKit);
        if (googleDriveKit) kits.push(googleDriveKit);
    } catch (e) {
        console.warn("[KitLoaderProxy] Failed to load GoogleDriveKit:", e);
    }

    return kits;
};
