package issuetracker.be.utils;

import java.util.Arrays;

public enum QueryFactory {

  ASSIGNEE("SELECT DISTINCT i.id AS issue_id FROM issue i "
      + "JOIN (SELECT issue_id FROM issue_assignee WHERE user_name = ?) ai On i.id = ai.issue_id "
      + "LEFT JOIN issue_assignee ia ON i.id = ia.issue_id "
      + "LEFT JOIN issue_label il ON ai.issue_id = il.issue_id "
      + "WHERE i.is_open = ? "),
  REPORTER("SELECT DISTINCT i.id AS issue_id FROM issue i "
      + "JOIN (SELECT id FROM issue WHERE reporter = ?) ai On i.id = ai.id "
      + "LEFT JOIN issue_assignee ia ON i.id = ia.issue_id "
      + "LEFT JOIN issue_label il ON ai.id = il.issue_id "
      + "WHERE i.is_open = ? "),
  COMMENT("");

  private final String sql;

  QueryFactory(String sql) {
    this.sql = sql;
  }

  public String getSql() {
    return sql;
  }

  public static String convert(String filterType) {
    return Arrays.stream(QueryFactory.values())
        .filter(qf -> qf.name().equals(filterType.toUpperCase()))
        .map(QueryFactory::getSql)
        .findFirst()
        .orElseThrow();
  }
}
