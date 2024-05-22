package issuetracker.be.domain.issueFilter.type;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.IssueFilter;

public class IssueAssigneeFilter implements IssueFilter {

  private final String assignee;

  public IssueAssigneeFilter(String assignee) {
    this.assignee = assignee;
  }

  @Override
  public boolean canFilter(Issue issue) {
    if ("none".equals(assignee)) {
      return false;
    }
    return issue.hasAssignee(assignee);
  }
}
