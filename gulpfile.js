var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var colors = require('colors');
var browserSync = require('browser-sync').create();

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: ["./node_modules/normalize.css"]
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(__dirname + '/sass/main.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(__dirname + '/docs/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['sass'], function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "./docs"
    }
  });

  gulp.watch('sass/**/*.scss', ['sass'])
    .on('change', function(event) {
      console.log(`File ${event.path} was ${event.type}, running tasks...`.yellow);
    });
  
  gulp.watch("docs/index.html").on('change', function(event) {
    console.log(`File ${event.path} was ${event.type}, running tasks...`.yellow);
    browserSync.reload();
  });
});