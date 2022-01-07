let project_folder = require("path").basename(__dirname);//имя папки конечного проекта
let source_folder = "source";

let fs = require('fs');

let path = {
    build: {
      html: project_folder + "/",
      css: project_folder + "/css/",
      js: project_folder + "/js/",
      img: project_folder + "/img",
      fonts: project_folder + "/fonts",
    },
    src: {
      html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
      css: source_folder + "/scss/style.scss",
      js: source_folder + "/js/scripts.js",
      img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
      fonts: source_folder + "/fonts/*.{woff2,woff,ttf}",
    },
    watch: {
      html: source_folder + "/**/*.html",
      css: source_folder + "/scss/**/*.scss",
      js: source_folder + "/js/**/*.js",
      img: project_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
  }

//plugins
let {src, dest } = require('gulp'),
    gulp = require('gulp'),
    browser_sync = require("browser-sync").create(),
    file_include = require("gulp-file-include"),
    del = require("del"),
    sass = require("gulp-sass")(require("sass")),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webp_html = require('gulp-webp-html'),
    webp_css = require('gulp-webpcss'),
    svg_sprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2');

//функция синхронизации сервера с проектом
function browserSync(params) {
  browser_sync.init({
    server:{
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false,
    ui: false,
  })
}

//прослушиваемые папки(синхронизируются с сервером)
function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

//удаляет старые файлы
// function clean(params) {
//   return del(path.clean);
// }

//series functions

//обработка html файлов
function html() {
  return src(path.src.html)
    .pipe(file_include())
    .pipe(webp_html())
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream());
}

//обработка css файлов
function css() {
  return src(path.src.css)
    .pipe(sass())
    .pipe(group_media())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade: true
    }))
    .pipe(webp_css({}))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({extname: ".min.css"}))
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream());
}

//обработка js файлов
function js() {
  return src(path.src.js)
    .pipe(file_include()) //собирает в один файл
    .pipe(dest(path.build.js))
    .pipe(uglify()) //сжимает js файл
    .pipe(rename({extname: ".min.js"}))
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream());
}

//синхронизация картинок с сервером
function images() {
  return src(path.build.img)
  .pipe(browser_sync.stream());
}
//series functions end

//функция автоматического добавления шрифтов из папки проекта
function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
            }
            c_fontname = fontname;
        }
      }
    })
  }
}

//коллбэк функция
function cb() { }

//отдельные задачи (запускаются такой командой 'gulp имя задачи')

//создает спрайт из svg (из этого спрайта можно подключать svg к html файлу)
gulp.task('svg_sprite', function () {
    return gulp.src([project_folder + '/img/*.svg'])
    .pipe(svg_sprite({
      mode: {
        stack: {
          sprite: "../icons/icons.svg",
          example: true,
        }
      },
    }
    ))
    .pipe(dest(path.build.img))
  }
)

//преобразует png, jpg в webp и оптимизирует png, jpg
//в конечной папке будет webp версия и оптимизированный png или jpg
gulp.task('image_processing', function () {
  return src(path.src.img)
  .pipe(webp({
      quality: 70
    })
  )
  .pipe(dest(path.build.img))
  .pipe(src(path.src.img))
  .pipe(imagemin(
    {
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }
  ))
  .pipe(dest(path.build.img))
  }
)

//преобразует из ttf в woff и woff2
gulp.task('fonts_to_woff2', function () {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts));
  }
)

//серия действий, которые выполняют при вводе gulp в консоль
let build = gulp.series(html, css, js, images, fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

//сопряжение с gulp
exports.fontsStyle = fontsStyle;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
