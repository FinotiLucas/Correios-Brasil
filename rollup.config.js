import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import dts from "rollup-plugin-dts"
import pkg from './package.json'

export default [{
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [resolve(), typescript({
    module: 'CommonJS',
    tsconfig: './tsconfig.json'
  }), commonjs({
    extensions: ['.js', '.ts']
  }), terser()]
}, {
  input: "./src/index.d.ts",
  output: [{ file: "dist/my-library.d.ts", format: "es" }],
  plugins: [dts()],
},]