const
    assert = require('@nrd/fua.core.assert'),
    is     = require('@nrd/fua.core.is');

/**
 * @abstract
 * @see https://daringfireball.net/projects/markdown/syntax#block
 */
class BlockElement {

    constructor() {
        assert(new.target !== BlockElement, 'abstract class');
    }

    toString() {
        return '';
    }

}

module.exports = BlockElement;
