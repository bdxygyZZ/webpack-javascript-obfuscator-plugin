import { Compiler } from "webpack";
import { TInputOptions } from "javascript-obfuscator/typings/src/types/options/TInputOptions.js";
export interface ObfuscatorOption extends TInputOptions {
}
declare class ObfuscatorPlugin {
    private obfuscatorOption?;
    constructor(obfuscatorOptionParam?: ObfuscatorOption | undefined);
    apply(compiler: Compiler): void;
}
export default ObfuscatorPlugin;
