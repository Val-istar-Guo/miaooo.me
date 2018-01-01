import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
} from 'md-plugins-vig';
console.log(atxHeader());

export default md()
  .use(normalize())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(list())
  .use(blockquote())
  .use(table())
  .use(code())
  .use(paragraph())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(escaped());
