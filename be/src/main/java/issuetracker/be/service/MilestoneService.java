package issuetracker.be.service;

import issuetracker.be.domain.Milestone;
import issuetracker.be.dto.MilestoneSaveRequest;
import issuetracker.be.dto.MilestoneUpdateRequest;
import issuetracker.be.exception.MilestoneHasAssociatedIssuesException;
import issuetracker.be.dto.MilestoneWithIssueCountResponse;
import issuetracker.be.repository.MilestoneRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MilestoneService {

  MilestoneRepository milestoneRepository;
  IssueService issueService;

  @Autowired
  public MilestoneService(MilestoneRepository milestoneRepository, IssueService issueService) {
    this.milestoneRepository = milestoneRepository;
    this.issueService = issueService;
  }

  /**
   * 전체 마일스톤의 정보를 조회한다
   * @return 마일스톤 조회 DTO List
   */
  public List<MilestoneWithIssueCountResponse> getAllMilestone() {
    return milestoneRepository.findAllWithIssueCount();
  }

  /**
   * 마일스톤을 생성한다.
   * @param milestoneSaveRequest 마일스톤 생성 내용이 담긴 DTO
   * @return 생성한 마일스톤 객체
   */
  public Milestone save(MilestoneSaveRequest milestoneSaveRequest) {
    Milestone milestone = milestoneSaveRequest.toEntity();
    return milestoneRepository.save(milestone);
  }

  /**
   * 마일스톤을 삭제한다.
   * @param id 삭제하고자 하는 마일스톤의 id
   * @return 삭제된 마일스톤의 id
   * @throws NoSuchElementException 해당하는 마일스톤의 번호가 없을 경우 예외가 발생한다.
   * @throws MilestoneHasAssociatedIssuesException 마일스톤에 딸려있는 이슈가 있으면 예외가 발생한다.
   */
  public Long delete(Long id) {
    Milestone byId = milestoneRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("해당 마일스톤이 존재하지 않습니다."));

    if (issueService.isIssueExistBy(id)) {
      throw new MilestoneHasAssociatedIssuesException("이슈가 존재하는 마일스톤은 삭제할 수 없습니다.");
    }
    milestoneRepository.delete(byId);
    return id;
  }

  /**
   * 마일스톤의 내용을 수정한다.
   * @return 수정을 성공한 마일스톤 객체
   * @param milestoneUpdateRequest 마일스톤 수정 내용이 담긴 DTO
   * @throws NoSuchElementException 해당하는 마일스톤의 번호가 없을 경우 예외가 발생한다.
   */
  public Milestone update(MilestoneUpdateRequest milestoneUpdateRequest) {
    Long id = milestoneUpdateRequest.getId();
    if (milestoneRepository.findById(id).isEmpty()) {
      throw new NoSuchElementException("존재하지 않는 마일스톤입니다.");
    }
    return milestoneRepository.save(milestoneUpdateRequest.toEntity());
  }
}