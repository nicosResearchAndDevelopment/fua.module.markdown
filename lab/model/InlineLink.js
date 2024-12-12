const
    assert      = require('@fua/core.assert'),
    is          = require('@fua/core.is'),
    SpanElement = require('./SpanElement.js');

/**
 * @see https://daringfireball.net/projects/markdown/syntax#link
 */
class InlineLink extends SpanElement {

    /** @type {string} */
    #label = '';

    get label() {
        return this.#label;
    }

    set label(label) {
        assert.string(label, /^[^\n]*$/);
        this.#label = label
            .replace(/\s+/g, ' ').trim()
            .replace(/[\\`*_{}\[\]()#+\-.!]/g, '\\$&');
    }

    /** @type {string} */
    #href = '#';

    get href() {
        return this.#href;
    }

    set href(href) {
        assert.string(href, /^[^\s)]+$/);
        this.#href = href;
    }

    /** @type {string} */
    #title = '';

    get title() {
        return this.#title;
    }

    set title(title) {
        assert.string(title, /^[^\n"]*$/);
        this.#title = title
            .replace(/\s+/g, ' ').trim();
    }

    toString() {
        return `[${this.label || this.href}](${this.href} "${this.title}")`;
    }

}

module.exports = InlineLink;
