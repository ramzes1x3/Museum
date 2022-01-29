import fileinclude from "gulp-file-include";//позволяет включать компоненты(файлы) html в один файл
import gulpWebpHtmlNosvg from "gulp-webp-html-nosvg";//конвертирует в webp
import versionNumber from "gulp-version-number";//не позволяет кэшировать сайт в браузере

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(gulpWebpHtmlNosvg())
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({//добавляем дату и время создания к js и css(добавляется в html)
          'value': '%DT%',
          'append': {
            'key': '_v',
            'cover': 0,
            'to': [
              'css',
              'js'
            ]
          },
          'output': {
            'file': 'gulp/version.json'//здесь будет храниться ключ с временем и датой
          }
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
}
