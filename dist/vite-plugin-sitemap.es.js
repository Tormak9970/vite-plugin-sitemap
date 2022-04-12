import fs from "fs";
function getRoutesList(routes, baseUrl) {
  return routes.reduce((array, route) => {
    const path = `${baseUrl}${route.path}`;
    if (route.path !== "*" && route.name) {
      array.push(path);
    }
    if (route.children) {
      array.push(...getRoutesList(route.children, `${path}/`));
    }
    return array;
  }, []);
}
function getRoutesXML(routes) {
  const list = routes.map((route) => `<url><loc>${route}</loc></url>`).join("\r\n");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	${list}
</urlset>`;
}
function VitePluginSitemap(config) {
  return {
    name: "vite-plugin-sitemap",
    buildStart: async () => {
      if (config) {
        let preProcRoutes = config.routes;
        if (config.urlGenHook) {
          preProcRoutes = await config.urlGenHook(config);
        }
        const dir = `${process.cwd()}/${config.contentBase || "public"}`;
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
  };
}
export { VitePluginSitemap };
