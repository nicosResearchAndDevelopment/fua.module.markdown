const
    assert       = require('@nrd/fua.core.assert'),
    is           = require('@nrd/fua.core.is'),
    BlockElement = require('./BlockElement.js');

/**
 * @see https://daringfireball.net/projects/markdown/syntax#p
 */
class Paragraph extends BlockElement {

    /** @type {string} */
    #value = '';

    get value() {
        return this.#value;
    }

    set value(value) {
        assert.string(value);
        this.#value = value.replace(/(?:\r?\n)+/g, '\n\n').replace(/^\s+/mg, '').trim();
    }

    toString() {
        return this.#value;
    }

}

module.exports = Paragraph;
