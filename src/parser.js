const
    assert     = require('@fua/core.assert'),
    is         = require('@fua/core.is'),
    MarkdownIt = require('markdown-it'),
    hljs       = require('highlight.js'),
    parser     = new MarkdownIt('default', {
        highlight(codeStr, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(codeStr, {
                        language:       lang,
                        ignoreIllegals: true
                    }).value;
                } catch (err) {
                    console.warn(err);
                }
            }
        }
    });

module.exports = parser;
