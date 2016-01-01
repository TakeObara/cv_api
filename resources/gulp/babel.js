var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('babel', function () {
    return gulp.src(['./resources/components/*.jsx', './resources/components/main.jsx' ,'./resources/route.jsx'])
        .pipe(babel().on('error', gutil.log))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist'));
});

