const parseSprintTeam = (sprintName) => {
  const regex = /(?<sprint>[0-9]{2})\s-\s(?<team>(SCO|CE))/;
  const { groups } = sprintName.match(regex);
  return { ...groups }
}

const csvLine = ({key, fields}) => {
  const {
    customfield_10014: epicLabel,
    customfield_10020,
    customfield_10026,
    issuetype,
    assignee,
    timespent,
    labels,
    summary,
    statuscategorychangedate
  } = fields;
  const { sprint, team } = parseSprintTeam(customfield_10020[0]?.name);
  const issueType = issuetype?.name;
  const assigneeName = assignee?.displayName;
  const storyPoints = customfield_10026 ?? "";
  const timeSpent = timespent ?? "";
  const statusCatChanged = statuscategorychangedate;
  const labelsString = labels.join(";");

  return [
    sprint,
    team,
    key,
    issueType,
    assigneeName,
    storyPoints,
    timeSpent,
    statusCatChanged,
    labelsString,
    epicLabel,
    summary
  ].join(",");
}

const csvHeader = [
  "Sprint",
  "Team",
  "Key",
  "Issue Type",
  "Assignee",
  "Story Points",
  "Time Spent",
  "Status Category Changed",
  "Labels",
  "Epic Link",
  "Summary"
].join(",");

const csvLines = (issues) => (
  [
    csvHeader,
    ...issues.map(csvLine)
  ]
);

module.exports = {
  csvLines,
};
