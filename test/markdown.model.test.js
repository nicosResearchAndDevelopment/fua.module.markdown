const
    {describe, test}              = require('mocha'),
    expect                        = require('expect'),
    {Document, Header, Paragraph} = require('../src/model.js');

describe('fua.module.markdown.model', function () {

    test('develop', function () {
        const doc = new Document();

        const title = new Header();
        title.depth = 1;
        title.value = 'Hello World!';
        doc.append(title);

        const text = new Paragraph();
        text.value = 'Lorem Ipsum';
        doc.append(text);

        console.log('>>>>> START <<<<<');
        console.log(doc.toString());
        console.log('>>>>>  END  <<<<<');
    });

});
