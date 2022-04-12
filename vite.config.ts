import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'exports.js'),
            name: 'VitePluginSitemap',
        },
        rollupOptions: {
            external: [ "fs" ],
            output: {
                globals: { fs: "fs" }
            }
        }
    }
});
