// Проверка поддержки webp, добавление класса webp или no-webp для html

export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для html
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp'; // по идее в html в браузере должен быть класс webp, но тут получается no-webp возможно из-за не той картинки в webP.src = ''
		document.documentElement.classList.add(className);
	});
}