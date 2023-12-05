const
    assert       = require('@nrd/fua.core.assert'),
    is           = require('@nrd/fua.core.is'),
    BlockElement = require('./BlockElement.js');

class Document {

    /** @type {Array<BlockElement>} */
    elements = [];

    append(element) {
        assert.instance(element, BlockElement);
        this.elements.push(element);
    }

    prepend(element) {
        assert.instance(element, BlockElement);
        this.elements.unshift(element);
    }

    remove(element) {
        assert.instance(element, BlockElement);
        this.elements = this.elements.filter(value => value !== element);
    }

    toString() {
        return this.elements.join('\n\n');
    }

}

module.exports = Document;
