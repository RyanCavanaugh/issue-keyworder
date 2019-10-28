import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput("token");
    if (token === "UNSET") {
      return core.setFailed("Set the 'token' input first");
    }
    const gh = new github.GitHub(token);

    const issue = await gh.issues.get(github.context.issue);
    if (issue.data.body.indexOf("fish") >= 0) {
      await gh.issues.createComment({
        body: "You said the magic word",
        ...github.context.issue
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
