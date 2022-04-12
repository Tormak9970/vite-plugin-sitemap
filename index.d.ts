declare module '@tormak/vite-plugin-sitemap' {
    type Route = {
        path: string;
        name: string;
        children?: Route[];
    };
    type Config = {
        baseUrl: string;
        contentBase?: string;
        routes: Route[];
        urlGenHook?: (config: Config) => Promise<Route[]>;
    };
    export function VitePluginSitemap(config?: Config): {
        name: string;
        buildStart: () => Promise<void>;
    };
}
