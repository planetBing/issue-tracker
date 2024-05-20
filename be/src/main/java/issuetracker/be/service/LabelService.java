package issuetracker.be.service;

import issuetracker.be.domain.Label;
import issuetracker.be.dto.LabelSaveRequest;
import issuetracker.be.dto.LabelUpdateRequest;
import issuetracker.be.repository.LabelRepository;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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

  public void update(LabelUpdateRequest request) {
    Optional<Label> optOriginLabel = labelRepository.findById(request.getId());
    log.debug("업데이트할 라벨 : {}", optOriginLabel.get());
    optOriginLabel.ifPresentOrElse(
        originLabel -> {
          Label entity = request.toEntity();
          Label updatedLabel = labelRepository.save(entity);
          log.debug("라벨 업데이트 정보 : {} -> {}", originLabel, updatedLabel);
        },
        () -> {
          throw new NoSuchElementException("업데이트할 라벨이 없습니다");
        });
  }
}
