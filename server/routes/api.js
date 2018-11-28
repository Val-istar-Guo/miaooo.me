import Router from 'koa-router'
import request from 'superagent'
import githubAuthKey from '../utils/githubAuthKey'


console.log(`token ${githubAuthKey}`)
const router = new Router({ prefix: '/api' })

const githubAPI = api => `https://api.github.com/repos/Val-istar-Guo/article/git/${api}`
const urls = {
  blob: (host, item) => `${host}/api/article/${item.title}`,
  tree: (host, item) => `${host}/api/tree/${item.sha}`,
}

const getArticleFolderTree = async () => {
  const ref = await request
    .get(githubAPI('refs/heads/master'))
    .set('Authorization', `token ${githubAuthKey}`)
    .then(res => res.body)

  const repository = await request
    .get(ref.object.url)
    .set('Authorization', `token ${githubAuthKey}`)
    .then(res => res.body)

  const rootTree = await request
    .get(repository.tree.url)
    .set('Authorization', `token ${githubAuthKey}`)
    .then(res => res.body)

  const articleFolderTree = rootTree.tree.find(item => item.path === 'articles')

  return articleFolderTree
}

const decodeArticleTitle = path => {
  const [, order, title] = path.match(/^(\d+)\.(.+)\.md$/)
  return { order, title }
}

router
  .get('/tree', async (ctx) => {
    const articleFolderTree = await getArticleFolderTree()
    if (!articleFolderTree) ctx.throw('文章存储系统崩溃，请反馈给管理员 <val.istar.guo@gmail.com>')

    const articlesTree = await request
      .get(articleFolderTree.url)
      .set('Authorization', `token ${githubAuthKey}`)
      .then(res => res.body)

    const articles = articlesTree.tree
      .filter(item => item.type === 'blob' && /^(\d+)\.(.+)\.md$/.test(item.path))
      .map(item => {
        const { order, title } = decodeArticleTitle(item.path)
        return {
          ...item,
          order,
          title,
        }
      })
      .map(item => ({
        ...item,
        url: urls[item.type](ctx.host, item),
      }))
      .sort((a, b) => a.order > b.order)
      .map(({ title, type, url }) => ({ title, type, url }))

    ctx.body = articles
  })
  .get('/tree/:sha', async ctx => {
    const tree = await request
      .get(githubAPI(`trees/${sha}`))
      .set('Authorization', `token ${githubAuthKey}`)
      .then(res => res.body)

    ctx.body = tree
  })
  .get('/article/:paths+', async ctx => {
    const articleFolderTree = await getArticleFolderTree()
    if (!articleFolderTree) ctx.throw('文章存储系统崩溃，请反馈给管理员 <val.istar.guo@gmail.com>')

    let tree = await request
      .get(articleFolderTree.url)
      .set('Authorization', `token ${githubAuthKey}`)
      .then(res => res.body)

    const paths = ctx.params.paths.split('/')
    console.log(paths)

    const len = paths.length - 1
    for (let i = 0; i++; i < len && tree) {
      let subtree = tree.tree.find(item => item.path === paths[i])
      if (!subtree || subtree.type !== 'tree') {
        tree = null
        ctx.throw(404)
      }

      tree = request
        .get(subtree.url)
        .set('Authorization', `token ${githubAuthKey}`)
        .then(res => res.body)
    }

    const title = paths[paths.length - 1]

    let artBlob = tree.tree.find(item => {
      return title === decodeArticleTitle(item.path).title
    })

    if (!artBlob || artBlob.type !== 'blob') ctx.throw(404)

    artBlob = await request
      .get(artBlob.url)
      .set('Authorization', `token ${githubAuthKey}`)
      .then(res => res.body)

    const article = new Buffer(artBlob.content, 'base64').toString()
    ctx.body = {
      path: ctx.params.paths,
      content: article,
      title,
    }
  })

export default router
