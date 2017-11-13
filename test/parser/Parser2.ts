import {ParserRules} from './ParserRules';
import {INode} from '../../src/ts/model/interfaces/INode';
import {TextNode} from '../../src/ts/model/TextNode';

const allTagsRegExp = new RegExp(ParserRules.getAllTagsRuleStr(), 'i');
const allMulitLineTagsRegExp = new RegExp(ParserRules.getAllMultiLineTagsRuleStr(), 'i');
const allSingleLineTagsRegExp = new RegExp(ParserRules.getAllSingleLineTagsRuleStr(), 'i');

const isText = (text: string): boolean => {
    const results = text.search((allTagsRegExp));
    return ((results > 0) || (results < 0));
};

const getText = (text: string): string => {
    const results = text.search((allTagsRegExp));
    if (results > 0) {
        return text.substring(0, results);
    }
    if (results < 0) {
        return text;
    }
    return null;
};

export class Parser2 {
    public static parseText(text: string, parentNode: INode) {
        if (text && text.length) {
            const txt2 = getText(text);
            if (txt2) {
                processText(text, txt2, parentNode);
            } else {
                console.log('else h');
                findSingleLineTag(text, parentNode);
            }
        }
    }
}

const findSingleLineTag = (orgText: string, parentNode: INode) => {
    console.log(orgText);
    console.log(ParserRules.getAllSingleLineTagsRuleStr());
    const results = orgText.match(allSingleLineTagsRegExp);
    if (results) {
        console.log('found something');
        printResultTable(results);
    }
    console.log('finding single line Tag');
};

const processText = (orgText: string, newText: string, parentNode: INode) => {
    const len = (newText && newText.length) ? newText.length : orgText.length;
    console.log(len);
    parentNode.addNode(new TextNode(newText));
    const newText2 = orgText.substring(len, orgText.length);
    Parser2.parseText(newText2, parentNode);
};

const printResultTable = (result: RegExpMatchArray) => {
    console.log('Result array:----------------------------------');
    for (const elem of result) {
        console.log(elem);
    }
    console.log('----------------------------------');

};