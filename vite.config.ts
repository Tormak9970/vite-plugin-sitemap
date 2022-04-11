import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'entry.js'),
            name: 'VitePluginSitemap',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'vite',
                'fs'
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    fs: 'fs',
                    vite: 'Vite'
                }
            }
        }
    }
});
