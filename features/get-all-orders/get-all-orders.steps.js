const { Given, When, Then } = require('@cucumber/cucumber');
const { GetAllOrdersController } = require('../../dist/presentation/controllers/get-all-orders.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let status;

const orders = [
    {
    orderNumber: 'anyOrderNumber',
    status: 'received',
    totalValue: 4500,
    createdAt: '2023-10-12 16:55:27',
    updatedAt: '2023-10-12 17:55:27',
    client: {
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    },
    products: [{
      id: 'anyProductId',
      name: 'anyProductName',
      category: 'anyCategoryProduct',
      price: 1700,
      description: 'anyDescriptionProduct',
      image: 'anyImageProduct',
      amount: 3
    }]
  }
]

class GetAllOrdersUseCaseMock {
  async execute(data) {
    return orders;
  }
}

Given('I have a valid status', function () {
  status = 'received'
  controller = new GetAllOrdersController(new GetAllOrdersUseCaseMock());
});

When('I send a GET request to {string} with the status', async function (path) {
  const httpRequest = {
    path,
    method: 'GET',
    query: { status }
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the orders information', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body[0].orderNumber).to.equal('anyOrderNumber');
  expect(response.body[0].status).to.equal('received');
  expect(response.body[0].createdAt).to.equal('2023-10-12 16:55:27');
  expect(response.body[0].updatedAt).to.equal('2023-10-12 17:55:27');
  expect(response.body[0].client.name).to.equal('anyClientName');
  expect(response.body[0].client.email).to.equal('anyClientEmail');
  expect(response.body[0].client.cpf).to.equal('anyClientCpf');
  expect(response.body[0].products[0].id).to.equal('anyProductId');
  expect(response.body[0].products[0].name).to.equal('anyProductName');
  expect(response.body[0].products[0].category).to.equal('anyCategoryProduct');
  expect(response.body[0].products[0].price).to.equal(1700);
  expect(response.body[0].products[0].description).to.equal('anyDescriptionProduct');
  expect(response.body[0].products[0].image).to.equal('anyImageProduct');
  expect(response.body[0].products[0].amount).to.equal(3);
});