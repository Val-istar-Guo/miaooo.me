import fs from 'fs'
import { resolve } from 'path'
import env from 'detect-env'


const getKey = () => {
  if (process.env.NODE_ENV === 'development') return fs.readFileSync('./githubAuthKey', 'utf8').replace('\n', '')
  return fs.readFileSync('/var/www/miaooo.me/githubAuthKey', 'utf8').replace('\n', '')
}


export default getKey()
