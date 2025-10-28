import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import postcss from "rollup-plugin-postcss"

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm"
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named"
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss(),
    typescript({ tsconfig: "./tsconfig.json" })
  ],
  external: ["react", "react-dom"]
}
