var API = {
    getArticle: function(obj) {

        var id = obj.id,
            sFun = obj.success,
            fFun = obj.fail;

        this.get({
            url: "/api/get_article_cnt",
            data: {
                id: id
            },
            success: function functionName(data) {
                sFun(JSON.parse(data));
            },
            fail: fFun
        });
    },

    getArticleList: function (obj) {

        var sFun = obj.success,
            fFun = obj.fail;

        this.get({
            url: "/api/get_article_list",
            success: function functionName(data) {
                var json = JSON.parse(data);
                sFun(json.artList);
            },
            fail: fFun
        });
    },

    get: function(obj) {

        var params = [],
            url = "",
            xhr = new XMLHttpRequest();

        for (var prop in obj.data) {
            if (obj.data.hasOwnProperty(prop)) {
                params.push(prop + "=" + obj.data[prop]);
            }
        }

        url = obj.url + "?" + params.join("&");

        xhr.onreadystatechange = function() {
            var DONE = 4; // readyState 4 代表已向服务器发送请求
            var OK = 200; // status 200 代表服务器返回成功

            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    obj.success(xhr.responseText);
                } else {
                    obj.fail(xhr.readyState, xhr.status);
                }
            }

        };

        xhr.open('GET', url, true);
        xhr.send();

    }

};

module.exports = API;
