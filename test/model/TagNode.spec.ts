import {TagNode} from '../../src/ts/model/TagNode';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';

xdescribe('TagNode tests', () => {
    it('should exist & method toString should return value', () => {
        console.log('should exist & method toString should return value');
        const tagNode = new TagNode(HTMLTags.div);
        expect(tagNode).toBeDefined();
        expect(tagNode.toString()).toMatch(`<${HTMLTags.div}></${HTMLTags.div}>`);
    });

    it('should exist & method toString should return value', () => {
        console.log('should exist & method toString should return value');
        const tagNode = new TagNode(HTMLTags.h1);
        expect(tagNode).toBeDefined();
        expect(tagNode.toString()).toMatch(`<h1></h1>`);
    });
});
