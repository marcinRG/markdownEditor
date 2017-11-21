import {ParserRules} from './ParserRules';
import {Parser2} from './Parser2';
import {TagNode} from "../../src/ts/model/TagNode";
import {HTMLTags} from "../../src/ts/model/enums/HTMLTags";

describe('testing new features', () => {

    const testListText = `Zaimplementowano:
* **pogrubienie**
* __kursywa__
* [odnośnik](http://typeofweb.com/)
* #### Nagłówki
* --podkreslenie--
* listy`;

    xit('should work', () => {
        //console.log(ParserRules.getAllTagsRuleStr());
        //console.log(ParserRules.getAllMultiLineTagsRuleStr());
        //console.log(ParserRules.getAllSingleLineTagsRuleStr());
        const textToParse = `Jakis tekst __Weekly JavaScript Challenge__ #9`;
        const node = new TagNode(HTMLTags.DIV);
        Parser2.parseText(textToParse, node);
    });

    it('should work', () => {
        const node = new TagNode(HTMLTags.DIV);
        Parser2.parseText(testListText,node);
    });

});
