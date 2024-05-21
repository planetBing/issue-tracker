package issuetracker.be.dto;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.utils.TimeLapseCalculator;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueShowResponse {

  private Long id;
  private String title;
  private String create_At;
  private User reporter;
  private List<Label> label;
  private MilestoneWithIssueCountResponse milestone;

  public IssueShowResponse(Issue issue, List<Label> label, MilestoneWithIssueCountResponse milestone, User reporter) {
    this.id = issue.getId();
    this.title = issue.getTitle();
    this.create_At = TimeLapseCalculator.between(issue.getCreated_at(), LocalDateTime.now());
    this.label = label;
    this.reporter = reporter;
    this.milestone = milestone;
  }
}
