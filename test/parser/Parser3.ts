// import {ParserRules} from './ParserRules';
// import {INode} from '../../src/ts/model/interfaces/INode';
// import {TextNode} from '../../src/ts/model/TextNode';
// import {TagUtilities} from '../../src/ts/services/TagUtilities';
//
// const allTagsRegExp = new RegExp(ParserRules.getAllTagsRuleStr(), 'i');
// const allMulitLineTagsRegExp = new RegExp(ParserRules.getAllMultiLineTagsRuleStr(), 'i');
// const allSingleLineTagsRegExp = new RegExp(ParserRules.getAllSingleLineTagsRuleStr(), 'i');
//
// export class Parser3 {
//     public static parse(text: string, parentNode: INode) {
//         if (text && text.length) {
//             text = findAddText(text, parentNode);
//             text = findAddMultiLineTags(text, parentNode);
//             text = findAddSingleLineTags(text, parentNode);
//             Parser3.parse(text, parentNode);
//         }
//     }
// }
//
// const findAddText = (text: string, parentNode: INode): string => {
//     const txtNew = getText(text, allTagsRegExp);
//     if (txtNew) {
//         const len = (txtNew && txtNew.length) ? txtNew.length : text.length;
//         parentNode.addNode(new TextNode(txtNew));
//         text = text.substring(len, text.length);
//     }
//     return text;
// };
//
// const findAddMultiLineTags = (text: string, parentNonde: INode): string => {
//     const results = text.match(allMulitLineTagsRegExp);
//     console.log(ParserRules.getAllMultiLineTagsRuleStr());
//     if (results) {
//        console.log('found something P3');
//        let something = TagUtilities.findMultiLineTag(results);
//        console.log('jdkfdljflkdflkdflkjdlkfjdlkfjlkd');
//        console.log(something.tag);
//     }
//     return null;
// };
//
// const findAddSingleLineTags = (text: string, parentNonde: INode): string => {
//     return null;
// };
//
// const getText = (text: string, regExp: RegExp): string => {
//     const results = text.search(regExp);
//     if (results > 0) {
//         return text.substring(0, results);
//     }
//     if (results < 0) {
//         return text;
//     }
//     return null;
// };
