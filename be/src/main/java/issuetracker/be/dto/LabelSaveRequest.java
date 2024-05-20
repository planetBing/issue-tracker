package issuetracker.be.dto;

import issuetracker.be.domain.Label;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LabelSaveRequest {
  private String name;
  private String background_color;
  private String text_color;
  private String description;

  public Label toEntity() {
    return new Label(name, background_color, text_color, description);
  }
}
