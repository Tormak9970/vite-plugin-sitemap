import * as fs from 'fs';

type Route = { path:string, name:string, children?:Route[] }

type Config = {
    baseUrl:string,
    contentBase?:string,
    routes:Route[],
    urlGenHook?:(config:Config) => Promise<Route[]>
}

function getRoutesList(routes:Route[], baseUrl:string) {
    return routes.reduce((array:string[], route:Route) => {
        const path = `${baseUrl}${route.path}`;

        if (route.path !== '*' && route.name) {
            array.push(path);
        }

        if (route.children) {
            array.push(...getRoutesList(route.children, `${path}/`));
        }

        return array;
    }, []);
}

function getRoutesXML(routes:string[]) {
    const list = routes.map((route) => `<url>\n\t<loc>${route}</loc>\n</url>`).join('\r\n');
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\t${list}\n</urlset>`;
}

export function VitePluginSitemap(config?:Config) {
    return {
        name: 'vite-plugin-sitemap',
        buildStart: async () => {
            if (config) {
                let preProcRoutes = config.routes;
            
                if (config.urlGenHook) {
                    preProcRoutes = await config.urlGenHook(config);
                }

                const dir = `${process.cwd()}/${config.contentBase || 'public'}`;
                const routes = getRoutesList(preProcRoutes, config.baseUrl);
                const routesXML = getRoutesXML(routes);

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                fs.writeFile(`${dir}/sitemap.xml`, routesXML, (error) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            }
        }
    }
}