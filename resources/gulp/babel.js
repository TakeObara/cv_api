var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var concat = require('gulp-concat');


var _prefix = './resources';
var src = [
    _prefix + '/dispatcher.jsx',
    _prefix + '/stores/*.jsx',
    _prefix + '/components/*.jsx', 
    _prefix + '/components/main.jsx' ,
    _prefix + '/route.jsx',
];

gulp.task('babel', function () {
    return gulp.src(src)
        .pipe(babel().on('error', gutil.log))
        // .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist'));
});

