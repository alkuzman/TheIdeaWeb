/**
 * Created by AKuzmanoski on 12/11/2016.
 */
var gulp = require ('gulp');
var path = require('path');
import Config from '../../config';

var scssPaths = ['./node_modules/'];

var node = './node_modules';
var src = './src';
var importerFunction = function(url: any, prev: any, done: any) {
  if (url[0] === '~') {
    url = path.resolve('node_modules', url.substr(1));
  }

  return { file: url };
};

export = () => {
  var sass = require ('gulp-sass');
  var sourcemaps = require ('gulp-sourcemaps');

  return gulp.src ([src + '/client/**/*.scss'])
    .pipe (sourcemaps.init ())
    .pipe (sass ({importer: importerFunction, includePaths:scssPaths, outputStyle: 'compressed'}))

    .pipe (sourcemaps.write ('./'))
    .pipe (gulp.dest (Config.APP_DEST + '/'));
};
