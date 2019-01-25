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
var sassImportOnce = require('gulp-sass-import-once');

function cleanStyles(done) {
    var files = settings.app.cssStyles + '*.css';
    clean(files, done);
}

function codeCheck() {
    return gulp.src(settings.app.allTSs)
        .pipe($.tslint({
            formatter: "verbose"
        }))
        .pipe($.tslint.report());
}

function lintSass() {
    return gulp.src(settings.app.scssStyles)
        .pipe(sassLint(
            {
                configFile: '.sass-lint.yml'
            }
        ))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
}

function sassCompile() {
    msg('Kompilacja plików scss -> css');
    return gulp.src(settings.app.scssFile)
        .pipe(sassImportOnce())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest(settings.app.cssStyles));
}

function browserifyCompile() {
    return browserify({
        entries: [settings.app.tsFile],
        debug: true
    }).plugin(tsify)
        .bundle()
        .pipe(source(settings.app.compiledJS))
        .pipe(gulp.dest('./'));
}

function injectJSToHTML() {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.compiledJS, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
}

function injectCssToHTML() {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.cssFile, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
}

function copyFonts() {
    msg('Kopiowanie fontów');
    return gulp.src(settings.app.fontsSrc)
        .pipe(gulp.dest(settings.build.fontsPath));
}

function help(done) {
    $.taskListing(done());
}

function optimizeJsCssAndCopyToBuild() {
    var cleanCss = require('gulp-clean-css');
    return gulp.src(settings.app.index)
        .pipe($.plumber())
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', cleanCss()))
        .pipe(gulp.dest(settings.build.path));
}

function runTests(done) {
    var Server = require('karma').Server;
    var karmaServer = new Server({
        configFile: __dirname + '/karma.conf.js',
    }, function (exitCode) {
        done();
    }).start();
}

function runBuild() {
    serve(false);
}

function runDev() {
    serve(true);
}

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

function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}

gulp.task('clean-styles', cleanStyles);
gulp.task('code-check', codeCheck);
gulp.task('lint-sass', lintSass);
gulp.task('sass-compile', sassCompile);
gulp.task('browserify-compile', browserifyCompile);
gulp.task('inject-js', gulp.series(codeCheck, browserifyCompile, injectJSToHTML));
gulp.task('inject-css', gulp.series(cleanStyles, lintSass, sassCompile, injectCssToHTML));
gulp.task('copyToBuild-fonts', copyFonts);
gulp.task('copy-to-build-and-optimize', optimizeJsCssAndCopyToBuild);
gulp.task('test', runTests);


gulp.task('run-build', gulp.series(
    gulp.parallel(
        copyFonts,
        gulp.series(cleanStyles, lintSass, sassCompile, injectCssToHTML),
        gulp.series(codeCheck, browserifyCompile, injectJSToHTML)
    ), optimizeJsCssAndCopyToBuild, runBuild));

gulp.task('run-dev', gulp.series(gulp.parallel(
    gulp.series(cleanStyles, lintSass, sassCompile, injectCssToHTML),
    gulp.series(codeCheck, browserifyCompile, injectJSToHTML)),
    runDev
));

gulp.task('help', help);

gulp.task('default', help);

gulp.task('sass-watcher', function () {
    gulp.watch(settings.app.scssStyles, 'inject-css');
});

gulp.task('ts-watcher', function () {
    gulp.watch(settings.app.allTSs, 'inject-js');
});

gulp.task('ts-watcher-test', function () {
    gulp.watch(settings.app.allTSandTest, 'test-run');
});
