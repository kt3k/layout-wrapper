const wrapper = require('../')

const test = require('tape')
const path = require('path')
const concat = require('concat-stream')
const vfs = require('vinyl-fs')
const frontMatter = require('gulp-front-matter')

const root = path.join(__dirname, 'fixture')

test('it returns a stream', t => {

  t.ok(typeof wrapper({layout: ''}).pipe === 'function')

  t.end()

})

test('it throws an error when the layout is not given', t => {

  t.throws(() => wrapper())

  t.end()

})

test('it wraps with the given template', t => {

  vfs.src(path.join(root, 'pages/foo.html'))
  .pipe(frontMatter())
  .pipe(wrapper({
    layout: path.join(root, 'layouts'),
    engine: 'nunjucks'
  }))
  .pipe(concat(data => {
    t.equal(data[0].contents.toString().trim(), '<div class="page"><span>foo</span>\n</div>')
    t.end()
  }))
})
