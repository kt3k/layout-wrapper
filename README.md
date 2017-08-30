# layout-wrapper v1.1.2

[![Circle CI](https://circleci.com/gh/kt3k/layout-wrapper.svg?style=svg)](https://circleci.com/gh/kt3k/layout-wrapper)
[![codecov](https://codecov.io/gh/kt3k/layout-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/layout-wrapper)
[![Greenkeeper badge](https://badges.greenkeeper.io/kt3k/layout-wrapper.svg)](https://greenkeeper.io/)

> Wrap the contents in the layout template. gulpfriendly.

This module is designed to be used with [gulp][gulp] or [bulbo][bulbo].

**NOTE**: See also [layout1][], which is a more simple and flexible version of this module.

# Install

    npm install layout-wrapper

# Usage

This module works with gulp's file stream.

gulpfile.js:

```js
const frontMatter = require('gulp-front-matter')
const wrapper = require('layout-wrapper')

gulp.src('src/pages/*.html')
  .pipe(frontMatter())
  .pipe(wrapper({
    layout: 'src/layouts',
    data: {name: 'world'},
    engine: 'nunjucks'
  }))
  .pipe(gulp.dest('site/'))
```

***Note*** You still need to install the template engine. (In the above case, you need to install `nunjucks`)

src/pages/sample.html:

```html
---
title: Hello
layout: default
---
<p>Hello, {{ name }}!</p>
```

src/layouts/default.nunjucks:

```html
<html>
<head>
  <title>{{ file.frontMatter.title }}</title>
</head>
<body>
  {{ contents }}
</body>
</html>
```

The above settings outputs the following html into the path `site/sample.html`:

```html
<html>
<head>
  <title>Hello</title>
</head>
<body>
  <p>Hello, world!</p>
</body>
</html>
```

## Use with bulbo

bulbofile.js:

```js
const frontMatter = require('gulp-front-matter')
const wrapper = require('layout-wrapper')

asset('src/pages/*.html')
  .pipe(frontMatter())
  .pipe(wrapper({
    layout: 'src/layouts',
    data: {name: 'world'},
    engine: 'nunjucks'
  }))
```

# API

```js
const wrapper = require('layout-wrapper')
```

## wrapper(options)

- @param {object} options - The options
- @param {string} options.layout - The path to the directory of layout files. If nothing is given, then this throws an error. Required.
- @param {string} [options.engine] - The name of the template engine. Default is `lodash`. Please see [the document of consolidate.js](https://github.com/tj/consolidate.js/) for what's available here.
- @param {object} [options.data] - The additional data which is passed to the layout engine.
- @param {string} [options.frontMatterProp] - The name of the property where the front matter object is stored in vinyl. Default is `frontMatter`.
- @param {string} [options.layoutProp] - The name of the property of layout pattern in a front matter. Default is `'layout'`.
- @param {string} [options.defaultLayout] - The default layout name when the layout property is not given in the front matter. Default is `default`.
- @param {string} [options.extname] - The name of file extension name for template files. Default is `'.' + engine name` e.g. `.lodash` `.ejs` `.nunjucks` etc.
- @return {Transform<Vinyl, Vinyl>}

This returns the transform stream from vinyl to vinyl. This transforms

## Alias methods

You can also use alias methods.

```js
gulp.src('src/pages/*.html')
  .pipe(frontMatter())
  .pipe(wrapper.nunjucks({
    layout: 'src/layouts',
    data: {name: 'world'}
  }))
  .pipe(gulp.dest('site/'))
```

The above is equivalent of `engine: 'nunjucks'` call of `wrapper`.

# License

MIT

[gulp]: http://gulpjs.com/
[bulbo]: https://github.com/kt3k/bulbo
[layout1]: https://npm.im/layout1
