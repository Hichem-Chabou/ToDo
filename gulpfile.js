'use strict';

var gulp = require("gulp");
var imagemin = require('gulp-imagemin');

exports.default = () => (
  gulp.src('./assets/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./assets/img'))
      
);
