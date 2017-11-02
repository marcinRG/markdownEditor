import { Parser } from '../../src/ts/parser/Parser';
import { INode } from '../../src/ts/model/interfaces/INode';
import { TagNode } from '../../src/ts/model/TagNode';
import { HTMLTags } from '../../src/ts/model/enums/HTMLTags';

describe('Parser tests', () => {

    it('', () => {
        const textToParse = `Jakis tekst # Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H1}>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.H1}></${HTMLTags.DIV}>`;
        const parentNode: INode = new TagNode(HTMLTags.DIV);
        Parser.parseText(textToParse, parentNode);
        expect(parentNode.toString()).toBe(expectedResult);
    });
});
