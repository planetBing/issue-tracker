package issuetracker.be.controller;


import issuetracker.be.domain.Milestone;
import issuetracker.be.dto.MilestoneWithIssueCountDto;
import issuetracker.be.dto.SaveMilestone;
import issuetracker.be.dto.UpdateMilestone;
import issuetracker.be.service.MilestoneService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
public class MilestoneController {

  private MilestoneService milestoneService;

  @Autowired
  public MilestoneController(MilestoneService milestoneService) {
    this.milestoneService = milestoneService;
  }

  @GetMapping("/milestone")
  public ResponseEntity<List<MilestoneWithIssueCountDto>> getAllMilestone() {
    List<MilestoneWithIssueCountDto> result = milestoneService.getAllMilestone();
    return ResponseEntity.ok().body(result);
  }

  @PostMapping("/milestone")
  public void save(@RequestBody SaveMilestone saveMilestone) {
    Milestone result = milestoneService.save(saveMilestone);
    log.debug("저장한 마일스톤 {}", result.getId());
  }

  @PutMapping("/milestone/{milestoneId}")
  public void update(@PathVariable Long milestoneId, @RequestBody UpdateMilestone updateMilestone) {
    updateMilestone.setId(milestoneId);
    Milestone result = milestoneService.update(updateMilestone);
    log.debug("수정한 마일스톤 {}", result);
  }

  @DeleteMapping("/milestone/{milestoneId}")
  public void delete(@PathVariable Long milestoneId) {
    Long result = milestoneService.delete(milestoneId);
    log.debug("삭제한 마일스톤 {}", result);
  }
}
