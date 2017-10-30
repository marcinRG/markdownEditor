import { INode } from "./INode";
import { NodeType } from "./NodeType";
import { HTMLTags } from "./HTMLTags";

export class TextNode implements INode {
    nodeType: NodeType = NodeType.TextNode;
    nodeName?: HTMLTags = null;
    textContent: string;
    constructor(text: string) {
        this.textContent = text;
    }
    toString(): string {
        return this.textContent;
    }
}
