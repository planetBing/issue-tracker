package issuetracker.be.repository;

import issuetracker.be.domain.LabelRef;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface LabelRefRepository extends CrudRepository<LabelRef, Long> {
  @Modifying
  @Query("DELETE FROM issue_label WHERE issue_id = :id")
  void deleteIssue(@Param("id") Long id);
}
