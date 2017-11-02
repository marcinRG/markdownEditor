import {INode} from '../model/interfaces/INode';
import {TextNode} from '../model/TextNode';
import {HTMLTags} from '../model/enums/HTMLTags';
import {TagNode} from '../model/TagNode';
import {ITagTextPair} from '../model/interfaces/ITagTextPair';

const bigRegExp = /((#{1,6})\s(.*)(?:\n|$))|(\*\s(.*?)(?:\n|$))|(\*\*(.*)\*\*)|(__(.*)__)|(--(.*)--)/i;

export class Parser {
    public static parseText(text: string, parentNode: INode): void {
        let tempStr: string = text;
        console.log(tempStr);
        console.log(parentNode.toString());
        if (tempStr && (tempStr.length > 0)) {

            const result: RegExpMatchArray = tempStr.match(bigRegExp);
            if (isText(result)) {
                tempStr = processText(tempStr, result, parentNode);
                Parser.parseText(tempStr, parentNode);
            }
            if (isTag(result)) {
                processTag(result, parentNode);
            }
        }
    }
}

const processText = (text: string, result: RegExpMatchArray, parentNode: INode): string => {
    const index = (result && result.index) ? result.index : text.length;
    parentNode.addNode(new TextNode(text.substring(0, index)));
    return text.substring(index, text.length);
};

const processTag = (result: RegExpMatchArray, parentNode: INode) => {
    const obj = findTag(result);
    const newNode = new TagNode(obj.tag);
    parentNode.addNode(newNode);

    if (result) {
        if (result.length) {
            console.log(result.length);
            for (const elem of result) {
                console.log(elem);
            }
        }
    }
    console.log('tag');
};

const isText = (regExpMatch: RegExpMatchArray): boolean => {
    return ((regExpMatch === null) || (regExpMatch && regExpMatch.index > 0));
};

const isTag = (regExpMatch: RegExpMatchArray): boolean => {
    return regExpMatch && regExpMatch.index === 0;
};

const findTag = (result: RegExpMatchArray): ITagTextPair => {
    if (result && result.length) {
        if (result[1]) {
            console.log('result [1]:' + result[1]);
            return {
                tag: findHeaderSize(result[2]),
                text: result[3],
            };
        }
    }
};

const findHeader = (result: RegExpMatchArray): ITagTextPair => {
    if (result[1]) {
        console.log('result [1]:' + result[1]);
        return {
            tag: findHeaderSize(result[2]),
            text: result[3],
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
        }
    }
    return null;
};
