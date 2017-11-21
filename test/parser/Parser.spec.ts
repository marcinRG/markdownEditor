import {Parser} from '../../src/ts/services/Parser';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';
import {INode} from '../../src/ts/model/interfaces/INode';

describe('Parser tests', () => {

    it('should parse text to html tags', () => {
        const textToParse = `Jakis tekst # Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.all}>Jakis tekst <${HTMLTags.header}1>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.header}1></${HTMLTags.all}>`;
        console.log(`expected Result: ${expectedResult}`);
        let parser = new Parser();
        let node:INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `## Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}><${HTMLTags.H2}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H2}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H3}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H3}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst #### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H4}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H4}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ##### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H5}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H5}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ###### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H6}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H6}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ####### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst #<${HTMLTags.H6}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H6}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst # Weekly **JavaScript** Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H1}>` +
        //     `Weekly <${HTMLTags.B}>JavaScript</${HTMLTags.B}> Challenge #9</${HTMLTags.H1}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst # Weekly __JavaScript__ Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H1}>` +
        //     `Weekly <${HTMLTags.I}>JavaScript</${HTMLTags.I}> Challenge #9</${HTMLTags.H1}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst (マクロスMACROSS 82-99)[https://www.youtube.com/watch?v=idipMrfAZHk]`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst ` +
        //     `<${HTMLTags.A} href="https://www.youtube.com/watch?v=idipMrfAZHk">` +
        //     `マクロスMACROSS 82-99</${HTMLTags.A}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
 //        const textToParse = ` * tekst1
 // * tekst2
 // * tekst3`;
 //        const expectedResult = `<${HTMLTags.DIV}><${HTMLTags.UL}><${HTMLTags.LI}>tekst1</${HTMLTags.LI}>` +
 //            `<${HTMLTags.LI}>tekst2</${HTMLTags.LI}><${HTMLTags.LI}>tekst3</${HTMLTags.LI}>` +
 //            `</${HTMLTags.UL}></${HTMLTags.DIV}>`;
 //        console.log(`expected Result: ${expectedResult}`);
 //        const parentNode: INode = new TagNode(HTMLTags.DIV);
 //        Parser.parseText(textToParse, parentNode);
 //        expect(parentNode.toString()).toBe(expectedResult);
    });

});
