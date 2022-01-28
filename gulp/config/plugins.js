import replace from "gulp-replace"; //поиск и замена - /искомое\//g, 'зменямое'
import plumber from "gulp-plumber"; //обработка ошибок
import notify from "gulp-notify"; //вывод сообщений обработанных ошибок в уведомления windows
import browserSync from "browser-sync"; //локальный сервер
import newer from "gulp-newer"; //проверяет обновления картинок
import ifPlugin from 'gulp-if'; //условное ветвление

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  if: ifPlugin
}
