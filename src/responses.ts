/*
import { Issue } from "./main";

type Response = {
    response(obj: { issue: Issue }): string | undefined;
}
export const Responses: Response[] = [];

// Object.keys
add(/Object\.keys/i, "`Object.keys` intentionally doesn't return a `keyof` type; see [this StackOverflow question](https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript)");
add(/interface \w+ {\s*}/i, "This code contains an empty interface - have you read the FAQ entry about this?")
add(/class \w+ {\s*}/i, "This code contains an empty class - have you read the FAQ entry about this?");
Responses.push({
    response({ issue }) {
        if (/(interface|class) \w+<(\w+)>/.test(issue.body) &&
            !(/(interface|class) \w+<(\w+)> {[\s\S]*\2[\s\S]*}/.test(issue.body))) {
            return "This code contains an unconsumed generic type parameter - have you read the FAQ entry about this?";
        }
    },
});

function add(rgx: RegExp, s: string) {
    Responses.push({
        response({ issue }) {
            if (rgx.test(issue.body)) {
                return s;
            }
        }
    })
}
*/
export { };
