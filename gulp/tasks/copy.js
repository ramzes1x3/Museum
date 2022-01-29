//копирует файлы из source в нашу сборку проекта
export const copy = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}

export const copySprite = () => {
  return app.gulp.src(`${app.path.src.sprite}/stack/*.{svg,html}`)
  .pipe(app.gulp.dest(app.path.build.sprite))
}
