'use strict';

// Configuration.

var config = {};
config.browserSync = {
  proxyTarget: 'nypr.test',
  open: true
};
config.patternsDir = './source/_patterns';
config.sass = {
  srcFiles: [
    './source/scss/**/*.scss'
  ],
  options: {
    outputStyle: 'compressed'
  },
  destDir: './public/css/'
};
config.scripts = {
  srcFiles: [
    './source/js/*.js'
  ],
  destDir: './public/js'
};
config.patternLab = {
  dir: './',
  watchFiles: [
    config.patternsDir + '/**/*.twig',
    config.patternsDir + '/**/*.json',
    config.patternsDir + '/**/*.yml'
  ],
  publicCssDir: './public/css'
};


// Load Gulp and other tools.
var fs = require('fs');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var run = require('gulp-run');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

// Helper functions.
function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  }
  catch (err) {
    return false;
  }
}

// Gulp tasks.

/**
 * Sets up Browsersync and watchers.
 */
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './public'
      },
      port: 8020,
      open: true,
      notify: false
  });
  gulp.watch('source/scss/**/*.scss', ['sass', 'copy-sgcss']);
  gulp.watch('source/js/*.js', ['scripts-change']);
  gulp.watch(['source/**/*.json', 'source/**/*.twig'], ['patterns-change']);
});

/**
 * Task sequence to run when Sass files have changed.
 */
gulp.task('sass-change', function () {
  runSequence('sass', 'copy-sgcss');
});

gulp.task('scripts-change', function () {
  runSequence('scripts');
});

/**
 * Task sequence to run when pattern files have changed.
 */
gulp.task('patterns-change', function () {
  runSequence('pl:generate', 'sass-change', 'scripts-change', 'bs:reload');
});

/**
 * Task sequence generate theme and Pattern Lab files.
 */
gulp.task('build-theme', function () {
  runSequence('pl:generate', 'sass-change');
});

/**
 * Processes Sass files and updates Browsersync.
 */
gulp.task('sass', function () {
  return gulp.src(config.sass.srcFiles)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.sass.destDir))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Processes Scripts files and updates Browsersync.
 */
gulp.task('scripts', function () {
  return gulp.src(config.scripts.srcFiles)
    .pipe(sourcemaps.write('./'))
    .pipe(concat('script.js'))
    .pipe(minify())
    .pipe(gulp.dest(config.scripts.destDir))
    .pipe(browserSync.stream({match: '**/*.js'}));
});

/**
 * Copies Styleguide CSS files to Pattern Lab's public dir.
 */
gulp.task('copy-sgcss', function () {
  return gulp.src('public/css/pl-specific/styleguide.min.css')
    .pipe(gulp.dest('public/styleguide/css/'))
    .pipe(browserSync.stream());
});

/**
 * Generates Pattern Lab front-end.
 */
gulp.task('pl:generate', function () {
  if (isDirectory(config.patternLab.dir)) {
    return run('php core/console --generate').exec();
  }
});

/**
 * Calls Browsersync reload.
 */
gulp.task('bs:reload', function () {
  browserSync.reload();
});

/**
 * Lints Sass files.
 */
gulp.task('lint:sass', function () {
  return gulp.src(config.sass.srcFiles)
    .pipe(sassLint())
    .pipe(sassLint.format());
});

/**
 * Gulp default task.
 */
gulp.task('default', function () {
  runSequence('pl:generate', 'sass', 'watch', 'scripts');
});

gulp.task('production', function () {
  runSequence('sass', 'scripts');
});
