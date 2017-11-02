import {INode} from '../model/interfaces/INode';
import {TextNode} from '../model/TextNode';

const bigRegExp = /((#{1,6})\s(.*)(?:\n|$))|(\*\s(.*?)(?:\n|$))|(\*\*(.*)\*\*)|(__(.*)__)|(--(.*)--)/i;

export class Parser {
    public static parseText(text: string, parentNode: INode): void {
        let tempStr: string = text;
        if (tempStr && (tempStr.length > 0)) {

            let result = tempStr.match(bigRegExp);
            if ((result === null) || (result && result.index > 0)) {
                let index = (result && result.index) ? result.index : tempStr.length;
                tempStr = textFound(tempStr, index, parentNode);
            }
            if (result && result.index === 0) {

            }

        }
    }

    private static tagFound(text: string, parentNode: INode) {

    }

}

let textFound = (text: string, index: number, parentNode: INode): string => {
    parentNode.addNode(new TextNode(text.substring(0, index)));
    return text.substring(index, text.length);
};
