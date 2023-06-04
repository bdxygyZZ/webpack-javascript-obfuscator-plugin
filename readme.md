# @bdxygy/webpack-javascript-obfuscator-plugin

This package is the successor of javascript-obfuscator specifically designed for the webpack environment. It performs obfuscation after webpack has completed the afterEmit lifecycle.

## Link for go to javascript-obfuscator
```link
https://github.com/javascript-obfuscator/webpack-obfuscator
```

## Here's an example of how to use this package:
```bash
... // webpack.config.js
plugins: [new ObfuscatorCode({
    renameGlobals: true,
    compact: true,
    target: "node",
    transformObjectKeys: true,
    stringArray: true,
    identifierNamesGenerator: "mangled-shuffled",
    stringArrayEncoding: ["rc4"],
    splitStrings: true,
    splitStringsChunkLength: 3,
  })],
}
// This is the default configuration for this plugin. 
If you believe there are no changes needed, you can remove the parameters from the plugin object
so that they are implicitly set, and it won't cause any issues.
```

If you want to learn more about obfuscation performance or access documentation about **@bdxygy/webpack-javascript-obfuscator-plugin** you can simply visit the documentation of javascript-obfuscator at https://github.com/javascript-obfuscator/javascript-obfuscator. There, you can find detailed information and resources regarding the plugin.