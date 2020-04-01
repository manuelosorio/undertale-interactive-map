const gulp = require("gulp"),
  clean = require("gulp-clean"),
  deploy = require('gulp-gh-pages'),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  pug = require("gulp-pug"),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  plumber = require('gulp-plumber'),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  bourbon = require('node-bourbon').includePaths,
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  babel = require("gulp-babel"),
  normalize = require('node-normalize-scss'),
  file = require('gulp-file')
let config = {
  cname: 'undertale.manuelosorio.me'
}
let paths= {
  styles: {
    src: "src/assets/css/**/*.{sass,scss}",
    dest: "_dist/css"
  },
  fonts: {
    src: "src/assets/fonts/**",
    dest: "_dist/fonts"
  },
  html: {
    src: "src/**/**/*.pug",
    exclude: "src/includes/*.pug",
    dest: "_dist/"
  },
  images: {
    src: "src/assets/images/**/*.{jpg,jpeg,png,svg,ico,xml,manifest,webmanifest}",
    dest: "_dist/images"
  },
  scripts: {
    src: "src/assets/scripts/**/*.js",
    dest: "_dist/scripts"
  },
  fonts: {
    src: "src/assets/fonts/**",
    dest: "_dist/fonts"
  },
  audio: {
    src: "src/assets/audio/**",
    dest: "_dist/audio"
  },
  vendor: {
    src: "src/assets/vendor/**",
    dest: "_dist/vendor"
  }
}
function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: normalize.with(['styles'].concat(bourbon)),
      outputStyle: "expanded"
    }))
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}
function html() {
  return gulp
    .src([
      paths.html.src,
      paths.html.exclude
    ])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.html.dest))
}
function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}
function images () {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(babel())
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
}
function audio() {
  return gulp.src(paths.audio.src)
    .pipe(gulp.dest(paths.audio.dest))
}
function reload() {
  browserSync.reload();
}
function cleanDist() {
  return gulp.src('./_dist', {allowEmpty:true})
    .pipe(clean())
}
function vendor() {
  return gulp
    .src(paths.vendor.src)
    .pipe(gulp.dest(paths.vendor.dest))
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./_dist",
      open: false,
    },
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", function (req, res) {
          res.writeHead(302, {
            location: "/#!/404"
          })
    
          res.end()
        })
      }
    }
  });
  // function watch() {
  // browserSync.init({
  //   server: {
  //     baseDir: "./_dist"
  //   }
  // });
  gulp.watch(paths.styles.src, style).on('change', browserSync.reload);
  gulp.watch(paths.images.src, images).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
  gulp.watch(paths.fonts.src, scripts).on('change', browserSync.reload);
  gulp.watch(paths.html.src, html).on('change', browserSync.reload);
}
exports.cleanDist = cleanDist
exports.watch = watch
exports.style = style
exports.fonts = fonts
exports.images = images
exports.html = html
exports.scripts = scripts
exports.audio = audio
exports.vendor = vendor

let build = gulp.parallel([html, style, fonts, images, scripts, audio, vendor]);
let buildWatch = gulp.parallel([build], watch);

gulp.task('default', buildWatch)
gulp.task('static', build)
gulp.task('deploy', function () {
  return gulp.src("./_dist/**/*")
    .pipe(file('CNAME', config.cname))
    .pipe(deploy({

      remoteUrl: "https://github.com/manuelosorio/undertale-interactive-map.git",
      branch: "gh-pages"
    }))
})
