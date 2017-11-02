var devFolder = './src/';
var testFolder ='./test/';
var jsFolder = devFolder + 'js/';
var tsFolder = devFolder + 'ts/';
var sassFolder = devFolder + 'scss/';
var cssFolder = devFolder + 'css/';

var serverFolder = './server/';
var buildPath = './build/';

var paths = {
    client: './src/',
    index: devFolder + 'index.html',
    allJs: ['./*.js', serverFolder + '**/*.js', jsFolder + '**/*.js'],
    allTSs: [tsFolder + '**/*.ts'],
    allTSandTest:  [tsFolder + '**/*.ts', testFolder + '**/*.ts'],
    jsAppFolder: jsFolder,
    tsFile: tsFolder + 'app.ts',
    jsFile: jsFolder + 'app.js',
    compiledJS: devFolder + 'bundle.js',
    compiledTS: devFolder + 'bundle.ts',
    fontsSrc: devFolder + 'fonts/**/*.*',
    imageSrc: devFolder + 'images/**/*.*',
    scssStyles: [sassFolder + '**/*.scss'],
    scssFile: sassFolder + 'style.scss',
    cssStyles: cssFolder,
    cssFile: cssFolder + 'style.css',
};

var build = {
    path: buildPath,
    cssPath: buildPath + 'css',
    jsPath: buildPath + 'js',
    fontsPath: buildPath + 'fonts',
    imagesPath: buildPath + 'images'
};

var server = {
    serverApp: serverFolder + 'server.js',
    serverFiles: [serverFolder + 'server.js', serverFolder + '**/*.js'],
    port: 4580
};

module.exports = {
    app: paths,
    server: server,
    build: build
};

