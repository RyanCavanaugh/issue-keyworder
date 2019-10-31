import * as core from '@actions/core';
import * as github from '@actions/github';
import { IssuesGetResponse } from '@octokit/rest';
import { Responses } from './responses';

export type Issue = Pick<IssuesGetResponse, "body" | "user">;

async function run() {
    try {
        const token = core.getInput("token");
        if (token === "UNSET") {
            return core.setFailed("Set the 'token' input first");
        }
        const gh = new github.GitHub(token);

        const issue = await gh.issues.get({ issue_number: github.context.issue.number, owner: github.context.issue.owner, repo: github.context.issue.repo });
        if (issue.data.body.indexOf("fish") >= 0) {
            await gh.issues.createComment({
                body: "You said the magic word",
                issue_number: github.context.issue.number, owner: github.context.issue.owner, repo: github.context.issue.repo
            });
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

export function formatResponseList(responses: string[]) {
    let body = `I noticed one or more things in your issue that correspond to common questions. If these aren't relevant, please ignore them - I'm just a simple bot! A human will appear shortly if more follow-up is needed.`;
    for (const resp of responses) {
        body = body + "\n\n * " + resp;
    }
    return body;
}

export function getIssueResponses(issue: Issue) {
    const responses = Responses.map(r => r.response({issue})!).filter(r => r !== undefined);
    if (responses.length === 0) {
        return undefined;
    }
    return responses;
}

run();
