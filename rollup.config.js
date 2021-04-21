import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
  {
    input: './lib/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      resolve(),
      typescript({
        module: 'esnext',
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
      commonjs({
        extensions: ['.js', '.ts'],
      }),
      terser(),
    ],
  },
  // {
  //   input: "./src/index.d.ts",
  //   output: [{ file: "dist/my-library.d.ts", format: "es" }],
  //   plugins: [dts()],
  // }
];
