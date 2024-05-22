package issuetracker.be.domain.issueFilter.type;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.IssueFilter;

public class IssueMilestoneFilter implements IssueFilter {

  private final String milestoneId;

  public IssueMilestoneFilter(String milestoneId) {
    this.milestoneId = milestoneId;
  }

  @Override
  public boolean canFilter(Issue issue) {
    if ("none".equals(milestoneId)) {
      return false;
    }
    return issue.hasMilestoneId(Long.parseLong(milestoneId));
  }
}
