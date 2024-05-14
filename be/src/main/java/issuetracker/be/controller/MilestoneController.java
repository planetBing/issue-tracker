package issuetracker.be.controller;


import issuetracker.be.dto.MilestoneWithIssueCountDto;
import issuetracker.be.service.MilestoneService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MilestoneController {

  private MilestoneService milestoneService;

  public MilestoneController(MilestoneService milestoneService) {
    this.milestoneService = milestoneService;
  }

  @GetMapping("/milestone")
  public ResponseEntity<List<MilestoneWithIssueCountDto>> getAllMilestone() {
    List<MilestoneWithIssueCountDto> result = milestoneService.getAllMilestone();
    return ResponseEntity.ok().body(result);
  }
}
