const https = require("https");

const createBody = (sprint, team) => {
  const lastSprintName = `\"Sprint ${sprint} - ${team}\"`;
  const nextSprintName = `\"Sprint ${sprint + 1} - ${team}\"`
  
  return JSON.stringify({
    jql: `Sprint =${lastSprintName}  AND Sprint != ${nextSprintName} AND Status = Done`,
    maxResults: 50,
    fieldsByKeys: false,
    fields: [
      "customfield_10020",
      "issuetype",
      "assignee",
      "customfield_10026",
      "timespent",
      "statuscategorychangedate",
      "labels",
      "summary"
    ],
    startAt: 0
  });
}

const createFetchOptions = (authToken) => {
  const encodedToken = Buffer
    .from(`c.albert@shippio.io:${authToken}`)
    .toString("base64");

  const headers = {
    "Accept": "application/json",
    "User-Agent": "node-js",
    "Authorization": `Basic ${encodedToken}`,
    "Content-Type": "application/json"
  }
  
  return {
    hostname: "shippio.atlassian.net",
    path: "/rest/api/3/search",
    method: "POST",
    headers,
  }
}

const fetchIssues = async (sprint, team, authToken) => {
  const body = createBody(sprint, team);
  const options = createFetchOptions(authToken);
  const resp = await fetch(body, options);
  return resp.issues;
}

const fetch = (body, options) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      const chunks = [];
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      res.on('end', () => {
        try {
          const data = chunks.join("");
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    
    req.write(body);
    req.end();
  })
}

module.exports = {
  fetchIssues
}