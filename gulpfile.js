var gulp = require('gulp');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var ngTemplates = require('gulp-ng-templates');
var minifyHtml = require('gulp-minify-html');

gulp.task('default', function() {

});

gulp.task('browserify', shell.task([
    'browserify src/js/main.js -o public/js/bundle.js'
]));

gulp.task('sass', shell.task([
    'sass src/scss/style.scss public/css/style.css'
]));

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

gulp.task('compress', function() {
    return gulp.src('./src/js/bundle.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/js/**/*.js'], ['browserify']);
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./src/views/index.html', './src/views/**/*.html'], ['view']);
});