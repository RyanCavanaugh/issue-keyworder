import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput("token");
    if (token === "UNSET") {
      return core.setFailed("Set the 'token' input first");
    }
    const gh = new github.GitHub(token);

    const issue = await gh.issues.get({issue_number: github.context.issue.number, owner: github.context.issue.owner, repo: github.context.issue.repo});
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

run();
