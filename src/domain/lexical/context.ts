import { assert } from "console"
import { LexicalRule } from "./rule"

interface Token {
    matched: string,
    rule : LexicalRule,
    captures: string[],
    skip?: string
}

export class Context {
    private source: string
    public current?: Token | null

    constructor(
        public text : string,
        private rules : LexicalRule[],
        private skipToken? : string
    ) {
        this.source = text
    }


    public moveNext() : void {
        if (this.current === null) {
            this.source = ''
            return
        }

        if (this.current === undefined){
            return
        }

        this.source = this.source.replace(this.current.matched, '')

    }

    public scanToken() : Token | null {
        this.skip(this.skipToken)

        for (let rule of this.rules) {
            const cap = rule.expression.exec(this.source)
            if (cap) {
                this.current = {
                    matched: cap.shift() || '',
                    rule : rule,
                    skip: rule.hasSkip ? cap.shift() : undefined,
                    captures: cap
                }

                if (cap.length != rule.children.length) {
                    throw new Error("The number of captured text should be equal to that of chilren's rules");
                }

                return this.current
            }
        }


        this.current = null
        return null
    }

    public skip(token? : string) : void {
        if (!token) {
            return
        }

        if (this.source.startsWith(token)) {
            this.source = this.source.slice(token.length)
        }
    }

    public hasMoreToken() : boolean {
        assert(this.source)
        return this.source.length > 0
    }
}
