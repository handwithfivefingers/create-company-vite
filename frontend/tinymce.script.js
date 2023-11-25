// const fse = require('fs-extra')
// const path = require('path')
// const topDir = __dirname
// fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'))
// fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true })

import fse from 'fs-extra'
import path from 'path'
const __dirname = new URL('.', import.meta.url).pathname
const topDir = __dirname
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'))
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true })
