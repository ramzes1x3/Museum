import gulp from "gulp";//импорт gulp из модуля gulp
import { path } from "./gulp/config/path.js";//импорт путей из path.js
import { plugins } from "./gulp/config/plugins.js"; //импорт общих плагинов

//создаем глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js";
import { copySprite } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

export { svgSprive }; //отдельная функция

//наблюдает за изменением файлов
function watcher() {
  gulp.watch(path.watch.files, copy); //gulp.series(copy, ftp)
  gulp.watch(path.watch.html, html); //если нужно сразу выгружать на ftp сервер то пишем вместо html gulp.series(html, ftp)
  gulp.watch(path.watch.scss, scss); //gulp.series(scss, ftp)
  gulp.watch(path.watch.js, js); //gulp.series(js, ftp)
  gulp.watch(path.watch.images, images); //gulp.series(image, ftp)
}

//обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy,copySprite, html, scss, js, images));

//строим сценарий
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//загрузка сценариев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

//выполнить сценарий по умолчанию
gulp.task('default', dev);
