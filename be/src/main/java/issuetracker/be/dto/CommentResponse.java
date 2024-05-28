package issuetracker.be.dto;

import issuetracker.be.domain.Comment;
import issuetracker.be.domain.User;
import java.time.LocalDateTime;

public record CommentResponse(

    Long id,
    Long issue_id,
    User reporter,
    LocalDateTime created_at,
    String contents
) {

  public CommentResponse(Comment comment, User user) {
    this(comment.getId(),
        comment.getIssue_id(),
        user,
        comment.getCreated_at(),
        comment.getContents()
    );
  }
}