const rules = {
    all: {
        allowedChildrenNodes: ['header', 'underline', 'strong', 'deleted', 'list'],
        regExpStr: '((?:.*?\\n|$)*)',
        tagName: 'div',
        isMultiLine: true,
        textNodeChildrenAllowed: true,
        matchGroups: 1,
    },
    header: {
        allowedChildrenNodes: ['underline', 'strong', 'deleted'],
        regExpStr: '((#{1,6})\\s(.*)(?:\\n|$))',
        textNodeChildrenAllowed: true,
        matchGroups: 3,
    },
    strong: {
        allowedChildrenNodes: ['underline', 'link', 'deleted'],
        regExpStr: '(\\*\\*(.*)\\*\\*)',
        textNodeChildrenAllowed: true,
        matchGroups: 2,
    },
    list: {
        allowedChildrenNodes: ['li'],
        regExpStr: '((?:\\s?\\*\\s.*?\\n|$)+)',
        isMultiLine: true,
        matchGroups: 1,
    },
    underline: {
        allowedChildrenNodes: [],
        regExpStr: '(__(.*)__)',
        textNodeChildrenAllowed: true,
        matchGroups: 2,
    },
    deleted: {
        allowedChildrenNodes: [],
        regExpStr: '(--(.*)--)',
        textNodeChildrenAllowed: true,
        matchGroups: 2,
    },
};

const findFirstInMatchResult = (tab: string[]) => {
    if ((tab) && (tab.length > 1)) {
        for (let i = 1; i < tab.length; i++) {
            if (tab[i]) {
                return i;
            }
        }
        return -1;
    }
};

export class ParserRules {

    public static getRule(tag: string): string {
        if (rules.hasOwnProperty(tag)) {
            const rule = rules[tag];
            return rule.regExpStr;
        }
        return null;
    }

    public static findTag(text: string, parentNode: string) {
        const reqExp = new RegExp(ParserRules.getAllAllowedTagsRuleStr(parentNode), 'i');
        if (text.search(reqExp) === 0) {
            const something = text.match(reqExp);
            if (something) {
                const i = findFirstInMatchResult(something);
                console.log(i);
            }
        }
    }

    public static findIndex(tab) {
        if ((tab) && (tab.length > 1)) {
            for (let i = 1; i < tab.length; i++) {
                if (tab[i]) {
                    return i;
                }
            }
        }
    }

    public static getAllAllowedTagsRuleStr(tag: string): string {
        const tab = [];
        if (rules.hasOwnProperty(tag)) {
            const childrenRules = rules[tag].allowedChildrenNodes;
            if (childrenRules) {
                for (const elem of childrenRules) {
                    tab.push(ParserRules.getRule(elem));
                }
            }
        }
        return tab.join('|');
    }
}
