
console.log("Starting test_import...");
import { board } from "@breadboard-ai/build";
console.log("Imported board from @breadboard-ai/build");
import { invokeGraph } from "@google-labs/breadboard";
console.log("Imported invokeGraph from @google-labs/breadboard");
import graph from "./graphs/prompt-to-post.ts";
console.log("Imported graph from ./graphs/prompt-to-post.ts");
console.log("Graph:", graph);
