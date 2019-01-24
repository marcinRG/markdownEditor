import {IResolver} from '../../model/interfaces/IResolver';

export class Router {
    public routeAndParams = [];
    public defaultRoute: string;
    public errorRoute: string;

    constructor(private routeAndParameterResolver: IResolver) {
    }

    public run() {
        this.setFirstRunParams();
        window.addEventListener('popstate', () => {
            const reqParams = this.getReqParams();
            this.handleRequest(reqParams);
        });
    }

    public addRouteHandler(route: string, handler: any) {
        this.routeAndParams.push({
            route,
            handler,
        });
    }

    private getReqParams() {
        const path = document.location.hash.slice(1);
        return this.routeAndParameterResolver.getRouteAndParameters(path);
    }

    private setFirstRunParams() {
        const reqParams = this.getReqParams();
        if (reqParams.route === this.errorRoute) {
            reqParams.route = this.defaultRoute;
            reqParams.parameters = {
                msg: 'init',
            };
        }
        this.handleRequest(reqParams);
    }

    private handleRequest(reqParams: { route: string, parameters: {} }) {
        const index = this.hasHandler(reqParams.route);
        if (index >= 0) {
            this.routeAndParams[index].handler(reqParams.parameters);
        }
    }

    private hasHandler(route: string) {
        return this.routeAndParams.findIndex((elem: { route: string, handler: string }) => {
            return ((elem) && (elem.route === route));
        });
    }
}
