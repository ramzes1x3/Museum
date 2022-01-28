import del from "del"; //удаляет папки

export const reset = () => {
    return del(app.path.clean)
}
