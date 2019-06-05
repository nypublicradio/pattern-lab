# New York Public Radio Design System

## Installation

### Prerequisites:

- [Node](https://nodejs.org/en/) (10+)
- [npm](https://nodejs.org/) (6+)
- [Composer](https://getcomposer.org/)
- [Gulp](https://gulpjs.com/)

### Installing development dependencies

In the docroot run:

```sh
npm run build
```

This will create the `node_modules` directory and download all dev dependencies,
setup & build the Pattern Lab environment, compile all SCSS into CSS, then move
the generated CSS into the `/public` site.

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

## Deployments
We use circleci to handle automated deployments. The configuration is in the [circle.yml](https://github.com/nypublicradio/pattern-lab/blob/master/circle.yml) file. 
At a high level, whenever a commit is made to master, the `public` site is built and the resulting `/public/css/themes/default/default.css` file is shipped to the gothamist-web-client's DEMO static asset S3 bucket.
To deploy to the PROD bucket, simply make a new github release (we follow semantic versioning) and the automated workflow will trigger.

This works by using the `gulp ship-sass` task (See the code [here](https://github.com/nypublicradio/pattern-lab/blob/master/gulpfile.js#L171-L196)).

Making commits to branches will trigger the build step of the automated deployment, but not the deploy step.
This allows you to see if your changes compile and build properly before merging to master.

