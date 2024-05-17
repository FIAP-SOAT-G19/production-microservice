const { Given, When, Then } = require('@cucumber/cucumber');
const { DeleteOrderController } = require('../../dist/presentation/controllers/delete-order.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class DeleteOrderUseCaseMock {
  async execute(data) {
    return null;
  }
}

Given('I have a valid order number', function () {
  requestData = 'order-number'
  controller = new DeleteOrderController(new DeleteOrderUseCaseMock());
});

When('I send a DELETE request to {string} with the order number', async function (path) {
  const httpRequest = {
    path,
    method: 'DELETE',
    params: { orderNumber: requestData }
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
});