package issuetracker.be.repository;

import issuetracker.be.dto.FilterRequest;
import issuetracker.be.dto.FilteredResult;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FilterIssueRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<FilteredResult> filterIssue(String sql, String name, FilterRequest filterRequest, boolean isOpen) {
    StringBuilder query = new StringBuilder(sql);

    List<Object> params = new ArrayList<>();
    params.add(name);
    params.add(isOpen);

    addAssigneeFilter(query, params, filterRequest.assignee());
    addLabelFilter(query, params, filterRequest.label());
    addMilestoneFilter(query, params, filterRequest.milestone());
    addReporterFilter(query, params, filterRequest.reporter());

    return jdbcTemplate.query(query.toString(), params.toArray(),
        new BeanPropertyRowMapper<>(FilteredResult.class));
  }

  /**
   * 담당자 필터
   */
  public void addAssigneeFilter(StringBuilder condition, List<Object> params, String assignee) {
    if (assignee != null) {
      if (assignee.equals("none")) {
        condition.append("AND ia.user_name IS NULL ");
      } else {
        condition.append("AND ia.user_name = ? ");
        params.add(assignee);
      }
    }
  }

  /**
   * 마일스톤 필터
   */
  public void addMilestoneFilter(StringBuilder condition, List<Object> params, String milestone) {
    if (milestone != null) {
      if (milestone.equals("none")) {
        condition.append("AND i.milestone_id IS NULL ");
      } else {
        condition.append("AND i.milestone_id = ? ");
        params.add(milestone);
      }
    }
  }

  /**
   * 작성자 필터
   */
  public void addReporterFilter(StringBuilder condition, List<Object> params, String reporter) {
    if (reporter != null) {
      if (reporter.equals("none")) {
        condition.append("AND i.reporter IS NULL ");
      } else {
        condition.append("AND i.reporter = ? ");
        params.add(reporter);
      }
    }
  }

  /**
   * 라벨 필터
   */
  public void addLabelFilter(StringBuilder condition, List<Object> params, String label) {
    if (label != null) {
      if (label.equals("none")) {
        condition.append("AND il.issue_id IS NULL ");
      } else {
        condition.append("AND i.id IN ("
            + "SELECT issue_id "
            + "FROM issue_label "
            + "WHERE label_id = ?)");
        params.add(label);
      }
    }
  }
}
