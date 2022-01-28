//копирует файлы из source в нашу сборку проекта
export const copy = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
    .pipe(app.gulp.src(`${app.path.src.sprite}/stack/*.*`))
    .pipe(app.gulp.dest(app.path.build.sprite))
}
