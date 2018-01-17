import {INodeCreator} from '../model/interfaces/INodeCreator';
import {IMatchResult} from '../model/interfaces/IMatchResult';
import {TagNode} from '../model/TagNode';

export class NodeCreator implements INodeCreator {

    constructor(public tag: string, public htmlTag: string, public next: INodeCreator = null) {
    }

    public createNode(matchResult: IMatchResult) {
        if (matchResult && (matchResult.tag === this.tag)) {
            return new TagNode(this.htmlTag);
        } else {
            if (this.next) {
                return this.next.createNode(matchResult);
            }
        }
    }
}
