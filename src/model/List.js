const
    assert       = require('@nrd/fua.core.assert'),
    is           = require('@nrd/fua.core.is'),
    BlockElement = require('./BlockElement.js'),
    Paragraph    = require('./Paragraph.js');

/**
 * @see https://daringfireball.net/projects/markdown/syntax#list
 */
class List extends BlockElement {

    /** @type {boolean} */
    #ordered = false;

    get ordered() {
        return this.#ordered;
    }

    set ordered(ordered) {
        assert.boolean(ordered);
        this.#ordered = ordered;
    }

    /** @type {Array<Paragraph>} */
    elements = [];

    append(element) {
        assert.instance(element, Paragraph);
        this.elements.push(element);
    }

    prepend(element) {
        assert.instance(element, Paragraph);
        this.elements.unshift(element);
    }

    remove(element) {
        assert.instance(element, Paragraph);
        this.elements = this.elements.filter(value => value !== element);
    }

    toString() {
        return this.elements
            .map(this.ordered
                ? (paragraph, index) => `${index + 1}. ${paragraph.toString().replace(/\n/g, '$&    ')}`
                : (paragraph) => `- ${paragraph.toString().replace(/\n/g, '$&    ')}`)
            .join('\n');
    }

}

module.exports = List;
