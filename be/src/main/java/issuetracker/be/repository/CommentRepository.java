package issuetracker.be.repository;

import issuetracker.be.domain.Comment;
import java.util.List;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

  @Query("SELECT * FROM comment WHERE issue_id = :id")
  List<Comment> findByIssueId(Long id);

  @Query("SELECT * FROM comment WHERE reporter = :reporter")
  List<Comment> findByReporter(String reporter);
}