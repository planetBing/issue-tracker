package issuetracker.be.repository;

import issuetracker.be.domain.AssigneeRef;
import java.util.List;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssigneeRefRepository extends CrudRepository<AssigneeRef, Long> {

  @Query("SELECT * FROM Issue_assignee WHERE issue_id = :id")
  List<AssigneeRef> findAllUser(@Param("id") Long id);
}
