package issuetracker.be.dto;

import issuetracker.be.domain.Label;
import lombok.Getter;

@Getter
public class LabelSaveRequest {
  private String name;
  private String background_color;
  private String text_color;
  private String description;

  public Label toEntity() {
    return Label.builder().name(name)
        .background_color(background_color)
        .text_color(text_color)
        .description(description)
        .build();
  }
}
