const gulp = require('gulp')
const plantuml = require('gulp-plantuml')
const webserver = require('gulp-webserver')
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');

gulp.task('webserver', () => {
    gulp.src('dest')
    .pipe(webserver({
        host: 'localhost',
        port: 9898,
        livereload: true
    }));
})

gulp.task('plantuml', () => {
    gulp.src("./src/**/*.pu")
    .pipe(plantuml({ jarPath: "./plantuml_modules/plantuml.jar" }))
    .pipe(gulp.dest("./dest/img"))
})

gulp.task('combine', () => {
    gulp.src("./src/index.html")
    .pipe(ejs({},{ ext: '.html' }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest("./dest"))
})

gulp.task('copy', () => {
    gulp.src("./src/index.html")
    .pipe(gulp.dest("./dest"))
})

gulp.task('watch', () => {
    gulp.watch("./src/**/*.pu", [ "plantuml"])
    gulp.watch("./src/*.html", [ "copy" ])
})

gulp.task('default', ['combine', 'plantuml', 'watch', 'webserver'])
