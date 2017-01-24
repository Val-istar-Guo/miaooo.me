/*jshint esversion: 6 */
import api from "./api.js";

var artList = [];

exports.getBriefArtList = function(obj) {

    var sFun = function() {

            var newList = [];

            for (var art of artList) {
                if (art) {
                    newList.push({
                        id: art.id,
                        title: art.title,
                        des: art.des,
                        time: {
                            year: 2014,
                            month: 10,
                            day: 1
                        }
                    });
                }
            }

            obj.success(newList);

        },
        fFun = obj.fail;

    if (artList.length === 0) {

        api.getArticleList({
            success: function(data) {

                for (var art of data) {

                    artList[art.Id_A] = {
                        id: art.Id_A,
                        title: art.title,
                        time: art.time,
                        des: art.des,
                        keyword: art.keyword,
                        cnt: null
                    };

                }

                sFun();
            },
            fail: fFun
        });

    } else {
        sFun();
    }

};

exports.getBriefArtById = function(id) {
    return artList[id] || null;
};

exports.getArtCntById = function(obj) {

    var id = obj.id,
        sFun = obj.success,
        fFun = obj.fail,
        art = artList[id];

    if (art) {

        if (art.cnt === null) {

            api.getArticle({
                id: id,
                success: function(data) {
                    art.cnt = data.cnt;
                    sFun(art.cnt);
                },
                fail: fFun
            });

        } else {
            sFun(art.cnt);
        }

    } else {
        fFun();
    }

};
