import graph from "../boards/prompt-to-post.ts";
import { serialize } from "@breadboard-ai/build";
import fs from "fs";

const bgl = serialize(graph);
fs.writeFileSync("src/boards/prompt-to-post.bgl.json", JSON.stringify(bgl, null, 2));
console.log("Serialized graph to src/boards/prompt-to-post.bgl.json");
