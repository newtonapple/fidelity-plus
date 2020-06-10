class Routes {
    static currentPath() {
        return location.hash ? (location.pathname + location.hash) : location.pathname;
    }

    static findRoute(routes) {
        let path = Routes.currentPath();
        for (let route of routes) {
            if (route.matchPath(path)) return route;
        }
        return null;
    }

    constructor(routes = []) {
        this.pathRoutes = [];
        this.changeRoutes = [];
        let that = this;
        routes.forEach(function (route) {
            that.register(route);
        })
    }

    register(route) {
        if (route.constructor === PathRoute) return this.pathRoutes.push(route);
        if (route.constructor === ChangeRoute) return this.changeRoutes.push(route);
    }

    init(container = document.querySelector('body')) {
        let that = this;
        this.observer = new MutationObserver(function (changes, _observer) {
            let route = that.currentChangeRoute();
            if (route) {
                for (let changed of changes) {
                    for (let node of changed.addedNodes) {
                        if (route.matchNode(node)) return route.run(node);
                    }
                }
            }
        });
        this.observer.observe(container, {
            childList: true,
            subtree: true,
        });
        let route = this.currentPathRoute();
        route && route.run();
    }

    currentChangeRoute() {
        return this.constructor.findRoute(this.changeRoutes);
    }

    currentPathRoute() {
        return this.constructor.findRoute(this.pathRoutes);
    }
}

class PathRoute {
    constructor(path, handler) {
        this.path = path;
        this.handler = handler;
    }

    run() {
        this.handler();
    }

    matchPath(path) {
        return path.includes(this.path);
    }

}

class ChangeRoute extends PathRoute {
    constructor(path, selector, handler) {
        super(path, handler);
        this.selector = selector;
    }

    run(node) {
        this.handler(node);
    }

    matchNode(node) {
        return node.matches && node.matches(this.selector);
    }
}