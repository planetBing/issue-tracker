package issuetracker.be.service;

import issuetracker.be.domain.Milestone;
import issuetracker.be.dto.MilestoneWithIssueCountDto;
import issuetracker.be.dto.SaveMilestone;
import issuetracker.be.dto.UpdateMilestone;
import issuetracker.be.exception.MilestoneDeletionException;
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
  public List<MilestoneWithIssueCountDto> getAllMilestone() {
    return milestoneRepository.findAllWithIssueCount();
  }

  /**
   * 마일스톤을 생성한다.
   * @param saveMilestone 마일스톤 생성 내용이 담긴 DTO
   * @return 생성한 마일스톤 객체
   */
  public Milestone save(SaveMilestone saveMilestone) {
    Milestone milestone = saveMilestone.toEntity();
    return milestoneRepository.save(milestone);
  }
}