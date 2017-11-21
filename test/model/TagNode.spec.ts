import { HTMLTags } from '../../src/ts/model/enums/HTMLTags';
import {TagNode} from '../../src/ts/model/TagNode';


xdescribe('TagNode tests', () => {
    it('should exist & method toString should return value', () => {
        console.log('should exist & method toString should return value');
        const tagNode = new TagNode(HTMLTags.DIV);
        expect(tagNode).toBeDefined();
        expect(tagNode.toString()).toMatch(`<${HTMLTags.DIV}></${HTMLTags.DIV}>`);
    });

});
