import { INode } from "./interfaces/INode";
import { NodeType } from "./enums/NodeType";
import { HTMLTags } from "./enums/HTMLTags";

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
