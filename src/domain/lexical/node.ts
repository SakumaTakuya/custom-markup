import { assert } from "console"
import { Context } from "./context"
import { AnalyticRule } from "./rule"

export interface LexicalNode {
    children : LexicalNode[],
    type : string,
    content : string
}

export function lex(rootContext : Context) : LexicalNode {
    function lexChild(context : Context, node : LexicalNode) {
        while(context.hasMoreToken()) {
            const token = context.scanToken()
            if (token) {
                const child : LexicalNode = {
                    children : [],
                    type: token.rule.type,
                    content: token.matched
                }
                const len = token.captures.length

                for (let i = 0; i < len; i++) {
                    assert(token.rule.children[i])

                    const context = new Context(
                        token.captures[i],
                        token.rule.children[i],
                        token.skip)
                    lexChild(context, child)
                }

                node.children.push(child)
            }

            context.moveNext()
        }
    }

    const root : LexicalNode = {
        children: [],
        type:"root",
        content: rootContext.text
    }

    lexChild(rootContext, root)
    return root
}

export interface ParsingRule {
    [type : string] : {
        format: string,
    }
}

function format(formatString : string, ...args : any[]) : string {
    return formatString.replace(/\$\{(\d+)\}/g, (_, k) => {  // m="{0}", k="0"
        return args[k];
    });
}

export function parse(node : LexicalNode, rules : ParsingRule) : string {
    return format(rules[node.type].format, node.children.map(child => {
        return parse(child, rules)
    }))
}

