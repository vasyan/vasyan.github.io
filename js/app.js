/**
 * Удобный "глобальный" обьект, куда собираю все компаненты приложения
 * Используется в каждом файле (однажды будет использован нормальный сборщик)
 */
var app = app || {};

/**
 * Роутер приложения.
 */
var AppRoute = new (Backbone.Router.extend({
	routes: {
		'' :'index',
		'student/:id': 'showStudentById',
		'lesson/:id': 'showLessonById',
		'student': 'showStudentList',
		'lesson': 'showLessonList'
	},
  /**
   * Делаем независимую копию получаемого объекта, и работаем далее с ним
   *
   * @param application - тот самый глобальный объект из топа всех файлов
   */
	start: function(application){
		this.app = _.clone(application);
		this.student = new this.app.Student();
		this.studentList = new this.app.StudentList({model: this.student});
		this.studentList.reset(this.app.studentsJSON);
		this.studentListView = new this.app.StudentListView({collection: this.studentList});
		this.studentListView.on('showStudentInfo', this.showStudentInfo, this);
		this.lector = new this.app.Lector();
		this.lectorList = new this.app.LectorList({model: this.lector});
		this.lectorList.reset(this.app.lectorsJSON);
		this.lesson = new this.app.Lesson();
		this.lessonList = new this.app.LessonList({model: this.lesson});
		this.lessonList.reset(this.app.lessonsJSON);
    /**
     * Посылаем в options ссылку на коллекцию лекторов для
     * дальнейшей отрисовки во вьюшках лекций
     */
		this.lessonListView = new this.app.LessonListView({
			collection: this.lessonList,
			lectorCollection: this.lectorList
		});
    /**
     * Подписываемся на событие о клике на подробности лекции,
     * Запускаем историю!
     */
		this.lessonListView.on('showLessonInfo', this.showLessonInfo, this);		
		Backbone.history.start();
	},
	index: function() {
		console.debug('Инициализируем главную');
		this.indexContent = new this.app.IndexContent();
	},

  /**
   * Рендерим инфо о студенте по клику на него из списка студентов
   * и обновляем url
   * @param model - получаем модель студента
   */
	showStudentInfo: function(model){
		this.navigate('student/' + model.get('id'));
		this.studentInfo = new this.app.StudentInfo({'model': model});
		this.studentInfo.render();
	},
  /**
   * Рендерим инфо о студенте по прямому заходу по ссылке - 
   * делимся ссылкой с друзьями
   * 
   * @param id - id студента взятый из введенного url
   */
	showStudentById: function (id) {
		var model = this.studentList.get(id);
		this.studentInfo = new this.app.StudentInfo({'model': model});
		this.studentInfo.render();
	},
  /**
   * Рендерим инфо о лекции по прямому заходу по ссылке - 
   * делимся ссылкой с друзьями
   * Получаем модель лектора этой лекции и отправляем ссылку
   * на нее через options
   *
   * @param id - id лекции взятый из введенного url
   */
	showLessonById: function(id){
		var model = this.lessonList.get(id);
		var lectorId = model.get('lectorId');
		var lector = this.lectorList.get(lectorId);
		this.lessonInfo = new this.app.LessonInfo({
			'model': model,
			'lector': lector
		});
		this.lessonInfo.render();
	},
  /**
   * Получаем модель лектора из коллекции лекторов по id
   * и передаем ссылку на нее в инстанс LessonInfo
   *
   * @param model - модель лекции из списка
   */
	showLessonInfo: function(model){
		console.debug('Показываем инфу о лекции');
		var id = model.get('id');
		this.navigate('lesson/' + id);
		var lectorId = model.get('lectorId');
		var lector = this.lectorList.get(lectorId);
		this.lessonInfo = new this.app.LessonInfo({
			'model': model,
			'lector': lector
		});
		this.lessonInfo.render();
	},
	showStudentList: function(){
		console.debug('Инициализируем список студентов');
		this.studentListView.render();
	},
	showLessonList: function(){
		console.debug('Инициализируем список лекций');
		this.lessonListView.render();
	}
}));

/**
 * Запускаем приложение 
 */
AppRoute.start(app);

/**

	TODO:
	- Имеется бага с невозможностью посмотреть более одного профиля студента/лекции за одну сессию.
	
**/
