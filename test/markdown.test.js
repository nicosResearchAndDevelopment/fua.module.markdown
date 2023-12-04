const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    markdown         = require('../src/markdown.js');

describe('fua.module.markdown', function () {

    test('develop', function () {
        console.log(markdown);
    });

});
