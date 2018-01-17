'use strict';

var serverPath = './server/';

var paths = {
    page: './src',
    pageProd: './build'
};

var error = {
    url: '/errors',
    path: serverPath + 'errorHandlers/pages',
    error404: '/errors/404.html',
    errorAll: '/errors/errorNS.html'
};

module.exports = {
    app: paths,
    error: error,
    defaultPort: 3000
};
