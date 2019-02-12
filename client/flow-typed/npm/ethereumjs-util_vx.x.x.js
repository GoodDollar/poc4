// flow-typed signature: 601f6a54e5be21bba89923c7a2622379
// flow-typed version: <<STUB>>/ethereumjs-util_v5.2.0/flow_v0.92.1

/**
 * This is an autogenerated libdef stub for:
 *
 *   'ethereumjs-util'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'ethereumjs-util' {
  declare function privateToPublic(privateKey: Buffer): Buffer;
  declare function privateToAddress(privateKey: Buffer): Buffer;
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'ethereumjs-util/dist/index' {
  declare module.exports: any;
}

// Filename aliases
declare module 'ethereumjs-util/dist/index.js' {
  declare module.exports: $Exports<'ethereumjs-util/dist/index'>;
}
