import {IResolver} from '../../model/interfaces/IResolver';
import {IRouteSettings} from '../../model/interfaces/IRouteSettings';

export class RouteAndParameterResolver implements IResolver {
    private regEx = /(\/\S*?)+(?:\/?$)/;

    constructor(public routeSettings: IRouteSettings) {
    }

    public isPathValid(path) {
        const result = this.regEx.test(path);
        return result;
    }

    public isRouteValid(route: string) {
        if (this.routeSettings.routes && this.routeSettings.routes.length > 0) {
            return (this.routeSettings.routes.indexOf(route) >= 0);
        }
        return false;
    }

    public getDefaultRoute() {
        return this.routeSettings.defaultRoute;
    }

    public getErrorRoute() {
        return this.routeSettings.errorRoute;
    }

    public getRouteAndParameters(path: string) {
        let route: string = this.routeSettings.errorRoute;
        let params = {};
        if (this.isPathValid(path)) {
            const paramsArray = this.getRouteAndParametersArray(path);
            params = this.getParameters(paramsArray);
            const tempRoute = this.getRoute(paramsArray);
            if (this.isRouteValid(tempRoute)) {
                route = tempRoute;
            }
        }
        return {
            route,
            parameters: params,
        };
    }

    private removeFirstAndLastSlash(str: string): string {
        if ((str) && (str.length > 0)) {
            if (str.charAt(0) === '/') {
                str = str.substring(1, str.length);
            }
            if (str.charAt(str.length - 1) === '/') {
                str = str.substring(0, str.length - 1);
            }
        }
        return str;
    }

    private getRouteAndParametersArray(str) {
        let paramsArray: string[] = [];
        const val: string = this.removeFirstAndLastSlash(str);
        if (val && val.length > 0) {
            paramsArray = val.split('/');
        }
        return paramsArray;
    }

    private getRoute(paramsArray: string[]) {
        if (paramsArray && paramsArray.length > 0) {
            return paramsArray[0];
        }
        return null;
    }

    private getParameters(paramsArray: string[]) {
        const params = {};
        if (paramsArray && paramsArray.length > 2) {
            for (let i = 1; i < paramsArray.length - 1; i = i + 2) {
                params[paramsArray[i]] = paramsArray[i + 1];
            }
        }
        return params;
    }
}
