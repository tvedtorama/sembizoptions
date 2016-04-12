var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat')
const gulpBabel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

function compile(fileSpec, folder) {
	return gulp
		.src(fileSpec)
		.on('end', function() { console.log('Done compiling'); })
		.pipe(sourcemaps.init())
		.pipe(gulpBabel({presets: ['es2015', 'stage-0']}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

function compileRuntime(watch) {
  return compileBrowserify("./app/main.js", 'build/web', watch);
}

var serverPath = './server/**/*.js'
var testsPath = './tests/**/*.js'

function compileServer() {
	return compile(serverPath, './build/server') 
}

function compileTests() {
	return compile(testsPath, './build/tests')
}


function watchForTests() {
  return compileForTests(true);
}

function sassIt(path) {
  console.log('sassing...')
  return gulp.src(path).
    pipe(sass().on('error', sass.logError)).
    pipe(gulp.dest('./build/web/css/'));
}

gulp.task('buildServer', function() { return compileServer(); });
gulp.task('buildTests', function() { return compileTests(); });
gulp.task('buildRuntime', function() { return compileRuntime(); });
gulp.task('watchServer', function() { return gulp.watch(serverPath, function() {compileServer()}) });
gulp.task('watchTests', function() { return gulp.watch(testsPath, function() {compileTests()}) });
gulp.task('watchRuntime', function() { return compileRuntime(true); });
gulp.task('watchForTests', function() { return watchForTests(); });

var sassPath = 'sass/**/*.scss'

gulp.task('styles', function() {  
	return sassIt(sassPath)
	gulp.watch(sassPath, function () {
	 sassIt(sassPath)
	});
});

gulp.task('watchStyles', function() {  
	gulp.watch(sassPath, function () {
		sassIt(sassPath)
	});
});

gulp.task('build', ['buildRuntime', 'buildServer', 'buildTests', 'styles'])
gulp.task('watch', ['styles', 'watchStyles', 'buildServer', 'watchServer', 'watchTests', 'watchRuntime']);
gulp.task('ci', ['build'])

gulp.task('default', ['watch', 'styles']);
