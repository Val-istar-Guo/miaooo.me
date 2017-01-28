/*jshint esversion: 6 */
import Vue from "vue";
import router from "./router.js";

var header = new Vue({
    el: "#header",
    data: {
        header: "Val.istar.Guo"
    },
    methods: {

        enterHome: function(event) {

            var url = event.target.getAttribute("href");
            console.log(url);
            router.route(url);
        },

    }
});

module.exports = header;
