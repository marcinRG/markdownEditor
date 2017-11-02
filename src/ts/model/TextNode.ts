import {IStringable} from './interfaces/IStringable';
import {INodeInfo} from './interfaces/INodeInfo';
import {HTMLTags} from './enums/HTMLTags';
import {NodeType} from './enums/NodeType';

export class TextNode implements  IStringable,INodeInfo {
    public nodeType: NodeType;
    public nodeName?: HTMLTags;
    private textContent: string;

    constructor(text:string) {
       this.nodeType = NodeType.TextNode;
       this.nodeName = null;
       this.textContent = text;
    }

    public toString() {
        return this.textContent;
    }

}