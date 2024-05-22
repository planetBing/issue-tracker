package issuetracker.be.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentUpdateRequest {

  private Long comment_id;
  private String contents;

}