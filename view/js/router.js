/* jshint esversion: 6 */

class Router {
    constructor(tb) {
        this.table = tb || {};
        this.root_url = "http://www.miaooo.me";
    }

    setUrlBar(newUrl, stateObject) {

        stateObject = stateObject ? stateObject : null;

        history.pushState(stateObject, null, newUrl);

    }

    setTitle(title) {
        if (title) {
            document.title = title;
        }
    }

    route(url) {
        var obj = this.parseUrl(url),
            c_module = this.table[obj.path],
            title = null;

            this.setUrlBar(url, title);

        if (c_module) {
            title = c_module.routeIn(obj.params, this.setTitle);
        }
    }

    parseUrl(url) {
        var arr = url.split('?'),
            params = {};

        if (arr[1]) {
            var p = arr[1].split("&");
            for (var i of p) {
                var j = i.split("=");

                if (j[1]) {
                    params[j[0]] = j[1];
                }
            }
        }

        return {
            "path": arr[0],
            "params": params
        };
    }

    setTable(tb) {
        this.table = tb;
    }
}

module.exports = new Router();
