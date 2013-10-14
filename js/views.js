var app = app || {};

/**
 * View главной страницы
 */
app.IndexContent = Backbone.View.extend({
	tagName: 'section',
	className: 'main-page-info',
	template: _.template($( '#index-template' ).html()),
	initialize: function(){
		this.render();
		console.debug('Вьюха главной инициализировалась');
	},
	render: function(){
		$('#container').html('')
		$('#container').append(this.$el);
		this.$el.html(this.template());
		return this;
	}
});


/**
 * View студента для списка
 */
app.InlineStudent = Backbone.View.extend({
	tagName: 'li',
	className: 'json-elem',
	template: _.template($( '#inlineStudent-template' ).html()),
	events: {
		'click a': 'openStudentInfo'
	},
  /**
   * Отмена стандартного поведения ссылки и генерация события
   * открытия информации о студенте.
   *
   * @param event - принимает и обрабатывает событие клика по себе
   */
	openStudentInfo: function(event){
		event.preventDefault();
		this.options.parent.trigger('showStudentInfo', this.model);
	},
	render: function(){
		var attrs = this.model.toJSON();
		this.$el.html(this.template(attrs));
		return this;
	}
});

/**
 * View лекции для списка
 */
app.InlineLesson = Backbone.View.extend({
	tagName: 'li',
	className: 'inline-lesson-island',
	template: _.template($( '#inlineLesson-template' ).html()),
	events: {
		'click .inline-lesson_lesson-link': 'openLessonInfo'
	},
  /**
   * Отмена стандартного поведения ссылки и генерация события
   * открытия информации о лекции.
   *
   * @param event - принимает и обрабатывает событие клика по себе
   */
	openLessonInfo: function(event){
		console.debug(this.model.toJSON());
		event.preventDefault();
		this.options.parent.trigger('showLessonInfo', this.model);
	},
	render: function(){
		var attrs = this.model.toJSON();
		attrs = _.extend(attrs, this.options.lector.toJSON());
		this.$el.html(this.template(attrs));
		return this;
	}
});


/**
 * View списка студентов
 */
app.StudentListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'list-of-choosed-item',
  /**
   * Подписываемся на изменения коллекции
   * и в случае события reset - перерисовываемся
   */
	initialize: function(){
		this.collection.on('reset', this.render, this);
		console.debug('View коллекции студентов создана');
	},
	render: function(){
		$('#container').html('');
		this.collection.forEach(this.render_One, this );
		$('#container').append(this.$el);
		console.debug('Рендер view списка студентов закончен');
	},
  /**
   * Создаем вьюшку студента для списка, в дополнительные опции
   * записываем ссылку на родительскую вьюшку модели
   *
   * @param student - модель конкретного студента из коллекции
   */
	render_One: function(student){
		var inlineStudent = new app.InlineStudent({
			model: student,
			parent: this
		});
		this.$el.append(inlineStudent.render().el);
	}
});

/**
 * View списка лекций
 */
app.LessonListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'lesson-list',
  /**
   * Подписываемся на изменения коллекции
   * и в случае события reset - перерисовываемся
   */
	initialize: function(){
		this.collection.on('reset', this.render, this);
		console.debug('View коллекции лекций создана');
	},
	render: function(){
		$('#container').html('');
		this.collection.forEach(this.render_One, this );
		$('#container').append(this.$el);
		console.debug('Рендер view списка лекций закончен');
	},
  /**
   * Для заполнения шаблона лекции необходимо получить данные из 
   * коллекции лекторов. По переданной в options (при создании 
   * инстанса в функции start роутера) ссылке на коллекцию
   * лекторов дергаем нужный id лектора и получаем модель с данными
   * лектора этой лекциию. Передаем лектора дальше, а также
   * ссылку на инстанс этой вьюшки
   *
   * @param lesson - модель конкретной лекции
   */
	render_One: function(lesson){
		var lectorId = lesson.get('lectorId');
		var lector = this.options.lectorCollection.get(lectorId);
		var inlineLesson = new app.InlineLesson({
			model: lesson,
			parent: this,
			lector: lector
		});
		this.$el.append(inlineLesson.render().el);
	}
});

/**
 * View профиля студента
 */
app.StudentInfo = Backbone.View.extend({
	tagName: 'article',
	className: 'student_info-page',
	template: _.template($( '#studentInfo-template' ).html()),
	render: function(){
		var attrs = this.model.toJSON();
		this.$el.html(this.template(attrs));
		$('#container').html('');
		$('#container').append(this.$el);
	}
});

/**
 * View информации о лекции
 */
app.LessonInfo = Backbone.View.extend({
	tagName: 'article',
	className: 'lesson-info-page',
	template: _.template($( '#lessonInfo-template' ).html()),
  /**
   * Получаем из options ссылку на модель лектора этой лекции
   * и перегоняем его в "json". Так же поступаем с родной моделью
   * С помощью замечательной фукнции андерскора, объеденяем объекты
   * в один и пихаем его в шаблон рендерится
   */
	render: function(){
		var lector = this.options.lector.toJSON();
		var attrs = this.model.toJSON();
		attrs = _.extend(attrs, lector);
		this.$el.html(this.template(attrs));
		$('#container').html('');
		$('#container').append(this.$el);
	}
});