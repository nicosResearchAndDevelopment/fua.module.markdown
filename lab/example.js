const
    MarkdownIt = require('markdown-it'),
    hljs       = require('highlight.js'),
    md         = MarkdownIt('commonmark', {
        highlight(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, {language: lang, ignoreIllegals: true}).value;
                } catch (err) {
                    console.error(err);
                }
            }

            return ''; // use external default escaping
        }
    }),
    mdZero     = MarkdownIt('zero');

// mdZero.disable('paragraph');
mdZero.renderer.rules.paragraph_open  = () => '';
mdZero.renderer.rules.paragraph_close = () => '';

const
    input      = '# markdown-it rulezz!\n\nHello World!  \n`Lorem Ipsum`',
    env        = {},
    tokens     = md.parse(input, env),
    output     = md.renderer.render(tokens, md.options, env),
    zeroTokens = mdZero.parse(input, env),
    zero       = mdZero.renderer.render(zeroTokens, mdZero.options, env),
    zero2      = MarkdownIt('zero').renderInline(input);

// console.log({tokens, zeroTokens});
console.table({input, output, zero, zero2});
