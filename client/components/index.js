import Vue from 'vue';
import documentTitle from 'framework/components/documentTitle';

import ErrorReminder from './ErrorReminder';
import MarkdownArticle from './MarkdownArticle';


Vue.component('document-title', documentTitle);
Vue.component('error-reminder', ErrorReminder);
Vue.component('markdown-article', MarkdownArticle);
