package issuetracker.be.repository;

import issuetracker.be.domain.Issue;
import java.util.List;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long> {

  @Query("SELECT COUNT(*) > 0 FROM issue WHERE milestone_id = :milestoneId")
  boolean existsByMilestoneId(@Param("milestoneId") Long milestoneId);

  @Query("SELECT * FROM issue WHERE is_open = :isOpen")
  List<Issue> findByIsOpen(@Param("isOpen") boolean isOpen);

  @Query("SELECT i.* FROM issue i"
      + "JOIN issue_assignee ia ON i.id = ia.issue_id"
      + "JOIN user u ON ia.user_name = u.name"
      + "WHERE u.name = :name")
  List<Issue> findByMyAssigned(@Param("name") String name);

  List<Issue> findAllById(Long id);
}
