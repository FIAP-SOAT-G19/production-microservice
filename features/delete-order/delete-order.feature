Feature: Delete Order
  As a user
  I want to delete an order
  So that the order can be deleted from the system

  Scenario: Successfully delete an order
    Given I have a valid order number
    When I send a DELETE request to "/production" with the order number
    Then I should receive a 204 status code