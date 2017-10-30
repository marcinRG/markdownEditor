'use strict';
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')({ lazy: true });
var sassLint = require('gulp-sass-lint');
var tsify = require('tsify');
var del = require('del');
var settings = require('./gulp.settings/settings');

gulp.task('clean-styles', function (done) {
    var files = settings.app.cssFolder + '*.css';
    clean(files, done);
});

gulp.task('code-check', function () {
    return gulp.src(settings.app.allTSs)
        .pipe($.tslint({
            formatter: "verbose"
        }))
        .pipe($.tslint.report());
});

gulp.task('lint-sass', ['clean-styles'], function () {
    return gulp.src(settings.app.scssStyles)
        .pipe(sassLint(
            {
                configFile: '.sass-lint.yml'
            }
        ))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('test-run', function(done){
    runTests(done);
});

gulp.task('sass-compile', ['lint-sass'], function () {
    msg('Kompilacja plików scss -> css');
    return gulp.src(settings.app.scssFile)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest(settings.app.cssStyles));
});

gulp.task("ts-compile", ['code-check'], function () {
    return gulp.src(settings.app.allTSs)
        .pipe(tsProject())
        .pipe(gulp.dest(settings.app.jsAppFolder));
});

gulp.task('browserify-compil', function () {
    return browserify({
        entries: [settings.app.tsFile],
        debug: true
    }).plugin(tsify)
        .bundle()
        .pipe(source(settings.app.compiledJS))
        .pipe(gulp.dest('./'));
});

gulp.task('browserify-inject-js', ['browserify-compil'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.compiledJS, { read: false }), { relative: true }))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

gulp.task('sass-watcher', function () {
    gulp.watch(settings.app.scssStyles, ['sass-compile', 'inject-css']);
});

gulp.task('inject-css', function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.cssFile, { read: false }), { relative: true }))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('ts-watcher', function () {
    gulp.watch(settings.app.allTSs, ['browserify-inject-js']);
});

//--functions
function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}

function runTests(done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, testCompleted).start();

    function testCompleted(results) {
        msg('Testy zakończone');
        if (results === 1) {
            done('Testy zakończone bledem');
        }
        else {
            done();
        }
    }
}
