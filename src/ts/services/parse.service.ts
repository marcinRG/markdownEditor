import * as Promise from 'bluebird';
import {INode} from '../model/interfaces/INode';
import {Parser} from '../utils/Parser';
import {ParserRules} from '../settings/ParserRules';
import {TagsArray} from '../settings/TagsArray';
import {NodeFactory} from '../utils/NodeFactory';
import {IParse} from '../model/interfaces/IParse';

class ParseService implements IParse {

    private parser = new Parser(ParserRules.rules, TagsArray.tags, new NodeFactory());

    public parse(text: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const node: INode = this.parser.parse(text);
                resolve(node);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export const parseService: IParse = new ParseService();
