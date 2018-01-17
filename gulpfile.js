'use strict';
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')({lazy: true});
var sassLint = require('gulp-sass-lint');
var tsify = require('tsify');
var del = require('del');
var settings = require('./gulp.settings/settings');

gulp.task('clean-styles', function (done) {
    var files = settings.app.cssStyles + '*.css';
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

gulp.task('test-run', function (done) {
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

gulp.task('browserify-compil', ['code-check'], function () {
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
        .pipe($.inject(gulp.src(settings.app.compiledJS, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('build-prepare', ['browserify-inject-js', 'inject-css'], function () {
});

gulp.task('dist-optimize', ['build-prepare', 'copyToBuild-fonts', 'test-run'], function () {
    var cleanCss = require('gulp-clean-css');
    return gulp.src(settings.app.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', cleanCss()))
        .pipe(gulp.dest(settings.build.path));
});


gulp.task('copyToBuild-fonts', function () {
    msg('Kopiowanie fontów');
    return gulp.src(settings.app.fontsSrc)
        .pipe(gulp.dest(settings.build.fontsPath));
});

gulp.task('run-dist', ['dist-optimize'], function () {
    serve(false);
});

gulp.task('run-dev', ['browserify-inject-js', 'inject-css', 'test-run'], function () {
    serve(true);
});

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

gulp.task('sass-watcher', function () {
    gulp.watch(settings.app.scssStyles, ['sass-compile', 'inject-css']);
});

gulp.task('inject-css', ['sass-compile'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.cssFile, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('ts-watcher', function () {
    gulp.watch(settings.app.allTSs, ['browserify-inject-js']);
});

gulp.task('ts-watcher-test', function () {
    gulp.watch(settings.app.allTSandTest, ['test-run']);
});

function serve(isDev) {
    var nodeOptions = {
        script: settings.server.serverApp,
        ext: 'js',
        delay: 2500,
        env: {
            'PORT': settings.server.port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: settings.server.serverFiles
    };
    return $.nodemon(nodeOptions)
        .on('start', function () {
            msg('...start servera ...');
        })
        .on('restart', function () {
            msg('...restart servera...');
        })
        .on('exit', function () {
        })
        .on('crash', function () {
            msg('!!!Wystąpiły bęłdy');
        });
}


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
    var karmaServer = new Server({
        configFile: __dirname + '/karma.conf.js',
    }, function (exitCode) {
        done();
    }).start();
}
