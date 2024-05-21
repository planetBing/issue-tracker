package issuetracker.be.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Getter
@ToString
@Builder
public class Label {

  @Id
  private Long id;
  private String name;
  private String background_color;
  private String text_color;
  private String description;
}
