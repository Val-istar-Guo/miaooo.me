/*jshint esversion: 6 */
import Vue from "vue";
import router from "./router.js";
import m from "./m.js";

var article_list = new Vue({
    el: "#article-list",
    data: {

        isActive: true,
        isLoad: true,
        scrollTop: 0,

        articles: []
    },
    methods: {

        enterArticle: function(event) {

            if (event.target.tagName.toLowerCase() === "a") {
                var url = event.target.getAttribute("href");

                this.isActive = false;

                router.route(url);
            }

        },

        routeIn: function(params, setTitle) {
            setTitle("📖Val.istar.Guo");
            this.isActive = true;
        }

    }
});

m.getBriefArtList({
    success: function(list) {
        article_list.articles = list;
        article_list.isLoad = false;
    }
});

module.exports = article_list;
