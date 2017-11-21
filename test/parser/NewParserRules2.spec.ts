import {ParserRules} from './ParserRules2';

describe('Parser rules tests', () => {
    const headerTestText = `## Weekly JavaScript Challenge **`;

    it('should work', () => {
        expect(ParserRules.getRule('all')).toBe('((?:.*?\\n|$)*)');
        const tab = [];
        const str = tab.join('|');
        expect(str).toBe('');
        console.log(ParserRules.getAllAllowedTagsRuleStr('all'));
        ParserRules.findTag(headerTestText, 'all');
    });
});
