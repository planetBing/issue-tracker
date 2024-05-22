package issuetracker.be.domain.issueFilter;

import issuetracker.be.domain.IssueFilter;
import issuetracker.be.domain.IssueFilters;
import issuetracker.be.domain.issueFilter.type.IssueAssigneeFilter;
import issuetracker.be.domain.issueFilter.type.IssueLabelFilter;
import issuetracker.be.domain.issueFilter.type.IssueMilestoneFilter;
import issuetracker.be.domain.issueFilter.type.IssueReporterFilter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class IssueFilterFactory {
  private final List<IssueFilter> issueFilters = new ArrayList<>();

  public IssueFilters createIssueFilters(String assignee, String label, String milestone,
      String reporter) {
    addFilter(assignee, IssueAssigneeFilter::new);
    addFilter(label, IssueLabelFilter::new);
    addFilter(milestone, IssueMilestoneFilter::new);
    addFilter(reporter, IssueReporterFilter::new);
    return new IssueFilters(issueFilters);
  }

  private void addFilter(String value, Function<String, IssueFilter> valueToIssueFilter) {
    Optional.ofNullable(value)
        .map(valueToIssueFilter)
        .ifPresent(issueFilters::add);
  }
}
