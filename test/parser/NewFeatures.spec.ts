import {ParserRules} from './ParserRules';
import {Parser2} from './Parser2';
import {TagNode} from "../../src/ts/model/TagNode";
import {HTMLTags} from "../../src/ts/model/enums/HTMLTags";

describe('testing new features', () => {
    it('should work', () => {
        //console.log(ParserRules.getAllTagsRuleStr());
        //console.log(ParserRules.getAllMultiLineTagsRuleStr());
        //console.log(ParserRules.getAllSingleLineTagsRuleStr());
        const textToParse = `Jakis tekst # Weekly JavaScript Challenge #9`;
        const node = new TagNode(HTMLTags.DIV);
        Parser2.parseText(textToParse, node);
    });
});
