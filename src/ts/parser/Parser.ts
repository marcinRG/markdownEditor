import {INode} from '../model/interfaces/INode';
import {TextNode} from '../model/TextNode';
import {HTMLTags} from '../model/enums/HTMLTags';
import {TagNode} from '../model/TagNode';
import {ITagTextPair} from '../model/interfaces/ITagTextPair';

const bigRegExp = /((#{1,6})\s(.*)(?:\n|$))|(\*\s(.*?)(?:\n|$))|(\*\*(.*)\*\*)|(__(.*)__)|(--(.*)--)/i;

export class Parser {
    public static parseText(text: string, parentNode: INode): void {
        let tempStr: string = text;
        if (tempStr && (tempStr.length > 0)) {

            const result: RegExpMatchArray = tempStr.match(bigRegExp);
            if (isText(result)) {
                processText(tempStr, result, parentNode);
            }
            if (isTag(result)) {
                processTag(tempStr, result, parentNode);
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
    const obj = findTag(result);
    const newNode = new TagNode(obj.tag);
    parentNode.addNode(newNode);
    Parser.parseText(obj.text, newNode);
    Parser.parseText(text.substring(obj.matchedText.length,text.length),parentNode);
};

const isText = (regExpMatch: RegExpMatchArray): boolean => {
    return ((regExpMatch === null) || (regExpMatch && regExpMatch.index > 0));
};

const isTag = (regExpMatch: RegExpMatchArray): boolean => {
    return regExpMatch && regExpMatch.index === 0;
};

const findTag = (result: RegExpMatchArray): ITagTextPair => {
    if (result && result.length && result[0]) {
        printResultTable(result);
        return findHeader(result);
    }
};

const printResultTable = (result: RegExpMatchArray) => {
    console.log('Result array:----------------------------------');

    for (const elem of result) {
        console.log(elem);
    }
    console.log('----------------------------------');

}


const findHeader = (result: RegExpMatchArray): ITagTextPair => {
    if (result[1]) {
        return {
            matchedText: result[1],
            tag: findHeaderSize(result[2]),
            text: result[3],
        };
    }
    return findBold(result);
};

const findBold = (result: RegExpMatchArray): ITagTextPair => {
    if (result[6]) {
        return {
            matchedText: result[6],
            tag: HTMLTags.B,
            text: result[7],
        };
    }
    return findCursive(result);
};

const findCursive = (result: RegExpMatchArray): ITagTextPair => {
    if (result[8]) {
        return {
            matchedText: result[8],
            tag: HTMLTags.I,
            text: result[9],
        };
    }
    return findStrike(result);
};

const findStrike = (result: RegExpMatchArray): ITagTextPair => {
    if (result[10]) {
        return {
            matchedText: result[10],
            tag: HTMLTags.DEL,
            text: result[11],
        };
    }
};



const findHeaderSize = (text: string) => {
    if (text && text.length) {
        const s = text.length;
        switch (s) {
            case 1:
                return HTMLTags.H1;
            case 2:
                return HTMLTags.H2;
            case 3:
                return HTMLTags.H3;
            case 4:
                return HTMLTags.H4;
            case 5:
                return HTMLTags.H5;
            case 6:
                return HTMLTags.H6;
            default:
                return null;
        }
    }
    return null;
};
