import { board, input, output } from "@breadboard-ai/build";

const text = input({ default: "Hello World" });

export default board({
    inputs: { text },
    outputs: {
        text: output(text)
    }
});
