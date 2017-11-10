import {INode} from '../model/interfaces/INode';
import {TextNode} from '../model/TextNode';
import {TagUtilities} from '../services/TagUtilities';

const regExpStr = '((#{1,6})\\s(.*)(?:\\n|$))' + '|' + //header
    '(\\*\\s(.*?)(?:\\n|$))' + '|' + //li
    '(\\*\\*(.*)\\*\\*)' + '|' + //bold
    '(__(.*)__)' + '|' +  //em
    '(--(.*)--)' + '|' +  //del
    '(\\((.*)\\)\\[((?:https?\\:\\/\\/)?.*)])';  //link*/
const bigRegExp = new RegExp(regExpStr, 'i');

export class Parser {
    public static parseText(text: string, parentNode: INode): void {
        if (text && (text.length > 0)) {
            const result: RegExpMatchArray = text.match(bigRegExp);
            if (isText(result)) {
                processText(text, result, parentNode);
            }
            if (isTag(result)) {
                processTag(text, result, parentNode);
            }
        }
    }
}

const processText = (text: string, result: RegExpMatchArray, parentNode: INode) => {
    const index = (result && result.index) ? result.index : text.length;
    parentNode.addNode(new TextNode(text.substring(0, index)));
    const newText = text.substring(index, text.length);
    Parser.parseText(newText, parentNode);
};

const processTag = (text: string, result: RegExpMatchArray, parentNode: INode) => {
    const matchResults = TagUtilities.findTag(result);
    const newNode = TagUtilities.createTagNode(matchResults);
    parentNode.addNode(newNode);
    Parser.parseText(matchResults.innerText, newNode);
    Parser.parseText(text.substring(matchResults.matchedText.length, text.length), parentNode);
};

const isText = (regExpMatch: RegExpMatchArray): boolean => {
    return ((regExpMatch === null) || (regExpMatch && regExpMatch.index > 0));
};

const isTag = (regExpMatch: RegExpMatchArray): boolean => {
    return regExpMatch && regExpMatch.index === 0;
};
