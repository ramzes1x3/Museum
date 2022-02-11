//копирует файлы из source в нашу сборку проекта
export const copy = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}

export const copySprite = () => {
  return app.gulp.src(`${app.path.src.srcFold}/stack/*.{svg,html}`)
  .pipe(app.gulp.dest(app.path.build.sprite))
}

export const copySvg = () => {
  return app.gulp.src(`${app.path.src.srcFold}/svgicons/*.svg`)
  .pipe(app.gulp.dest(app.path.build.svg))
}

