import svgSprite from "gulp-svg-sprite"; //создает спрайт

export const svgSprive = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVGSPRITE",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: 'icons.svg',
          example: true
        }
      }
    }
    ))
    .pipe(app.gulp.dest(`${app.path.src.srcFold}`))
}
