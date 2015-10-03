(function(root, factory) {

	// Инициализация фрэймворка
	// @root - Среда инициализации
	// @factory - Функция возвращающая объкт с методами
	root.gQuary = factory();

})(this, function() {

	// Фабрика объектов
	var gQuary = function(selector, context) {
		return new gQuary.prototype.init(selector, context);
	};

	// Служебная функция поиска элемента
	// @string - селектор
	// Возвращает false, если ничего не нашел
	var def = function(string) {

		if (string) {
			var element = [];

			if (string[0] === '#' && document.getElementById(string.substring(1))) {
				element[0] = document.getElementById(string.substring(1));
			} else if (document.getElementsByTagName(string).length) {
					element = document.getElementsByTagName(string);
			} else {
					element = document.getElementsByClassName(string.substring(1));
			}

			if (element.length) return element;
		}
		return false;
	};

	// Прототип фабрики объектов
	// init - метод, который возвращает объект со всеми методами, и найденными элементами
	// @selector - Селектор элемента, tagname, .class, #id или же название тэга(<tagname>) для создания нового элемента
	// @context -  Контекст для установки нового элемента
	// Возвращает объект прототип, с найденным элементом или без
	gQuary.prototype = {
		constructor: gQuary,
		length: 0,
		init: function(selector, context) {
			var element = def(selector);

			if (element) {
				if (element.length === 1) {
					this.length = 1;
					this[0] = element[0];
				} else {
					this.length = element.length;
					for (var i = 0; i < this.length; i++) {
						this[i] = element[i];
					}
				}
			} else if (selector[0] === '<' && selector[selector.length - 1] === '>') {
				this.length = 1;
				this[0] = document.createElement(selector.substring(1, selector.length - 1));

				if (context) {
					def(context)[0].appendChild(this[0]);
				}
			}
			return this;
		}
	};

	// Делаем прототипом метода init, объект в котором этот метод сам инициализирован
	gQuary.prototype.init.prototype = gQuary.prototype;

	// Методы для работы с DOM и CSS
	// this[0] - найденный элемент
	// =================================

	// Статический метод конструктора для добавления или удаления классов
	// @action - действие - удаления, добавление
	// @self - ссылка на прототип конструктора
	// args - имена классов
	gQuary.act = function(action, self, args) {
		var num = 0 ;
		
		var length = args.length;

		if (action && length) {
			if (typeof args[length - 1] !== 'string' && self.length > 1) {
				num = args[length - 1];
				length -= 1;
			}

			for (var i = 0; i < length; i++) {
				self[num].classList[action](args[i]);
			}
		}
	};

	// Метод возвращает true, если заданный класс (@name) есть у элемента
	// Возвращает false, если заданного класса нету у элемента
	gQuary.prototype.hasClass = function(name) {
		for (var i = 0; i < this[0].classList.length; i++) {
			if (this[0].classList[i] === name) return true;
		}
		return false;
	};

	// Метод вывода класса или классов найденных элементов
	gQuary.prototype.classList = function() {
		var classAll = [];
		for (var i = 0; i < this.length; i++) {
			classAll[i] = this[i].classList;
		}
		return classAll;
	};

	// Метод добавления новых классов элементу
	// @name[, @secondName] - имена добавляемых классов,
	// Если найденно будет больше одного элемента, то последним аргументом можно передать,
	// номер конкретного элемента, по умолчанию ноль
	// Возвращает прототип
	gQuary.prototype.addClass = function(name) {
		gQuary.act('add', this, arguments);
		return this;
	};

	// Метод удаления классов элемента
	// @name[, @secondName] - имена удаляемых классов,
	// Если найденно будет больше одного элемента, то последним аргументом можно передать,
	// номер конкретного элемента, по умолчанию ноль
	// Возвращает прототип
	gQuary.prototype.removeClass = function(name) {
		gQuary.act('remove', this, arguments);
		return this;
	};
	// =================================

	// Возвращаем объект с методами
	return gQuary;
});
