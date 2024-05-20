package issuetracker.be.dto;

import issuetracker.be.domain.Milestone;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveMilestone {
  private String name;
  private String description;
  private LocalDate endDate;

  public Milestone toEntity() {
    return new Milestone(name, description, endDate);
  }
}
