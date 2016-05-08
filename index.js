const wrap = require('gulp-wrap')
const fs = require('fs')
const path = require('path')

const ref = '\nSee https://github.com/kt3k/layout-wrapper'

/**
 * @param {object} options - The options
 * @param {string} options.layout - The directory of the layout files. Required.
 * @param {string} [options.engine] - The template engine.
 * @param {object} [options.data] - The template data.
 * @param {string} [options.frontMatterProp] - The name of front matter property.
 * @param {string} [options.layoutProp] - The name of layout property in a front matter.
 * @param {string} [options.defaultLayout] - The default layout name when the layout property is not given in a front matter. Default is `default`.
 * @param {object} [options.extname] - The name of file extension name. Default is `'.' + engine name` e.g. `.lodash` `.ejs` `.nunjucks` etc.
 */
module.exports = options => {

  options = options || {}

  const layoutDir = options.layout
  const engine = options.engine || 'lodash'
  const templateData = options.data
  const frontMatterPropName = options.frontMatterProp || 'frontMatter'
  const layoutPropName = options.layoutProp || 'layout'
  const defaultLayout = options.defaultLayout || 'default'
  const extname = options.extname || '.' + engine

  if (typeof layoutDir === 'undefined') {
    throw new Error('`layout` option is required' + ref)
  }

  return wrap(data => {

    const frontMatter = data.file[frontMatterPropName] || {}
    const layoutPattern = frontMatter[layoutPropName] || defaultLayout
    const layoutFilename = path.join(layoutDir, layoutPattern + extname)

    return fs.readFileSync(layoutFilename).toString()

  }, templateData, {engine})

}
