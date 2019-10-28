"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput("token");
            if (token === "UNSET") {
                return core.setFailed("Set the 'token' input first");
            }
            const gh = new github.GitHub(token);
            const issue = yield gh.issues.get({ issue_number: github.context.issue.number, owner: github.context.issue.owner, repo: github.context.issue.repo });
            if (issue.data.body.indexOf("fish") >= 0) {
                yield gh.issues.createComment({
                    body: "You said the magic word",
                    issue_number: github.context.issue.number, owner: github.context.issue.owner, repo: github.context.issue.repo
                });
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
