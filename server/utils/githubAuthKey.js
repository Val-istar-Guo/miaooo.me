import fs from 'fs'
import { resolve } from 'path'
import env from 'detect-env'

const getKey = env.detect({
  local: () => fs.readFileSync('./githubAuthKey', 'utf8').replace('\n', ''),
  default: () => fs.readFileSync('/var/www/miaooo.me/githubAuthKey', 'utf8').replace('\n', ''),
})

export default getKey()
