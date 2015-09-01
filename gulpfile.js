var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    jshint = require('gulp-jshint'),

    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('jshint', function () {
    return gulp.src([
        '*/**.js',
        '*/*/**.js',
        '!node_modules/*/**.js',
        '!node_modules/*/*/**.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

/*------ Watch Tasks --------*/
gulp.task('watch', ['watch:backend']);
gulp.task('watch:backend', function () {
    gulp.watch([
        '*/**.js',
        '*/*/**.js',
        '!node_modules/*/**.js',
        '!node_modules/*/*/**.js'
    ], ['jshint', 'mochatest']);
});

/*------ Server --------*/

gulp.task('mochatest', function () {
    return gulp.src(['test/**.js', 'test/*/**.js'])
        .pipe(mocha({reporter: 'nyan'}))
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'bin/www',
        ext: 'js',
        ignore: ['gulp*', 'src/**.js', 'src/*/**.js', 'src/^/*/**.js', 'public/js/**.js', 'node_modules/*/**.js', 'node_modules/*/*/**.js']
    })
});

/*------ Task Registration --------*/
gulp.task('default', ['nodemon','watch']);
gulp.task('server', ['nodemon']);
