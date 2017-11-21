import { TextNode } from '../../src/ts/model/TextNode';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';

describe('TextNode tests', () => {
    it('should exist & method toString should return value', () => {
        console.log('should exist & method toString should return value');
        const text = 'some value';
        const textNode = new TextNode(text);
        expect(textNode).toBeDefined();
        expect(textNode.toString()).toMatch(text);
        expect(textNode.getNodeName()).toMatch(HTMLTags.text);
    });
});
