package issuetracker.be.service;

import issuetracker.be.domain.Label;
import issuetracker.be.dto.LabelSaveRequest;
import issuetracker.be.repository.LabelRepository;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
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

  public void save(LabelSaveRequest labelSaveRequest) {
    Label savedLabel = labelRepository.save(labelSaveRequest.toEntity());
    log.debug("저장된 라벨 정보 : {}", savedLabel);
  }
}
