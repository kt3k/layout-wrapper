# layout-wrapper v1.0.0

> Wrap the contents in the layout template. gulpfriendly.

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
    layout: 'src/layouts'
    data: {name: 'world'},
    engine: 'nunjucks'
  }))
  .pipe(gulp.dest('site/'))
```

src/pages/sample.html

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
- @return {Transform<Vinyl, Vinyl>}

This returns the transform stream from vinyl to vinyl. This transforms

# License

MIT
