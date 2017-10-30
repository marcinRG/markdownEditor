import { INode } from './INode'
import { NodeType } from './NodeType';
import { HTMLTags } from './HTMLTags';
import { Collection } from './Collection';

export class TagNode implements INode {
    nodeType: NodeType = NodeType.TagNode;
    nodeName: HTMLTags;
    nodeCollection: Collection<INode>;

    constructor(nodeName: HTMLTags, text: string) {
       this.nodeName = nodeName;
    }

    toString(): string {
        return `<${this.nodeName}>${this.nodeCollection.toString()}</${this.nodeName}>`;
    }
}
