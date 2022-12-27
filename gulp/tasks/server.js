
export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${ app.path.build.html }`, // baseDir папка app.path.build.html ./dist
		},
		notify: false, // Сообщения в браузере
		port: 3000,
		browser: "chrome",
		// reloadDelay: 2000  // Wait for 2 seconds before any browsers should try to inject/reload a file.
		// reloadDebounce: 2000  // Wait for a specified window of event-silence before sending any reload events.
	});
}






