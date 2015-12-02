var gulp = require('gulp');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');

var srcPaths = {
    js: ['./src/js/**/*.js'],
    scss: ['./src/scss/**/*.scss']
};

gulp.task('default', function() {

});

gulp.task('browserify', shell.task([
    'browserify src/js/main.js -o public/js/bundle.js'
]));

gulp.task('compress', function() {
    return gulp.src('./src/js/bundle.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('sass', shell.task([
    'sass src/scss/style.scss public/css/style.css'
]));

gulp.task('watch', function () {
    gulp.watch(srcPaths.js, ['browserify']);
    gulp.watch(srcPaths.scss, ['sass']);
});