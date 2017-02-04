'use strict';

var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    watch   = require('gulp-watch'),
    stylish = require('jshint-stylish'),
    babel   = require('gulp-babel');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['.', '.tmp']
  });
});
 
gulp.task('livereload', function() {
  gulp.src(['.tmp/css/*.css', '.tmp/js/dest/**/*.js'])
    .pipe(watch('watch'))
    .pipe(connect.reload());
});
  
gulp.task('css', function() {
  gulp.src('css/*.css')
    .pipe(gulp.dest('.tmp/css'));
});
 
gulp.task('js', function() {
  gulp.src('js/src/**/*.js')
    .pipe(gulp.dest('.tmp/js/dest'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css']);
  gulp.watch('js/src/**/*.js', ['babel', 'livereload']);
});

gulp.task('babel', function() {
    gulp.src('js/src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js/dest'));
});
 
gulp.task('default', ['webserver', 'livereload', 'watch']);