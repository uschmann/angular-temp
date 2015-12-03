var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngTemplates = require('gulp-ng-templates');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {

});

gulp.task('make', function() {
    runSequence('lint', 'browserify', 'sass', 'view', 'compress', function() {
        console.log('Done');
    });
});

// JSHint task
gulp.task('lint', function() {
    gulp.src(['./src/js/main.js', './src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Browserify task
gulp.task('browserify', function() {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['src/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('public/js/'));
});

gulp.task('sass', function() {
    gulp.src('src/scss/style.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({onError: function(e) { console.log(e); } }))
        // Optionally add autoprefixer
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        // These last two should look familiar now :)
        .pipe(gulp.dest('public/css/'));
});

// Package and copy views
gulp.task('view', function() {
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