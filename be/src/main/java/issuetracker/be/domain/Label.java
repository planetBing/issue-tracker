package issuetracker.be.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@ToString
public class Label {

  @Id
  private Long id;
  private String name;
  private String background_color;
  private String text_color;
  private String description;

  public Label(String name, String background_color, String text_color, String description) {
    this.name = name;
    this.background_color = background_color;
    this.text_color = text_color;
    this.description = description;
  }
}
