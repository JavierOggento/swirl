var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var karmaServer = require('karma').Server;
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
    sass: ['./src/scss/**/*.scss'],
    js: ['./src/js/**/*.js']
};

gulp.task('default', ['lint', 'babel', 'sass']);

gulp.task('sass', function(done) {
    gulp.src('./src/scss/ionic.app.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
/*    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))*/
    .on('end', done);
});

gulp.task('lint', function() {
    return gulp.src('./src/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('babel', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['babel']);
});

gulp.task('test', function(done) {
    new karmaServer({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done).start();
});

/*gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
    .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});*/

/*gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
          '  ' + gutil.colors.red('Git is not installed.'),
          '\n  Git, the version control system, is required to download Ionic.',
          '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
          '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});*/

