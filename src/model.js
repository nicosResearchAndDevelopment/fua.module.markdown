// TODO include documentation
// - https://www.markdownguide.org/basic-syntax/
// - https://www.markdownguide.org/extended-syntax/

exports.Document = require('./model/Document.js');

exports.BlockElement = require('./model/BlockElement.js');
exports.Paragraph    = require('./model/Paragraph.js');
exports.Header       = require('./model/Header.js');
exports.BlockQuote   = require('./model/BlockQuote.js');
exports.CodeBlock    = require('./model/CodeBlock.js');
exports.List         = require('./model/List.js');

// TODO create span elements and use them inside the block elements instead of string values
// exports.SpanElement = require('./model/SpanElement.js');
// exports.Text        = require('./model/Text.js');
// exports.Link        = require('./model/Link.js');
// exports.Emphasis    = require('./model/Emphasis.js');
// exports.Code        = require('./model/Code.js');
// exports.Image       = require('./model/Image.js');
