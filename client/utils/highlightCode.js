import visit from 'unist-util-visit'
import { join } from 'path'


export default () => (tree, file) => {
  const selector = node => node.tagName === 'pre'
  const visitor = node => {
    console.dir(node, { depth: null })
  }

  visit(tree, selector, visitor)
}
