import { ISchemaValidator } from '@/interfaces';
import * as schemas from './order.schema';
import { JoiValidatorSchemaAdapter } from './joi-validator.adapter';
import Joi from 'joi';
import MockDate from 'mockdate'

describe('JoiValidatorSchemaAdapter', () => {
  let sut: ISchemaValidator;

  beforeEach(() => {
    sut = new JoiValidatorSchemaAdapter();
  });

  beforeAll(() => {
    MockDate.set(new Date())
  })

  it('should validate the input data successfully', () => {
    const input: ISchemaValidator.Input = {
      schema: 'orderSchema',
      data: {
        orderNumber: '123',
        status: 'received',
        totalValue: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        products: [
          {
            name: 'Product 1',
            category: 'Category 1',
            price: 500,
            image: 'ImageURL1',
            amount: 2
          }
        ],
        client: {
          name: 'Client 1',
          email: 'client1@example.com',
          cpf: '12345678900'
        }
      }
    };

    const result = sut.validate(input);

    expect(result.error).toBeUndefined();
    expect(result.value).toEqual(input.data);
  });

  it('should return validation error for invalid input data', () => {
    const input: ISchemaValidator.Input = {
      schema: 'orderSchema',
      data: {
        orderNumber: '123',
        status: 'received',
        totalValue: 1000,
        createdAt: new Date(),
        updatedAt: null,
        products: [
          {
            id: 'product1',
            name: 'Product 1',
            category: 'Category 1',
            price: 500,
            description: 'Description 1',
            image: 'ImageURL1',
            amount: 2
          }
        ],
        client: {
          name: 'Client 1',
          email: 'client1@example.com',
          cpf: '12345678900'
        }
      }
    };

    const result = sut.validate(input);

    expect(result.error).toBeDefined();
    expect(result.error?.details[0].message).toContain("\"createdAt\" must be a string");
  });

  it('should return validation error when required fields are missing', () => {
    const input: ISchemaValidator.Input = {
      schema: 'orderSchema',
      data: {
        status: 'received',
        totalValue: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        products: [
          {
            id: 'product1',
            name: 'Product 1',
            category: 'Category 1',
            price: 500,
            description: 'Description 1',
            image: 'ImageURL1',
            amount: 2
          }
        ],
        client: {
          name: 'Client 1',
          email: 'client1@example.com',
          cpf: '12345678900'
        }
      }
    };

    const result = sut.validate(input);

    expect(result.error).toBeDefined();
    expect(result.error?.details[0].message).toContain('"orderNumber" is required');
  });
});
