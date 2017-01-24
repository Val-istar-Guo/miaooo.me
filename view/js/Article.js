/*jshint esversion: 6 */
import Vue from "vue";

import m from "./m.js";
import router from "./router.js";

var article = new Vue({
    el: "#article",
    data: {
        isLoad: true,
        isActive: false,
        id: "1",
        title: "Article",
        time: "2017/01/01",
        des: "Article descriptions",
        cnt: ''
    },
    methods: {

        turnIn: function(id) {

            this.isLoad = true;
            this.isActive = true;

            m.getArtCntById({

                id: id,

                success: function(cnt) {
                    this.cnt = cnt;
                    this.isLoad = false;
                }.bind(this),

                fail: function() {
                    console.log("GAME OVER");
                    this.turnOut("/");
                }.bind(this)

            });

        },

        turnOut: function(url) {
            this.isActive = false;
            router.route(url);
        },

        routeIn: function(params, setTitle) {
            setTitle(params.title);

            this.turnIn(params.id);
        },
        back: function(event) {
            var url = event.target.getAttribute("href");
            this.turnOut(url);
        }

    }

});

module.exports = article;
