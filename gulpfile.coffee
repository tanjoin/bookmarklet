gulp = require 'gulp'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
pump = require 'pump'

gulp.task 'build', (cb) ->
  pump [
      gulp.src './js/*.js'
      uglify()
      rename(extname: '.min.js')
      gulp.dest './js/min'
    ],
    cb

gulp.task 'default', ['build', 'watch']

gulp.task 'watch', ->
  gulp.watch '*.js', ['build']
