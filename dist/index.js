"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const javascript_obfuscator_1 = __importDefault(require("javascript-obfuscator"));
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const pluginName = "ObfuscatorCode";
const tempFileName = "ObfuscatedFile.js";
class ObfuscatorPlugin {
    constructor(obfuscatorOptionParam) {
        if (obfuscatorOptionParam) {
            this.obfuscatorOption = obfuscatorOptionParam;
        }
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
            if (!(compilation.options.mode === "production") &&
                compilation.outputOptions.filename.endsWith("js"))
                return compilation;
            const compilationFiles = Array.from(compilation.assetsInfo.keys());
            for (let fileName of compilationFiles) {
                const pathFile = `${compilation.outputOptions.path}/${fileName}`;
                const pathTempFile = `${compilation.outputOptions.path}/${tempFileName}`;
                const code = (0, fs_1.readFileSync)(pathFile, { encoding: "utf-8" });
                const obfuscationCode = javascript_obfuscator_1.default
                    .obfuscate(code, this.obfuscatorOption
                    ? this.obfuscatorOption
                    : {
                        renameGlobals: true,
                        compact: true,
                        target: "node",
                        transformObjectKeys: true,
                        stringArray: true,
                        identifierNamesGenerator: "mangled-shuffled",
                        stringArrayEncoding: ["rc4"],
                        splitStrings: true,
                        splitStringsChunkLength: 3,
                    })
                    .getObfuscatedCode();
                (0, fs_1.writeFileSync)(pathFile, obfuscationCode, "utf-8");
                (0, child_process_1.execSync)(`terser ${pathFile} --mangle --compress --toplevel --ecma 2015 -o ${pathTempFile}`);
                (0, child_process_1.execSync)(`rm ${pathFile} && mv ${pathTempFile} ${pathFile}`);
            }
        });
    }
}
exports.default = ObfuscatorPlugin;
