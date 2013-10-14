var app = app || {};

/**
 * Model студента
 */
app.Student = Backbone.Model.extend({
	defaults: {
	"id": null,
    "first_name":"Аноним",
    "last_name":"Неопределенный",
    "city":null,
    "about":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, reiciendis, necessitatibus, enim, reprehenderit dolores architecto modi commodi harum velit quia doloribus et quibusdam quidem! Quasi, tenetur, autem, vero cupiditate aperiam sint magnam fuga impedit esse omnis quod natus non accusantium architecto perferendis blanditiis delectus magni similique maxime laborum temporibus dicta!",
    "link_photo":"img/anon.jpg",
    "link_facebook":"facebook.com",
    "link_vk":"vk.com",
    "link_gihub":"github.com",
    "link_yaru":"ya.ru"
	}
});

/**
 * Model лекции
 */
app.Lesson = Backbone.Model.extend({
	defaults: {
    'title' : 'Неизвестная лекция',
    'videoDownloadUrl': null,
    'videoSize': null,
    'pdfDownload-url': null,
    'frameVideo': null,
    'framePdf': null,
    'lectorId': null,
  }
});

/**
 * Model лектора
 */
app.Lector = Backbone.Model.extend({
	defaults: {
		"id": null,
	  "nameOfLecturer": "Анонимный Лектор",
	  "photo": "img/anon.js",
	  "about": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, ipsum adipisci unde voluptates corporis! Magni, illum, natus, aspernatur, ullam dicta enim unde modi tempore ipsa odio quam fugit sapiente facere saepe alias dolores optio quidem ratione. Minima, cum, ex officia maiores illum voluptas dolores sapiente alias soluta rem perspiciatis quaerat!"
	}
});

/**
 * Коллекция студентов
 */
app.StudentList = Backbone.Collection.extend({
	model: app.Student
});

/**
 * Коллекция лекций
 */
app.LessonList = Backbone.Collection.extend({
	model: app.Lesson
});

/**
 * Коллекция лекторов
 */
app.LectorList = Backbone.Collection.extend({
	model: app.Lector
});