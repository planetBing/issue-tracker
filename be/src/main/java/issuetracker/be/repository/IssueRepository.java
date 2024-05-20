package issuetracker.be.repository;

import issuetracker.be.domain.Issue;
import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, Long> {
  boolean existsByMilestoneId(Long milestoneId);
}
