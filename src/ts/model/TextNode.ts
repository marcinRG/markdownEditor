import {IStringable} from './interfaces/IStringable';
import {INodeInfo} from './interfaces/INodeInfo';
import {HTMLTags} from '../settings/HTMLTags';
import {NodeType} from './enums/NodeType';

export class TextNode implements IStringable, INodeInfo {
    public nodeType: NodeType;
    public nodeName: string;
    private textContent: string;

    constructor(text: string) {
        this.nodeType = NodeType.TextNode;
        this.nodeName = HTMLTags.text;
        this.textContent = text;
    }

    public toString() {
        return this.textContent;
    }

    public getNodeName() {
        return this.nodeName;
    }
}
