Feature: Get All Orders
  As a user
  I want to get all orders information
  So that I can read the orders information

  Scenario: Successfully get all orders
    Given I have a valid status
    When I send a GET request to "/production" with the status
    Then I should receive a 200 status code and the orders information