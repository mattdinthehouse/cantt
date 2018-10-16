var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var postCSS         = require('gulp-postcss');
var objectFitImages = require('postcss-object-fit-images');

gulp.task('styles', function() {
	gulp.src('styles/**/[^_]*.scss')
	.pipe(plumber(function (error) {
		console.log(error);
		this.emit('end');
	}))
	.pipe(sass())
	.pipe(postCSS([objectFitImages]))
	.pipe(autoprefixer({browsers: ['defaults', 'iOS >= 8']}))
	.pipe(gulp.dest('public/styles/'));
});

gulp.task('scripts', function() {
	gulp.src('scripts/**/[^_]*.js')
	.pipe(plumber(function (error) {
		console.log(error);
		this.emit('end');
	}))
	.pipe(gulp.dest('public/scripts/'));
});

gulp.task('default', ['watch']);

gulp.task('watch', function() {
	gulp.watch('styles/**/*.scss',['styles']);
	gulp.watch('scripts/**/*.js',['scripts']);
});