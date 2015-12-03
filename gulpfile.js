var gulp = require('gulp');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var ngTemplates = require('gulp-ng-templates');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

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
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('jshint-stylish'));
});

// Package javascript sources
gulp.task('browserify', shell.task([
    'browserify src/js/main.js -o public/js/bundle.js'
]));

// Compile SCSS
gulp.task('sass', shell.task([
    'sass src/scss/style.scss public/css/style.css'
]));

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