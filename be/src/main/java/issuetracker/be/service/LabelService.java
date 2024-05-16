package issuetracker.be.service;

import issuetracker.be.domain.Label;
import issuetracker.be.repository.LabelRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabelService {

  private LabelRepository labelRepository;

  @Autowired
  public LabelService(LabelRepository labelRepository) {
    this.labelRepository = labelRepository;
  }

  public List<Label> getAllLabel() {
    return labelRepository.findAll();
  }
}
