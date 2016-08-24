exports.config = {
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: ['../tests/protractorTests/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        print: ()=>{}
    },

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter());
    },
    directConnect: true
};