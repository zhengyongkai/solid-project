import path from "path";
import { defineConfig, loadEnv } from "vite";
import solid from "vite-plugin-solid";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    preflight: true,
    presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
    include: ["./src/**/*.{js,jsx,ts,tsx}"],
    exclude: [],
    jsxFramework: "solid",
    outdir: "styled-system",
    plugins: [
      solid(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src"),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },

    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/styles/variable.scss";',
        },
      },
    },
  };
});
