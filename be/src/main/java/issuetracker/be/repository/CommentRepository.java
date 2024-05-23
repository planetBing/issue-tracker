package issuetracker.be.repository;

import issuetracker.be.domain.Comment;
import java.util.List;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

  @Query("SELECT * FROM Comment WHERE issue_id = :id")
  List<Comment> findByIssueId(Long id);

  @Query("SELECT reporter FROM Comment WHERE issue_id = :id")
  List<String> findByReporter(Long id);
}