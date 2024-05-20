package issuetracker.be.dto;

import issuetracker.be.domain.Label;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class LabelUpdateRequest {
  private Long id;
  private String name;
  private String background_color;
  private String text_color;
  private String description;

  public Label toEntity() {
    return Label.builder().id(id)
        .name(name)
        .background_color(background_color)
        .text_color(text_color)
        .description(description)
        .build();
  }
}
