// Удаляет файлы в папке dist, если они удалены из src
// Необходимо установить плагин del   npm i -D del

import del from 'del';

export const reset = () => {
    return del( app.path.clean );
}