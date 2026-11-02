Feature: Todo list
  As a user
  I want to manage todo items
  So that I can track my work

  @smoke
  Scenario: Add a todo item
    Given I open the TodoMVC application
    When I add a todo named "Buy groceries"
    Then I should see the todo named "Buy groceries"

  Scenario: Complete a todo item
    Given I open the TodoMVC application
    And I add a todo named "Read a book"
    When I complete the todo named "Read a book"
    Then the todo named "Read a book" should be completed
