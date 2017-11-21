import {TagNode} from '../../src/ts/model/TagNode';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';

describe('TagNode tests', () => {
    it('should exist & method toString should return value', () => {
        console.log('should exist & method toString should return value');
        const tagNode = new TagNode(HTMLTags.all);
        expect(tagNode).toBeDefined();
        expect(tagNode.toString()).toMatch(`<${HTMLTags.all}></${HTMLTags.all}>`);
    });
});
