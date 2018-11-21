export default (querys = []) => querys
  .map(name => ([
    name.replace(/_(\w)/g, (all, letter) => letter.toUpperCase()),
    function () { return this.$route.query[name] }
  ]))
  .reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
