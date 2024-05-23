package issuetracker.be.dto;

import issuetracker.be.domain.Comment;
import issuetracker.be.domain.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponse {
  private Long id;
  private Long issue_id;
  private User reporter;
  private LocalDateTime created_at;
  private String contents;

  public CommentResponse(Comment comment, User user) {
    this.id = comment.getId();
    this.issue_id = comment.getIssue_id();
    this.reporter = user;
    this.created_at = comment.getCreated_at();
    this.contents = comment.getContents();
  }
}
