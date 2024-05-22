package issuetracker.be.domain.issueFilter.type;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.IssueFilter;

public class IssueLabelFilter implements IssueFilter {

  private final String labelId;

  public IssueLabelFilter(String labelId) {
    this.labelId = labelId;
  }

  @Override
  public boolean canFilter(Issue issue) {
    if ("none".equals(labelId)) {
      return false;
    }
    return issue.hasLabelId(Long.parseLong(labelId));
  }
}
