package issuetracker.be.controller;

import issuetracker.be.domain.Label;
import issuetracker.be.service.LabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class LabelController {

  private LabelService labelService;

  @Autowired
  public LabelController(LabelService labelService) {
    this.labelService = labelService;
  }

  @GetMapping("/label")
  public ResponseEntity<Iterable<Label>> sendLabels() {
    Iterable<Label> allLabel = labelService.getAllLabel();
    return ResponseEntity.ok().body(allLabel);
  }
}
