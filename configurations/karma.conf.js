module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '../public/javascripts/**/*.js',
            '../public/angular/**/*.js',
            '../tests/karmineTests/*.js'
        ],
        exclude: [
        ],
        preprocessors: {},
        reporters: ['spec'],
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },
        plugins: ["karma-spec-reporter",
                    "karma-chrome-launcher"
        ],
        port: 3000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true
    });
};