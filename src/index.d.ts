declare type Route = {
    path: string;
    name: string;
    children?: Route[];
};
declare type Config = {
    baseUrl: string;
    contentBase?: string;
    routes: Route[];
    urlGenHook?: (config: Config) => Promise<Route[]>;
};
export declare function VitePluginSitemap(config?: Config): {
    name: string;
    buildStart: () => Promise<void>;
};
export {};
