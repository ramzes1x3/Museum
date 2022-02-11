import dartSass from 'sass'; //препроцессор sass
import gulpSass from 'gulp-sass'; //плагин для запуска препроцессора sass
import rename from 'gulp-rename'; //переименовывает файлы
import cleanCss from 'gulp-clean-css'; //сжимает css
import webpcss from 'gulp-webpcss'; //webp в css , если браузер поддерживает webp
import autoprefixer from 'gulp-autoprefixer'; //добавляет вендорные префиксы
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //группирует медиа запросы

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev}) //sourcemaps нужен для того, чтобы видеть, в каком файле была ошибка
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
      outputStyle: 'expanded'
    })
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries())
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true
        }))
    )
    // .pipe(
    //   app.plugins.if(
    //     app.isBuild,
    //     webpcss(
    //     {
    //       webpClass: ".webp",
    //       noWebpClass: ".no-webp"
    //     }
    //   ))
    // )
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss())
    )
    .pipe(rename({
      extname: ".min.css"
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
}
