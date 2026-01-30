import graph from "./graphs/prompt-to-post.ts";
import { serialize } from "@breadboard-ai/build";
import fs from "fs";

const bgl = serialize(graph);
fs.writeFileSync("src/graphs/prompt-to-post.bgl.json", JSON.stringify(bgl, null, 2));
console.log("Serialized graph to src/graphs/prompt-to-post.bgl.json");
