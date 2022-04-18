![npm (scoped)](https://img.shields.io/npm/v/@tormak/vite-plugin-sitemap?label=version&logo=npm&color=red)
![npm](https://img.shields.io/npm/dm/@tormak/vite-plugin-sitemap?logo=npm)
![](https://img.shields.io/static/v1?label=ecosystem&message=Vite&color=blue)

# vite-plugin-sitemap

Automatic sitemap generation for Vite, based on a provided routes object, and optional generation function.

(Based on an old rollup plugin, [rollup-plugin-sitemap](https://github.com/JoaoSouMoreira/rollup-plugin-sitemap))

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+).

## Install

Using npm:

```console
npm install --save-dev @tormak/vite-plugin-sitemap
```

## Usage

**Note**: These examples use typescript files (.ts) but can still be implimented the same way for javascript files (.js).

Create a `vite.config.ts` [configuration file](https://vitejs.dev/config/#config-file) and import the plugin:

```js
import { defineConfig } from 'vite'
import { VitePluginSitemap } from '@tormak/vite-plugin-sitemap';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  {
    path: '/blog',
    name: 'Blog',
    children: [
        { path: '/article', name: 'Article' }
    ]
  },
];

export default defineConfig({
  plugins: [
    VitePluginSitemap({
      baseUrl: 'https://example.com',
      contentBase: 'public',
      routes: routes,
      urlGenHook: (config) => {
          let updatedRoutes = config.routes;

          /** put any logic here that you want to run before the sitemap.xml file is generated 
           * ex: generate URLs for all of your blog posts
           */

          return updateRoutes;
      }
    })
  ]
});
```

## Options

### `baseUrl`

Type: `String`<br>
Default: `null`

A string to define what the base URL for the website of the sitemap.

### `contentBase`

Type: `String`<br>
Default: `'public'`

This will be the directory in your project where the `sitemap.xml` file will be generated. Normally this is named either `public` or `dist`.

### `routes`

Type: `Array[...Object]`<br>
Default: `null`

A list of routes with two required properties, `path` and `name`. Name is there in case you want to define a route but not make it show up on the sitemap file. See the code above for an example of this value.

### `urlGenHook`

Type: `function`<br>
Default: `null`
Parameters:
 * `Config`: The plugin config object
Return value: `Route[]`

This function is called before the `routes` object is parsed, allowing you to dynamically add routes during the build step. The function takes the plugin config as an argument, giving you access to existing routes.

