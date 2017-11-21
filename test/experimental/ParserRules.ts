// const rules = {
//     header: {
//         allowedChildrenNodes: ['underline', 'strong', 'deleted'],
//         regExpStr: '((#{1,6})\\s(.*)(?:\\n|$))',
//         textNodeChildrenAllowed: true,
//     },
//     strong: {
//         allowedChildrenNodes: ['underline', 'link', 'deleted'],
//         regExpStr: '(\\*\\*(.*)\\*\\*)',
//         textNodeChildrenAllowed: true,
//     },
//     list: {
//         allowedChildrenNodes: ['li'],
//         regExpStr: '((?:\\*\\s.*?\\n|$)+)',
//         isMultiLine: true,
//     },
//     quote: {
//         allowedChildrenNodes: ['singleQuote'],
//         regExpStr: '((?:>.*?\\n|$)+)',
//         isMultiLine: true,
//         textNodeChildrenAllowed: true,
//     },
//     underline: {
//         allowedChildrenNodes: [],
//         regExpStr: '(__(.*)__)',
//         textNodeChildrenAllowed: true,
//     },
//     deleted: {
//         allowedChildrenNodes: [],
//         regExpStr: '(--(.*)--)',
//         textNodeChildrenAllowed: true,
//     },
//     code: {
//         allowedChildrenNodes: [],
//         regExpStr: '((?:\\s?\\*\\s.*?\\n|$)*)',
//         textNodeChildrenAllowed: true,
//     },
//
// };
//
// export class ParserRules {
//     public static getAllSingleLineTagsRuleStr() {
//         const tab = [];
//         for (const val in rules) {
//             if (rules.hasOwnProperty(val)) {
//                 const value = rules[val];
//                 if (!!!value.isMultiLine && value.regExpStr) {
//                     tab.push(value.regExpStr);
//                 }
//             }
//         }
//         return tab.join('|');
//     }
//
//     public static getAllMultiLineTagsRuleStr(): string {
//         const tab = [];
//         for (const val in rules) {
//             if (rules.hasOwnProperty(val)) {
//                 const value = rules[val];
//                 if (value.isMultiLine && value.regExpStr) {
//                     tab.push(value.regExpStr);
//                 }
//             }
//         }
//         return tab.join('|');
//     }
//
//     public static getAllTagsRuleStr(): string {
//         const tab = [];
//         for (const rule in rules) {
//             if (rules.hasOwnProperty(rule)) {
//                 const value = rules[rule];
//                 if (value.regExpStr) {
//                     tab.push(value.regExpStr);
//                 }
//             }
//         }
//         return tab.join('|');
//     }
// }
