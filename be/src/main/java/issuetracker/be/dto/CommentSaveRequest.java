package issuetracker.be.dto;

import issuetracker.be.domain.Comment;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentSaveRequest {

  private Long issue_id;
  private String reporter;
  private String contents;

  public Comment toEntity(LocalDateTime now) {
    return new Comment(issue_id, reporter, now, contents);
  }

}