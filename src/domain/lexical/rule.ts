export class LexicalRule {
    constructor(
        public type: string,
        public expression: RegExp,
        public children: LexicalRule[][],
        public hasSkip: boolean
    ) {}

    public toString = () : string => {
        const children = this.children.map(rules => {
            return `[${rules.map(rule => {return `${rule.type}`})}]`})


        return `[type: ${this.type} children: [${children}]]`
    }
}

export interface LexicalRuleTemplate {
    [type : string] : {
        expression: string,
        children: (string[] | 'skip')[]
    }
}

export function compileRule(template : LexicalRuleTemplate) : LexicalRule[] {
    type RuleBook = {
        [type : string] : LexicalRule
    }

    const ruleBook : RuleBook = {}
    for(let [type, rule] of Object.entries(template)) {

        ruleBook[type] = new LexicalRule(
            type,
            new RegExp(rule.expression),
            [],
            false
        )
    }

    const result : LexicalRule[] = []
    for(let [type, rule] of Object.entries(template)) {
        const target = ruleBook[type]
        for (let children of rule.children) {
            if (children == 'skip') {
                target.hasSkip = true
                continue
            }

            const childrules : LexicalRule[] = []
            for(let childtype of children) {
                childrules.push(ruleBook[childtype])
            }
            target.children.push(childrules)
        }

        result.push(target)
    }

    return result
}
