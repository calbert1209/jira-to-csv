const { fetchIssues } = require("./fetch-issues");

const [_nodePath, _scriptPath, team, sprintS, tokenArg] = process.argv;

if (process.argv.length <= 2) {
  console.log("node ./path/to/script.js <team> <sprint> <api_token>");
  return;
}

if (["SCO", "CE"].indexOf(team) < 0) {
  throw new Error("invalid argument, team must be \"CE\" or \"SCO\"");
}

if (!sprintS || sprintS.length > 3) {
  throw new Error("invalid argument, sprint");
}

const authToken = tokenArg ?? process.env.JIRA_API_TOKEN;

if (!authToken) {
  const badSource = tokenArg ? "in environment variables" : "in args or env";
  throw new Error(`invalid argument, no basic auth token found ${badSource}`);
}

const sprint = parseInt(sprintS);
if (isNaN(sprint)) {
  throw new Error("invalid argument, sprint");
}


fetchIssues(sprint, team, authToken).then(console.log);
