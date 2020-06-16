const { series, parallel, src, dest, watch } = require("gulp");

var sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  pug = require("gulp-pug"),
  minify = require("gulp-minify"),
  filter = require('gulp-filter'),
  data = require('gulp-data'),
  ghPages = require("gulp-gh-pages");

var browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: "./app/assets/scss/**/*.scss",
    dest: "./dist/assets/css",
  },
  views: {
    src: ["./app/views/**/*.pug"],
    dest: "./dist",
  },
  js: {
    src: "./app/assets/js/**/*.js",
    dest: "./dist/assets/js",
  },
  images: {
    src: "./app/assets/images/*",
    dest: "./dist/assets/images",
  },
  fonts: {
    src: "./app/assets/fonts/*",
    dest: "./dist/assets/fonts",
  },
};

function views() {
  return src(paths.views.src)
    .pipe(data(function(file) {
      return {path: file.stem}
    }))
    .pipe(pug())
    .pipe(
      filter(function (file) {
        return (
          !/\/_/.test(file.path) &&
          !/^_/.test(file.relative) &&
          !/views/.test(file.relative) &&
          !/layouts/.test(file.relative)
        );
      })
    )
    .pipe(dest(paths.views.dest));
}

function style() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

function images() {
  return src(paths.images.src).pipe(dest(paths.images.dest));
}

function scripts() {
  return src(paths.js.src, { allowEmpty: true })
    .pipe(minify({ noSource: true }))
    .pipe(dest(paths.js.dest));
}

exports.style = style;
exports.views = views;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;
exports.deploy = () => src('./dist/**/*').pipe(ghPages());
exports.default = () => {

  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch(paths.styles.src, { ignoreInitial: true }, style);
  watch(paths.views.src, { ignoreInitial: true }, views);
  watch(paths.images.src, { ignoreInitial: true }, images);
  watch(paths.fonts.src, { ignoreInitial: true }, fonts);
  watch(paths.js.src, { ignoreInitial: true }, scripts);

  watch(paths.views.dest, (done) => {
    browserSync.reload();
    done();
  });
  watch(paths.styles.dest, (done) => {
    browserSync.reload();
    done();
  });
  watch(paths.images.dest, (done) => {
    browserSync.reload();
    done();
  });
  watch(paths.fonts.dest, (done) => {
    browserSync.reload();
    done();
  });
  watch(paths.js.dest, (done) => {
    browserSync.reload();
    done();
  });
};
