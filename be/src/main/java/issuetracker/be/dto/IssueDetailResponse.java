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
public class IssueDetailResponse {

  private Long id;
  private String title;
  private String create_At;
  private User reporter;
  private Boolean is_open;
  private List<Label> label;
  private MilestoneWithIssueCountResponse milestone;
  private List<CommentResponse> comment;


  public IssueDetailResponse(Issue issue, List<Label> label,
      MilestoneWithIssueCountResponse milestone, User reporter, List<CommentResponse> comment) {
    this.id = issue.getId();
    this.title = issue.getTitle();
    this.create_At = TimeLapseCalculator.between(issue.getCreated_at(), LocalDateTime.now());
    this.label = label;
    this.reporter = reporter;
    this.is_open = issue.getIs_open();
    this.milestone = milestone;
    this.comment = comment;
  }
}
