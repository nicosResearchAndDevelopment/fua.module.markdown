const
    assert       = require('@nrd/fua.core.assert'),
    is           = require('@nrd/fua.core.is'),
    BlockElement = require('./BlockElement.js');

/**
 * @see https://daringfireball.net/projects/markdown/syntax#header
 */
class Header extends BlockElement {

    /** @type {1 | 2 | 3 | 4 | 5 | 6} */
    #depth = 1;

    get depth() {
        return this.#depth;
    }

    set depth(depth) {
        assert.number.integer(depth, 1, 6);
        this.#depth = depth;
    }

    /** @type {string} */
    #value = '';

    get value() {
        return this.#value;
    }

    set value(value) {
        assert.string(value, /^[^\n#]*$/);
        this.#value = value.replace(/\s+/g, ' ').trim();
    }

    toString() {
        return '#'.repeat(this.#depth) + ' ' + this.#value;
    }

}

module.exports = Header;
