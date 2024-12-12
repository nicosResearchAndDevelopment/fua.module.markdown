const
    assert       = require('@fua/core.assert'),
    is           = require('@fua/core.is'),
    BlockElement = require('./BlockElement.js');

/**
 * @see https://daringfireball.net/projects/markdown/syntax#precode
 */
class CodeBlock extends BlockElement {

    /** @type {string} */
    #language = 'text';

    get language() {
        return this.#language;
    }

    set language(language) {
        assert.string(language, /^\w+$/);
        this.#language = language;
    }

    /** @type {string} */
    #value = '';

    get value() {
        return this.#value;
    }

    set value(value) {
        assert.string(value);
        this.#value = value.replace(/\s+$/mg, '').trim();
    }

    toString() {
        return '```' + this.#language + '\n' + this.#value + '\n```';
    }

}

module.exports = CodeBlock;
