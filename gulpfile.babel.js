'use strict';

import gulp     from 'gulp';
import path 	from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';
import gutil    from 'gulp-util';
import browserSync 			from 'browser-sync';
import del     				from 'del';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';
import url 					from 'url';
import proxy 				from 'proxy-middleware';


import ngAnnotate 	from 'gulp-ng-annotate';
import sourcemaps 	from 'gulp-sourcemaps';
import wrap 		from 'gulp-wrap';
import concat 		from 'gulp-concat';
import uglify 		from 'gulp-uglify';
import babel 		from 'gulp-babel';
import es2015 		from "babel-preset-es2015";
import cssmin		from 'gulp-cssmin';
import data 		from 'gulp-data';
import wiredep		from 'gulp-wiredep';
import sass			from 'gulp-sass';
import stylus		from 'gulp-stylus';
import plumber		from 'gulp-plumber';
import changed		from 'gulp-changed';

function errorHandler(err){
	gutil.log('错误: ', err.stack);
};
function htmlPath(file){
	if (file.isBuffer()) {
		let separator = 'client';
    	let _index = file.path.indexOf(separator);
    	let filepath = file.path.substring(_index+separator.length+1);
    	filepath = filepath.replace(/\\/g, '/');
    	filepath = path.dirname(filepath);
        file.contents = new Buffer(String(file.contents)
        	.replace(/(['|"|\(])([\w\s.\\\/\-]*?)\.(html|jpg|png)(['|"|\)])/g, '$1'+filepath+'/$2.$3$4' ));
  	}
};

var wwwroot = 'build/';
var build_dir = 'build/alphabond/';

var serve = browserSync.create();
// map of all paths
let paths = {
	entrance: 'client/index.html',
	vendor: ['client/vendor/**/*.*'],
	bower: ['bower.json'],
	scripts: ['!client/app/**/*.spec.js', 'client/app/configs/main.js', 'client/app/app.js', 'client/app/**/*.controller.js', "client/app/**/*.js"],
	styles   : ['client/app/global.css', 'client/app/**/*.styl', 'client/app/common.scss', 'client/app/**/*.scss'],
	templates: ['client/app/**/*.html'],
	images: ['client/app/**/*.png', 'client/app/**/*.jpg', 'client/app/**/*.gif'],
	test: ["client/app/**/*.spec.js"],
};

gulp.task("scripts", function() {
	return gulp.src(paths.scripts)
	.pipe(plumber({errorHandler: errorHandler}))
	.pipe(changed(build_dir))
	.pipe(sourcemaps.init())
	.pipe(data(htmlPath))
	.pipe(concat('app.min.js'))
	.pipe(babel({presets:[es2015]}))
	.pipe(ngAnnotate({dynamic: false}))
	.pipe(wrap('(function(window){<%= contents %>\n})(window);'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(build_dir))
	.pipe(serve.stream());
});

gulp.task("scripts-min", function() {
	return gulp.src(paths.scripts)
	.pipe(sourcemaps.init())
	.pipe(data(htmlPath))
	.pipe(concat('app.min.js'))
	.pipe(babel({presets:[es2015]}))
	.pipe(wrap('(function(window){<%= contents %>\n})(window);'))
	.pipe(ngAnnotate({dynamic: false}))
	.pipe(uglify({outSourceMap: true}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(build_dir));
});

gulp.task('index', function(){
	return gulp.src(paths.entrance)
	.pipe(wiredep({
      optional: 'configuration',
      goes: 'here',
      ignorePath: /..\/build\/alphabond\//,
    }))
    .pipe(gulp.dest(build_dir))
    .pipe(serve.stream());
});

gulp.task('vendor', function(){
    return gulp.src(paths.vendor)
    .pipe(gulp.dest(build_dir+'/vendor'));
});

gulp.task('templates', function () {
	return gulp.src(paths.templates)
	.pipe(data(htmlPath))
	.pipe(gulp.dest(build_dir+'app/'));
});

gulp.task('images', function () {
	gulp.src('client/resource/**/*.*')
	.pipe(gulp.dest(build_dir+'resource'));

	return gulp.src(paths.images)
	.pipe(gulp.dest(build_dir+'app'));
});

gulp.task('styles', function () {
	return gulp.src(paths.styles)
	.pipe(plumber({errorHandler: errorHandler}))
	.pipe(changed(build_dir))
	.pipe(data(htmlPath))
	.pipe(sourcemaps.init())
	.pipe(concat('app.min.css'))
	.pipe(sass())
	// .pipe(stylus())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(build_dir))
	.pipe(serve.stream());
});

gulp.task('styles-min', function () {
	return gulp.src(paths.styles)
	.pipe(plumber({errorHandler: errorHandler}))
	.pipe(data(htmlPath))
	.pipe(sourcemaps.init())
	.pipe(concat('app.min.css'))
	.pipe(sass())
	// .pipe(stylus())
	.pipe(cssmin())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(build_dir));
});

gulp.task('clean', (cb) => {
	del([wwwroot]).then(function (paths) {
		gutil.log("[clean]", paths);
		cb();
	})
});

gulp.task('serve', function(){
	var proxyOptions = url.parse('http://11.177.15.104/');
    proxyOptions.route = '/api';
	serve.init({
        port: process.env.PORT || 3001,
		open: false,
		notify: false,
		server: {
			baseDir: wwwroot,
			index: "index.html",
		},
		middleware: [
			historyApiFallback(),
			proxy(proxyOptions)
		]
    });
})

gulp.task("watch", function() {
    gulp.watch(paths.scripts, ['scripts']).on('change', ($event)=>{
    	serve.reload({stream: true});
    }).on('error', function(err){
    	console.log(err.stack);
    });
	gulp.watch(paths.templates, ["templates"] ).on('change', ($event)=>{
    	serve.reload({stream: true});
    });
	gulp.watch(paths.styles, ['styles']).on('change', ($event)=>{
    	serve.reload({stream: true});
    });
    gulp.watch(paths.entrance, ["index"] ).on('change', ($event)=>{
    	serve.reload({stream: true});
    });
    gulp.watch(paths.bower, ["index"] );
});

gulp.task("build", function(){
	sync(['index', 'images', "scripts-min", "styles-min", "templates"]);
});
gulp.task("default", ['serve', 'index', 'images', "scripts", "styles", "templates", 'watch']);