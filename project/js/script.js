window.onload = function() {

	var doc = document.documentElement;

	setPlaceholder();

	var navOptions = {
		elem: document.querySelector('#header ul'),
		changeElem: document.querySelector('.title h1'),
		newClass: 'scrolled-page',
		minWidth: 1000
		};

	var nav = new Navigation(navOptions);

	window.onscroll = function() {
		if (doc.clientWidth >= navOptions.minWidth) nav.scrollPage();
	};

	var menuOptions = {
		elem: document.querySelector('nav'),
		list: document.querySelector('ul'),
		maxWidth: 1000
	};

	var menu = new Menu(menuOptions);

	window.onresize = function() {
		if (doc.clientWidth >= menuOptions.maxWidth) {
			menu.removeButton();
			menu.removeMenu();
		} else menu.renderButton();
	};

	function Navigation(options) {

		var nav = options.elem;
		var changeElem = options.changeElem;
		var newClass = options.newClass;

		function scrollPage() {
			var changeElemCoords = changeElem.getBoundingClientRect();
			if ( changeElemCoords.top < 0) nav.classList.add(newClass);
			else nav.classList.remove(newClass);
		};

		if (doc.clientWidth >= options.minWidth) scrollPage();

		this.scrollPage = scrollPage;
	};

	function Menu(options) {

		var menu = options.elem;
		var list = options.list;
		var button;

		function renderButton() {
			if (button) return;

			button = document.createElement('div');
			button.className = 'button';
			menu.insertBefore(button, list);

			button.onclick = toggleMenu;
		};

		function toggleMenu() {
			list.classList.toggle('displayed-menu');
		};

		function removeMenu() {
			list.classList.remove('displayed-menu');
		};

		function removeButton() {
			if (!button) return;

			menu.removeChild(button);
			button = null;
		};

		if (doc.clientWidth < options.maxWidth) renderButton();

		this.renderButton = renderButton;
		this.toggleMenu = toggleMenu;
		this.removeButton = removeButton;
		this.removeMenu = removeMenu;
	};

};

function setPlaceholder() {

	if (elementSupportsAttribute('input', 'placeholder')) return;

	var elements = document.querySelectorAll('[placeholder]');

	for (var i = 0; i < elements.length; i++) {
		var placeholder = elements[i].getAttribute('placeholder');
		elements[i].setAttribute('value', placeholder);

		elements[i].onfocus = function() {
			this.setAttribute('value', '');
		};

		elements[i].onblur = function() {
			var placeholder = this.getAttribute('placeholder');
			this.setAttribute('value', placeholder);
		};
	};
};

function elementSupportsAttribute(element, attribute) {
	var test = document.createElement(element);
	return (attribute in test);
};