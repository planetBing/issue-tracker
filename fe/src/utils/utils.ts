export function calculateMilestoneProgress(
  openIssues: number,
  closedIssues: number
) {
  const totalIssues = openIssues + closedIssues;

  if (totalIssues === 0) return 0;

  const completionRate = closedIssues / totalIssues;
  return completionRate;
}
