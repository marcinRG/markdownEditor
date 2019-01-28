export interface IResolver {
    isPathValid(path: string): boolean;

    isRouteValid(route: string): boolean;

    getDefaultRoute(): string;

    getErrorRoute(): string;

    getRouteAndParameters(path: string): {
        route: string,
        parameters: {},
    };

}
