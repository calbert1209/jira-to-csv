const { fetchIssues } = require("./fetch-issues");
const { parseArgs } = require("./parse-args");

if (process.argv.length <= 2) {
  console.log("node ./path/to/script.js <team> <sprint> <api_token>");
  return;
}

const { sprint, team, authToken } = parseArgs();

fetchIssues(sprint, team, authToken).then(console.log);
