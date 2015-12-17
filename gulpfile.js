var gulp = require('gulp');

gulp.task('hello', function() {

});

gulp.task('make', function() {
    var runSequence = require('run-sequence');

    runSequence('lint', 'browserify', 'sass', 'view', 'compress', function() {
        console.log('Done');
    });
});

// JSHint task
gulp.task('lint', function() {
    var jshint = require('gulp-jshint');
    var notify = require("gulp-notify");

    gulp.src(['./src/js/main.js', './src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', notify.onError({ title: 'JS hint', message: 'JS hint fail'}));
});

// Browserify task
gulp.task('browserify', function() {
    var browserify = require('gulp-browserify');
    var concat = require('gulp-concat');

    gulp.src(['src/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }).on('error', function (err) {
            console.log(err);
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function() {
    var sass = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var notify = require("gulp-notify");

    gulp.src('src/scss/style.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass().on('error', function (err) {
            console.log(err);
        }))
        .on('error', notify.onError({ title: 'SASS', message: 'SASS fail'}))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe(gulp.dest('public/css/'))

});

// Package and copy views
gulp.task('view', function() {
    var ngTemplates = require('gulp-ng-templates');
    var minifyHtml = require('gulp-minify-html');

    gulp.src('./src/views/index.html')
        .pipe(gulp.dest('./public'));

    gulp.src('src/views/templates/**/*.html')
        .pipe(minifyHtml({empty: true, quotes: true}))
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: 'app',
            standalone: false,
            path: function (path, base) {
                return path.replace(base, '').replace('/templates', '');
            }
        }))
        .pipe(gulp.dest('public/js'));
});

// Compresses assets in public folder
gulp.task('compress', function() {
    var uglify = require('gulp-uglify');

    return gulp.src('./public/js/bundle.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/js'));
});

// Watch sources
gulp.task('watch', function () {
    gulp.watch(['./src/js/**/*.js'], ['lint', 'browserify']);
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./src/views/index.html', './src/views/**/*.html'], ['view']);
});

gulp.task('pre-commit', function () {
    var guppy = require('git-guppy')(gulp);
    var jshint = require('gulp-jshint');
    var notify = require("gulp-notify");

    return gulp.src(['./src/js/main.js', './src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});