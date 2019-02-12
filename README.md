# New York Public Radio Design System

_Please note that theme-specific CSS files are not committed to the repository.
They can be generated after installing development dependencies._

## Installation

### Prerequisites:

- [Node](https://nodejs.org/en/) (10+)
- [npm](https://nodejs.org/) (6+)
- [Composer](https://getcomposer.org/)

### Installing development dependencies

In the docroot run:

```sh
npm run build
```

This will create the `node_modules` directory and download all dev dependencies,
setup & build the Pattern Lab environment, compile all SCSS into CSS, then move
the generated CSS into the `/public` site.

## Developing Vue apps

In the docroot run:

```sh
npm run appdev
```

This will watch all changes in the `souce/app` directory and compile all JS into `source/js`, then move the generated JS into the `/public` site.

## Developing and styling patterns

When working with the theme, there's a few development options available.
These commands must be run from the docroot.

### Watch for file changes

This will start up a local server via [Browsersync](https://browsersync.io/).
It proxies the local domain `nypr.test`.

```sh
gulp
```

### Generating theme-specific CSS files

```sh
gulp sass
```

### Rebuild Pattern Lab

```sh
gulp patterns-change
```

## Generating theme asset files

```sh
gulp build-theme
```

This will generate all CSS files, compile a new Pattern Lab `public` site,
and move the generated CSS into the new `public` site. You might use this after
you pull in some theme changes and want to view them on your local environment.

_For a larger list of `gulp` commands, see the [gulp file](gulpfile.js)_


### Local Pattern Lab development server settings

- Host name: `nypr.test`. (this is what Browsersync uses to proxy the localhost
server)
