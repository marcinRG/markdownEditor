import {TagNode} from '../model/TagNode';
import {IMatchResults} from '../model/interfaces/IMatchResults';
import {Property} from '../model/Property';
import {HTMLTags} from '../model/enums/HTMLTags';

export class TagUtilities {
    public static createTagNode(matchResults: IMatchResults): TagNode {
        if (matchResults && matchResults.tag) {
            const node = new TagNode(matchResults.tag);
            if (matchResults.link) {
                node.addProperty(new Property('href', matchResults.link));
            }
            return node;
        }
        return null;
    }

    public static findTag(result: RegExpMatchArray): IMatchResults {
        if (result && result.length && result[0]) {
            printResultTable(result);
            return findHeader(result);
        }
        return null;
    }
}

const findHeader = (result: RegExpMatchArray): IMatchResults => {
    if (result[1]) {
        return {
            matchedText: result[1],
            tag: findHeaderSize(result[2]),
            innerText: result[3],
            headerSize: result[2].length,
        };
    }
    return findBold(result);
};

const findBold = (result: RegExpMatchArray): IMatchResults => {
    if (result[6]) {
        return {
            matchedText: result[6],
            tag: HTMLTags.B,
            innerText: result[7],
        };
    }
    return findCursive(result);
};

const findCursive = (result: RegExpMatchArray): IMatchResults => {
    if (result[8]) {
        return {
            matchedText: result[8],
            tag: HTMLTags.I,
            innerText: result[9],
        };
    }
    return findStrike(result);
};

const findStrike = (result: RegExpMatchArray): IMatchResults => {
    if (result[10]) {
        return {
            matchedText: result[10],
            tag: HTMLTags.DEL,
            innerText: result[11],
        };
    }
    return findLink(result);
};

const findLink = (result: RegExpMatchArray): IMatchResults => {
    if (result[12]) {
        return {
            matchedText: result[12],
            tag: HTMLTags.A,
            innerText: result[13],
            link: result[14],
        };
    }
    return findListElement(result);
};

const findList = (result: RegExpMatchArray): IMatchResults => {
    if (result[14]) {

    }
    return null;
}

const findListElement = (result: RegExpMatchArray): IMatchResults => {
    if (result[4]) {
        return {
            matchedText: result[4],
            tag: HTMLTags.LI,
            innerText: result[5],
        };
    }
    return null;
}

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

const printResultTable = (result: RegExpMatchArray) => {
    console.log('Result array:----------------------------------');
    for (const elem of result) {
        console.log(elem);
    }
    console.log('----------------------------------');

};
