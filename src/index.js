const { fetchIssues } = require("./fetch-issues");
const { parseArgs } = require("./parse-args");
const { csvLines } = require("./create-csv");

(function run() {
  if (process.argv.length <= 2) {
    console.log("node ./path/to/script.js <team> <sprint> <api_token>");
    return;
  }
  
  const { sprint, team, authToken } = parseArgs();
  
  fetchIssues(sprint, team, authToken).then((issues) => {
    const output = csvLines(issues).join("\n");
    console.log(output);
  });
})();
