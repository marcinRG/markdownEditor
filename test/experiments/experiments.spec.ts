import {NodeCreator, NodeFactoryCoR} from '../../src/ts/utils/NodeFactoryCoR';
import {IMatchResult} from '../../src/ts/model/interfaces/IMatchResult';
import {Tags} from '../../src/ts/settings/Tags';
import {INode} from '../../src/ts/model/interfaces/INode';
import {INodeCreator} from '../../src/ts/model/interfaces/INodeCreator';
import {TagNode} from '../../src/ts/model/TagNode';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';

describe('experiments', () => {
    it('should work', () => {
        console.log('test start');
        const nodeFactory = new NodeFactoryCoR();

        // const elem:INode = nodeFactory.createNode(mr);
        // if (elem) {
        //     console.log(elem.toString());
        // }
        //
        // const createF = (tag: string, htmlTag: string, next: INodeCreator): any => {
        //     return (matchResult: IMatchResult) => {
        //         console.log('created func');
        //         if (matchResult && (matchResult.tag === tag)) {
        //             return new TagNode(htmlTag);
        //         } else {
        //             if (next) {
        //                 return next.createNode(matchResult);
        //             }
        //         }
        //     };
        // };
        //
        // function createFunction(tag: string, htmlTag: string, next: INodeCreator) {
        //
        //     return function (matchResult: IMatchResult) {
        //         console.log('created func 2');
        //         if (matchResult && (matchResult.tag === tag)) {
        //             return new TagNode(htmlTag);
        //         } else {
        //             if (next) {
        //                 return next.createNode(matchResult);
        //             }
        //         }
        //     }
        // }

        const strongCr = new NodeCreator(Tags.strong, HTMLTags.strong);
        const preCr = new NodeCreator(Tags.pre, HTMLTags.pre);

        const mr: IMatchResult = {
            matchedText: 'matched text',
            tag: Tags.header,
            innerText: 'inner text',
            headerSize: 4,
            link: 'www.onet.pl',
        };

        const x = nodeFactory.createNode(mr);
        if (x) {
            console.log('exist');
            console.log(x.toString());
        }
        //strongCr.next = preCr;
        //strongCr.createNode(mr);

        // const x = createFunction('strong', 'strong', null);
        // const z = createF('strong', 'strong', null);
        // x(mr);
        // z(mr);


    });
});

describe('tests for', ()=>{
    it('should work conunting match groups',()=>{
        const str: string = '(__(.*)__)';
        const countReqExpMatchGroups = (reqexpStr: string) => {
            const parentheses = '';
        }
    });
});
