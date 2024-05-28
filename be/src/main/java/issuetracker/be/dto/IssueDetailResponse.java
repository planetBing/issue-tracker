package issuetracker.be.dto;

import issuetracker.be.domain.Issue;
import issuetracker.be.domain.Label;
import issuetracker.be.domain.User;
import issuetracker.be.utils.TimeLapseCalculator;
import java.time.LocalDateTime;
import java.util.List;

public record IssueDetailResponse(
    Long id,
    String title,
    String created_At,
    User reporter,
    Boolean is_open,
    List<User> assignee,
    List<Label> label,
    MilestoneWithIssueCountResponse milestone,
    List<CommentResponse> comment

) {

  public IssueDetailResponse(Issue issue, List<User> assignee ,List<Label> label,
      MilestoneWithIssueCountResponse milestone, User reporter, List<CommentResponse> comment) {
    this(
        issue.getId(),
        issue.getTitle(),
        TimeLapseCalculator.between(issue.getCreated_at(), LocalDateTime.now()),
        reporter,
        issue.getIs_open(),
        assignee,
        label,
        milestone,
        comment
    );
  }
}