import { INode } from './interfaces/INode';
import { NodeType } from './enums/NodeType';
import { HTMLTags } from './enums/HTMLTags';

export class TextNode implements INode {
    public nodeType: NodeType = NodeType.TextNode;
    public nodeName?: HTMLTags = null;
    private textContent: string;
    constructor(text: string) {
        this.textContent = text;
    }
    public toString(): string {
        return this.textContent;
    }
}
