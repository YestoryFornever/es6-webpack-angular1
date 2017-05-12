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
var cache_dir = 'build/cache/';

var serve = browserSync.create();
// map of all paths
let paths = {
	entrance: 'client/index.html',
	vendor: ['vendor/**/*.*'],
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
	// .pipe(changed(cache_dir))
	.pipe(sourcemaps.init())
	.pipe(data(htmlPath))
	.pipe(data(function(file){
		if (file.isBuffer() && file.path.indexOf('/configs/')) {
	        file.contents = new Buffer(
	        	String(file.contents)
	        	.replace('${serverIp}', 'http://11.177.15.104/')
	        	.replace('${easemobAppKey}', 'lz0817#javatest')
	        	.replace('${officialnUrl}', 'http://11.177.15.104/official_ebsite/')
        	);
	  	}
	}))
	.pipe(babel({presets:[es2015],compact: false}))
	// .pipe(gulp.dest(cache_dir))
	.pipe(concat('app.min.js'))
	.pipe(ngAnnotate({dynamic: false}))
	.pipe(wrap('(function(window){<%= contents %>\n})(window);'))
	// .pipe(uglify({
	// 	outSourceMap: true,
	// }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(build_dir));
});

gulp.task("scripts-min", function() {
	return gulp.src(paths.scripts)
	// .pipe(sourcemaps.init())
	.pipe(data(htmlPath))
	.pipe(concat('app.min.js'))
	.pipe(babel({presets:[es2015]}))
	.pipe(wrap('(function(window){<%= contents %>\n})(window);'))
	.pipe(ngAnnotate({dynamic: false}))
	.pipe(uglify({
		compress: {
      		drop_console: true
	    }
	}))
	// .pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(build_dir));
});

gulp.task('index', function(){
	return gulp.src(paths.entrance)
	.pipe(data(function(file){
		if (file.isBuffer()) {
	        file.contents = new Buffer(
	        	String(file.contents)
	        	.replace('app.min.css', 'app.min.css?'+(new Date()).getTime())
	        	.replace('app.min.js', 'app.min.js?'+(new Date()).getTime())
        	);
	  	}
	}))
	.pipe(wiredep({
      optional: 'configuration',
      goes: 'here',
      ignorePath: /..\/build\/alphabond\//,
    }))
    .pipe(gulp.dest(build_dir));
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
	.pipe(serve.stream({match:'**/*.css'}));
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
		files: [build_dir+'app.min.css', build_dir+'app.min.js', build_dir+"index.html"],
		server: {
			baseDir: wwwroot,
			index: "index.html",
		},
		// serveStatic:[{
	 //        route: '/alphabond/resource',
	 //        dir: 'client/resource'
	 //    }],
		middleware: [
			historyApiFallback({
				index: '/alphabond/index.html',
			}),
			proxy(proxyOptions),
		]
    });
})

gulp.task("watch", function() {
    gulp.watch(paths.scripts, ['scripts']).on('change', ($event)=>{
    	// serve.reload({stream: true});
    }).on('error', function(err){
    	console.log(err.stack);
    });
	gulp.watch(paths.templates, ["templates"] ).on('change',serve.reload);
	gulp.watch(paths.styles, ['styles']).on('change', ($event)=>{
    	// serve.reload({stream: true});
    });
    gulp.watch(paths.entrance, ["index"] ).on('change', ($event)=>{
    	// serve.reload({stream: true});
    });
    gulp.watch(paths.bower, ["index"] );
});

gulp.task("build", function(){
	sync(['index', 'images', "scripts-min", "styles-min", "templates", 'vendor']);
});
gulp.task("preview", ['serve', 'index', 'images', "scripts-min", "styles-min", "templates", 'vendor', 'watch']);
gulp.task("default", ['serve', 'index','images', "templates", "scripts", "styles", 'vendor', 'watch']);

let resolveToComponents = (glob = '') => {
	return path.join('client', 'app/components', glob); // app/components/{glob}
};
gulp.task('component', () => {
	const cap = (val) => {
		return val.charAt(0).toUpperCase() + val.slice(1);
	};
	const name = yargs.argv.name;
	const parentPath = yargs.argv.parent || '';
	const destPath = path.join(resolveToComponents(), parentPath, name);

	return gulp.src(path.join(__dirname, 'generator', 'component/**/*.**'))
		.pipe(template({
			name: name,
			hump: name.replace(/(-\w)/g,item=>item[1].toUpperCase()),
			upCaseName: cap(name).replace(/(-\w)/g,item=>item[1].toUpperCase())
		}))
		.pipe(rename((path) => {
			path.basename = path.basename.replace('temp', name);
		}))
		.pipe(gulp.dest(destPath));
});