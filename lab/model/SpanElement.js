const
    assert = require('@nrd/fua.core.assert'),
    is     = require('@nrd/fua.core.is');

/**
 * @abstract
 * @see https://daringfireball.net/projects/markdown/syntax#span
 */
class SpanElement {

    constructor() {
        assert(new.target !== SpanElement, 'abstract class');
    }

    toString() {
        return '';
    }

}

module.exports = SpanElement;
