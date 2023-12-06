const
    {describe, test, before, after} = require('mocha'),
    expect                          = require('expect'),
    markdown                        = require('../src/markdown.js'),
    express                         = require('express'),
    path                            = require('path'),
    fs                              = require('fs/promises');

describe('fua.module.markdown', function () {

    test('develop', async function () {
        console.log(markdown);
    });

    describe('browse', function () {

        this.timeout(0);
        const temp = Object.create(null);
        before(() => temp.server = (temp.app = express()).listen(temp.port = 3000));
        after(() => temp.server.unref().close());

        async function serve(param) {
            await new Promise((resolve, reject) => {
                console.log(`http://localhost:${temp.port}${param.path || '/'}`);
                let finished = false;
                temp.app.get(param.path || '/', (request, response, next) => {
                    if (finished) return next();
                    try {
                        finished = true;
                        response.type(param.type || 'text').send(param.value || '');
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        }

        async function load(testFile) {
            return await fs.readFile(path.join(__dirname, testFile), 'utf8');
        }

        test('cheat-sheet', async function () {
            await serve({
                path:  '/cheat-sheet',
                type:  'html',
                value: markdown.render(await load('markdownguide/cheat-sheet.md'))
            });
        });

    });

});
