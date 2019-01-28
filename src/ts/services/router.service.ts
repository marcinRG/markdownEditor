import {Router} from '../utils/routing/Router';
import {AppSettings} from '../settings/AppSettings';
import {RouteAndParameterResolver} from '../utils/routing/RouteAndParameterResolver';

export const routerService = new Router(new RouteAndParameterResolver(AppSettings.routeSettings));
