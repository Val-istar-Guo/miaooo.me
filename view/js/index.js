/*jshint esversion: 6 */
import "normalize.css";
import "../styles/index.scss";

import "./setrem.js";
import header from "./Header.js";
import articleList from "./ArticleList.js";
import article from "./Article.js";
import router from "./router.js";
router.setTable({
    "/": articleList,
    "/article": article
});
