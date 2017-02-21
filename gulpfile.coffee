gulp = require 'gulp'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

gulp.task 'build', ->
  gulp.src './js/*.js'
    .pipe uglify()
    .pipe rename(extname: '.min.js')
    .pipe gulp.dest './js/min'
  gulp.src './pug/*.pug'
    .pipe uglify()
    .pipe gulp.dest './'

gulp.task 'default', ['build']
