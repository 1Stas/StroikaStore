export const copy = () => {		// Экспорт для использования функции
	// Задача копирование из src to dest
	return app.gulp.src(app.path.src.files)
		.pipe(app.gulp.dest(app.path.build.files));
}

