const
    assert      = require('@nrd/fua.core.assert'),
    is          = require('@nrd/fua.core.is'),
    SpanElement = require('./SpanElement.js');

/**
 * @see https://daringfireball.net/projects/markdown/syntax#em
 * @see https://daringfireball.net/projects/markdown/syntax#backslash
 */
class TextElement extends SpanElement {

    /** @type {string} */
    #value = '';

    get value() {
        return this.#value;
    }

    set value(value) {
        assert.string(value);
        this.#value = value
            .split('\n')
            .map(line => line.replace(/\s+/g, ' ').trim())
            .filter(line => line.length > 0)
            .join('  \n')
            .replace(/[\\`*_{}\[\]()#+\-.!]/g, '\\$&');
    }

    /** @type {boolean} */
    #bold = false;

    get bold() {
        return this.#bold;
    }

    set bold(bold) {
        assert.boolean(bold);
        this.#bold = bold;
    }

    /** @type {boolean} */
    #italic = false;

    get italic() {
        return this.#italic;
    }

    set italic(italic) {
        assert.boolean(italic);
        this.#italic = italic;
    }

    /** @type {boolean} */
    #strikethrough = false;

    get strikethrough() {
        return this.#strikethrough;
    }

    set strikethrough(strikethrough) {
        assert.boolean(strikethrough);
        this.#strikethrough = strikethrough;
    }

    toString() {
        const mod = [];
        if (this.bold) mod.push('**');
        if (this.italic) mod.push('_');
        if (this.strikethrough) mod.push('~~');
        return mod.join('') + this.value + mod.reverse().join('');
    }

}

module.exports = TextElement;
