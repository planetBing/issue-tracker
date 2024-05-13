package issuetracker.be.repository;

import issuetracker.be.domain.Label;
import java.util.List;
import org.springframework.data.repository.CrudRepository;


public interface LabelRepository extends CrudRepository<Label, String> {

  @Override
  List<Label> findAll();
}