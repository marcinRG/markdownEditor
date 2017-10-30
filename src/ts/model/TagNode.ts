import { INode } from './interfaces/INode'
import { NodeType } from './enums/NodeType';
import { HTMLTags } from './enums/HTMLTags';
import { Collection } from './Collection';
import { TextNode } from './TextNode';

export class TagNode implements INode {
    nodeType: NodeType = NodeType.TagNode;
    nodeName: HTMLTags;
    nodeCollection: Collection<INode>;

    constructor(nodeName: HTMLTags, text?: string) {
        this.nodeName = nodeName;
        this.nodeCollection = new Collection<INode>();
        if (text) {
            const textNode = new TextNode(text);
            this.nodeCollection.add(textNode);
        }
    }

    public addNode(node: INode) {
        this.nodeCollection.add(node);
    }

    public toString(): string {
        return `<${this.nodeName}>${this.nodeCollection.toString()}</${this.nodeName}>`;
    }
}
