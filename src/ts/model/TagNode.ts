import {INode} from './interfaces/INode';
import {NodeType} from './enums/NodeType';
import {HTMLTags} from './enums/HTMLTags';
import {Collection} from './Collection';
import {Property} from './Property';
import {TextNode} from './TextNode';
import {IStringable} from './interfaces/IStringable';

export class TagNode implements INode {

    public nodeType: NodeType;
    public nodeName?: HTMLTags;
    private nodes: Collection<IStringable>;
    private properties: Collection<Property>;

    constructor(nodeName: HTMLTags, text?: string) {
        this.nodeName = nodeName;
        this.nodeType = NodeType.TagNode;
        this.nodes = new Collection<INode>();
        if (text) {
            const textNode = new TextNode(text);
            this.addNode(textNode);
        }
        this.properties = new Collection<Property>();
    }

    public addNode(node: IStringable) {
        this.nodes.add(node);
    }

    public clearNodes() {
        this.nodes.clear();
    }

    public addProperty(property: Property) {
        this.properties.add(property);
    }

    public clearProperties() {
        this.properties.clear();
    }

    public toString(): string {
        return `<${this.nodeName}${this.properties.toString()}>${this.nodes.toString()}</${this.nodeName}>`;
    }
}
