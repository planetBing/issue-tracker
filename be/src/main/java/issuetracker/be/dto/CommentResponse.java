package issuetracker.be.dto;

import issuetracker.be.domain.Comment;
import java.time.LocalDateTime;

public record CommentResponse(

    Long id,
    Long issue_id,
    UserResponse reporter,
    LocalDateTime created_at,
    String contents
) {

  public CommentResponse(Comment comment, UserResponse user) {
    this(comment.getId(),
        comment.getIssue_id(),
        user,
        comment.getCreated_at(),
        comment.getContents()
    );
  }
}