package issuetracker.be.controller;

import issuetracker.be.domain.Label;
import issuetracker.be.dto.LabelSaveRequest;
import issuetracker.be.dto.LabelUpdateRequest;
import issuetracker.be.service.LabelService;
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


import java.util.List;

@Slf4j
@RestController
public class LabelController {

  private LabelService labelService;

  @Autowired
  public LabelController(LabelService labelService) {
    this.labelService = labelService;
  }

  @GetMapping("/label")
  public ResponseEntity<List<Label>> getLabels() {
    List<Label> allLabel = labelService.getAllLabel();
    return ResponseEntity.ok().body(allLabel);
  }

  @PostMapping("/label")
  public void save(@RequestBody LabelSaveRequest labelSaveRequest) {
    labelService.save(labelSaveRequest);
  }

  @PutMapping("/label")
  public void update(@RequestBody LabelUpdateRequest labelUpdateRequest) {
    labelService.update(labelUpdateRequest);
  }

  @DeleteMapping("/label/{id}")
  public void delete(@PathVariable Long id) {
    labelService.delete(id);
  }
}
