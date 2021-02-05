export class AnalyticRule {
    constructor(
        public type: string,
        public expression: RegExp,
        public children: AnalyticRule[][],
        public hasSkip: boolean
    ) {}

    public toString = () : string => {
        const children = this.children.map(rules => {
            return `[${rules.map(rule => {return `${rule.type}`})}]`})


        return `[type: ${this.type} children: [${children}]]`
    }
}

export interface AnalyticRuleTemplate {
    [type : string] : {
        expression: string,
        children: (string[] | 'skip')[]
    }
}

function replace() {
    const test = /(?:$|[^\\])\(([^\n\s]+)/
}

export function compileRule(template : AnalyticRuleTemplate) : AnalyticRule[] {
    type RuleBook = {
        [type : string] : AnalyticRule
    }

    const ruleBook : RuleBook = {}
    for(let [type, rule] of Object.entries(template)) {

        ruleBook[type] = new AnalyticRule(
            type,
            new RegExp(rule.expression),
            [],
            false
        )
    }

    const result : AnalyticRule[] = []
    for(let [type, rule] of Object.entries(template)) {
        const target = ruleBook[type]
        for (let children of rule.children) {
            if (children == 'skip') {
                target.hasSkip = true
                continue
            }

            const childrules : AnalyticRule[] = []
            for(let childtype of children) {
                childrules.push(ruleBook[childtype])
            }
            target.children.push(childrules)
        }

        result.push(target)
    }

    return result
}

