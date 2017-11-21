// import {ParserRules} from './ParserRules';
// import {INode} from '../../src/ts/model/interfaces/INode';
// import {TextNode} from '../../src/ts/model/TextNode';
//
// const allTagsRegExp = new RegExp(ParserRules.getAllTagsRuleStr(), 'i');
// const allMulitLineTagsRegExp = new RegExp(ParserRules.getAllMultiLineTagsRuleStr(), 'i');
// const allSingleLineTagsRegExp = new RegExp(ParserRules.getAllSingleLineTagsRuleStr(), 'i');
//
// const getText = (text: string): string => {
//     const results = text.search((allTagsRegExp));
//     if (results > 0) {
//         return text.substring(0, results);
//     }
//     if (results < 0) {
//         return text;
//     }
//     return null;
// };
//
// export class Parser2 {
//     public static parseText(text: string, parentNode: INode) {
//         if (text && text.length) {
//             text = findText(text, parentNode);
//             findMultiLineTag(text, parentNode);
//         }
//     }
// }
//
// const findText = (text: string, parentNode: INode) => {
//     const txtNew = getText(text);
//     if (txtNew) {
//         const len = (txtNew && txtNew.length) ? txtNew.length : text.length;
//         parentNode.addNode(new TextNode(txtNew));
//         text = text.substring(len, text.length);
//     }
//     return text;
// };
//
// const findSingleLineTag = (text: string, parentNode: INode): string => {
//     console.log(text);
//     console.log(ParserRules.getAllSingleLineTagsRuleStr());
//     const results = text.match(allSingleLineTagsRegExp);
//     if (results) {
//         console.log('found something');
//         printResultTable(results);
//     }
//     return text;
// };
//
// const findMultiLineTag = (text: string, parentNode: INode):string => {
//     const results = text.match(allMulitLineTagsRegExp);
//     if (results) {
//         console.log('found match');
//         printResultTable(results);
//     }
//     return text;
// };
//
// const printResultTable = (result: RegExpMatchArray) => {
//     console.log('Result array:----------------------------------');
//     for (const elem of result) {
//         console.log(elem);
//     }
//     console.log('----------------------------------');
//
// };