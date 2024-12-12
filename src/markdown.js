const
    markdown = exports,
    assert   = require('@fua/core.assert'),
    is       = require('@fua/core.is');

markdown.parser = require('./parser.js');

markdown.document = function (elements) {
    assert.array(elements, is.string);
    return elements.filter(val => val).join('\n\n');
};

markdown.heading = function (level = 1, value = '', id = '') {
    assert.number.integer(level, 1, 6);
    assert.string(value, /^[^\n]*$/);
    assert.string(id, /^\w*$/);
    return `${'#'.repeat(level)} ${value}${id ? ` {#${id}` : ''}`;
};

markdown.h1 = (value) => markdown.heading(1, value);
markdown.h2 = (value) => markdown.heading(2, value);
markdown.h3 = (value) => markdown.heading(3, value);
markdown.h4 = (value) => markdown.heading(4, value);
markdown.h5 = (value) => markdown.heading(5, value);
markdown.h6 = (value) => markdown.heading(6, value);

markdown.paragraph = function (value = '') {
    assert.string(value);
    return value.replace(/\r?\n/g, '  $&');
};

markdown.p = markdown.paragraph;

markdown.bold = function (value = '') {
    assert.string(value);
    return `**${value}**`;
};

markdown.b = markdown.bold;

markdown.italic = function (value = '') {
    assert.string(value);
    return `*${value}*`;
};

markdown.i = markdown.italic;

markdown.blockquote = function (value = '') {
    assert.string(value);
    return value.replace(/^/mg, '> ');
};

markdown.list = function (marker = '-', entries) {
    assert.string(marker, /^[-*+0]$/);
    assert.object(entries, is.string);
    if (!is.array(entries)) entries = Object.entries(entries).map(([key, value]) => `${markdown.bold(key)}: ${value}`);
    return entries.map((value, index) => `${(marker === '0' ? `${index}.` : marker).padEnd(3, ' ')} ${value}`.replace(/\n/g, '$&    ')).join('\n');
};

markdown.ol = (entries) => markdown.list('0', entries);
markdown.ul = (entries) => markdown.list('-', entries);

markdown.code = function (value = '') {
    assert.string(value);
    return `\`${value}\``;
};

markdown.codeBlock = function (value = '') {
    assert.string(value);
    return value.replace(/^/mg, '    ');
};

markdown.horizontalRule = function (marker = '-', length = 3) {
    assert.string(marker, /^[-*_]$/);
    assert.number.integer(length, 3, 80);
    return marker.repeat(length);
};

markdown.hr = () => markdown.horizontalRule('-', 3);

markdown.link = function (value = '', href = '#', title = '') {
    assert.string(value);
    assert.string(href, /^\S*$/);
    assert.string(title, /^[^\n]*$/);
    return `[${value || href || '#'}](${href || '#'} "${title || ''}")`;
};

markdown.a = markdown.link;

markdown.image = function (src = '#', alt = '', title = '') {
    assert.string(src, /^\S*$/);
    assert.string(alt, /^[^\n]*$/);
    assert.string(title, /^[^\n]*$/);
    return `![${alt || title || ''}](${src || '#'} "${title || ''}")`;
};

markdown.img = markdown.image;

const _escape_pattern     = /[\\`*_{}\[\]<>()#+\-.!|]/g;
const _escape_replacement = {
    '\\': '&#92;', // &#92; &#x5C; &bsol;
    '`':  '&#96;', // &#96; &#x60; &DiacriticalGrave;
    '*':  '&#42;', // &#42; &#x2A; &ast;
    '_':  '&#95;', // &#95; &#x5F; &UnderBar;
    '{':  '&#123;', // &#123; &#x7B; &lcub;
    '}':  '&#125;', // &#125; &#x7D; &rcub;
    '[':  '&#91;', // &#91; &#x5B; &lsqb;
    ']':  '&#93;', // &#93; &#x5D; &rsqb;
    '<':  '&#60;', // &#60; &#x3C; &lt;
    '>':  '&#62;', // &#62; &#x3E; &gt;
    '(':  '&#40;', // &#40; &#x28; &lpar;
    ')':  '&#41;', // &#41; &#x29; &rpar;
    '#':  '&#35;', // &#35; &#x23; &num;
    '+':  '&#43;', // &#43; &#x2B; &plus;
    '-':  '&#45;', // &#45; &#x2D;
    '.':  '&#46;', // &#46; &#x2E; &period;
    '!':  '&#33;', // &#33; &#x21; &excl;
    '|':  '&#124;' // &#124; &#x7C; &VerticalLine;
};

markdown.escape = function (value = '') {
    assert.string(value);
    return value.replace(_escape_pattern, (match) => _escape_replacement[match] || match);
};

markdown.table = function (rows, header) {
    assert.todo(/* TODO */);
};

markdown.fencedCodeBlock = function (value = '', language = '') {
    assert.string(value);
    assert.string(language, /^w*$/);
    return `\`\`\`${language || ''}\n${value}\n\`\`\``;
};

markdown.definitionList = function (entries) {
    assert.todo(/* TODO */);
};

markdown.dl = markdown.definitionList;

markdown.strikethrough = function (value = '') {
    assert.string(value);
    return `~~${value}~~`;
};

markdown.taskList = function (entries) {
    if (is.array(entries)) {
        assert.array(entries, is.string);
        return markdown.list('-', entries.map(value => `[ ] ${value}`));
    } else {
        assert.object(entries, is.boolean);
        return markdown.list('-', Object.entries(entries).map(([value, checked]) => `[${checked ? 'x' : ' '}] ${value}`));
    }
};

markdown.tl = markdown.taskList;

markdown.emoji = function (name) {
    assert.string(name, /^\w+$/);
    return `:${name}:`;
};

markdown.highlight = function (value = '') {
    assert.string(value);
    return `==${value}==`;
};

markdown.subscript = function (value = '') {
    assert.string(value);
    return `~${value}~`;
};

markdown.sub = markdown.subscript;

markdown.superscript = function (value = '') {
    assert.string(value);
    return `^${value}^`;
};

markdown.sup = markdown.superscript;
