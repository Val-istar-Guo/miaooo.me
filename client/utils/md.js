import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode,
} from 'md-plugins-vig';
console.log(atxHeader());

export default md()
  .use(normalize())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(coseLineCode())
  .use(list())
  .use(blockquote())
  .use(code())
  .use(table())
  .use(paragraph())
  .use(inlineCode())
  .use(inlineBold())
  .use(inlineItalics())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(escaped());
