package issuetracker.be.domain;

import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
public class Milestone {

  @Id
  private Long id;
  private String name;
  private String description;
  private LocalDate endDate;
  private boolean isOpen = true;

  public Milestone(String name, String description, LocalDate endDate) {
    this.name = name;
    this.description = description;
    this.endDate = endDate;
  }

  public Milestone(Long id, String name, String description, LocalDate endDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.endDate = endDate;
  }
}
