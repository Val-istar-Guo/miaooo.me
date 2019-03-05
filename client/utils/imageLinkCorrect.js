import visit from 'unist-util-visit'
import { join } from 'path'


export default () => (tree, file) => {
  const selector = node => node.type === 'image' && node.url[0] === '.'
  const visitor = node => {
    node.url = `https://${join('raw.githubusercontent.com/Val-istar-Guo/article/master', '/articles', node.url)}?sanitize=true`
  }

  visit(tree, selector, visitor)
}
