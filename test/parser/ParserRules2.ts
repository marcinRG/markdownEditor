// import {IMatchResults} from '../../src/ts/model/interfaces/IMatchResults';
// import {HTMLTags} from '../../src/ts/model/enums/HTMLTags';
//
// const rules = {
//     all: {
//         allowedChildrenNodes: ['header', 'underline', 'strong', 'deleted', 'list'],
//         regExpStr: '((?:.*?\\n|$)*)',
//         tagName: HTMLTags.DIV,
//         isMultiLine: true,
//         textNodeChildrenAllowed: true,
//         matchGroups: 1,
//         values: (matchResult: RegExpMatchArray, index: number): IMatchResults => {
//             if (matchResult[index]) {
//                 return {
//                     matchedText: matchResult[index],
//                     tag: this.tagName,
//                     innerText: matchResult[index],
//                 }
//             }
//         }
//     },
//     header: {
//         tagName: HTMLTags.HEADER,
//         allowedChildrenNodes: ['underline', 'strong', 'deleted'],
//         regExpStr: '((#{1,6})\\s(.*)(?:\\n|$))',
//         textNodeChildrenAllowed: true,
//         matchGroups: 3,
//         values: (matchResult: RegExpMatchArray, index: number): IMatchResults => {
//             if (matchResult[index]) {
//                 return {
//                     tag: this.tagName,
//                     matchedText: matchResult[index],
//                     innerText: matchResult[index + 2],
//                     headerSize: matchResult[index + 1].length,
//                 }
//             }
//         }
//     },
//     strong: {
//         tagName: 'strong',
//         allowedChildrenNodes: ['underline', 'link', 'deleted'],
//         regExpStr: '(\\*\\*(.*)\\*\\*)',
//         textNodeChildrenAllowed: true,
//         matchGroups: 2,
//     },
//     list: {
//         tagName: 'list',
//         allowedChildrenNodes: ['li'],
//         regExpStr: '((?:\\s?\\*\\s.*?\\n|$)+)',
//         isMultiLine: true,
//         matchGroups: 1,
//     },
//     underline: {
//         tagName: 'underline',
//         allowedChildrenNodes: [],
//         regExpStr: '(__(.*)__)',
//         textNodeChildrenAllowed: true,
//         matchGroups: 2,
//     },
//     deleted: {
//         tagName: 'deleted',
//         allowedChildrenNodes: [],
//         regExpStr: '(--(.*)--)',
//         textNodeChildrenAllowed: true,
//         matchGroups: 2,
//     },
// };
//
// const findFirstInMatchResult = (tab: string[]) => {
//     if ((tab) && (tab.length > 1)) {
//         for (let i = 1; i < tab.length; i++) {
//             if (tab[i]) {
//                 return i;
//             }
//         }
//     }
//     return -1;
// };
//
// const findAllowedChildTag = (index: number, tag: string): string => {
//     let diff = index - 1;
//     if (rules.hasOwnProperty(tag)) {
//         const childrenNodes = rules[tag].allowedChildrenNodes;
//         if (childrenNodes && childrenNodes.length) {
//             for (let j = 0; j < childrenNodes.length; j++) {
//                 if (diff === 0) {
//                     return childrenNodes[j];
//                 }
//                 if (diff > 0) {
//                     diff = diff - getMatchGroups(childrenNodes[j]);
//                 }
//                 if (diff < 0) {
//                     return null;
//                 }
//             }
//         }
//     }
//     return null;
// };
//
// const getMatchGroups = (tag: string): number => {
//     if (rules.hasOwnProperty(tag)) {
//         const rule = rules[tag];
//         return rule.matchGroups;
//     }
//     return -1;
// };
//
// const getRule = (tag: string): string => {
//     if (rules.hasOwnProperty(tag)) {
//         const rule = rules[tag];
//         return rule.regExpStr;
//     }
//     return null;
// };
//
// export class ParserRules {
//
//     public static findTag(text: string, parentNode: string): string {
//         const reqExp = new RegExp(ParserRules.getAllAllowedTagsRuleStr(parentNode), 'i');
//         if (text.search(reqExp) === 0) {
//             const resultArray = text.match(reqExp);
//             if (resultArray) {
//                 return findAllowedChildTag(findFirstInMatchResult(resultArray), parentNode);
//             }
//             return null;
//         }
//         return null;
//     }
//
//     public static getAllAllowedTagsRuleStr(tag: string): string {
//         const tab = [];
//         if (rules.hasOwnProperty(tag)) {
//             const childrenRules = rules[tag].allowedChildrenNodes;
//             if (childrenRules) {
//                 for (const elem of childrenRules) {
//                     tab.push(getRule(elem));
//                 }
//             }
//         }
//         return tab.join('|');
//     }
// }
