import { GetAllOrdersInput, GetAllOrdersOutput, IOrderRepository } from '@/interfaces';
import { DynamoDBClientHelper } from '../dynamodb/dynamodb.helper';
import { Order } from '@/domain/models/order';
import { OrderRepository } from './order.repository';
import { mock } from 'jest-mock-extended';

jest.mock('../dynamodb/dynamodb.helper');

describe('OrderRepository', () => {
    let sut: IOrderRepository;
    let client: jest.Mocked<DynamoDBClientHelper>;
    let order: Order;

    beforeEach(() => {
        client = mock<DynamoDBClientHelper>();
        (DynamoDBClientHelper as jest.Mock).mockImplementation(() => client);
        sut = new OrderRepository();

        order = {
            orderNumber: 'order1',
            status: 'received',
            totalValue: 5000,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            products: [
                {
                    id: 'product1',
                    name: 'Product 1',
                    category: 'Category 1',
                    price: 2500,
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
        };

        client.save.mockResolvedValue();
        client.getByOrderNumber.mockResolvedValue(order);
        client.getAll.mockResolvedValue({ orders: [order] });
        client.updateStatus.mockResolvedValue();
        client.delete.mockResolvedValue();
    });

    describe('save', () => {
        it('should save the order and return the saved order', async () => {
            await sut.save(order);
            expect(client.save).toHaveBeenCalledWith(order);
            expect(client.getByOrderNumber).toHaveBeenCalledWith(order.orderNumber);
        });
    });

    describe('getByOrderNumber', () => {
        it('should return the order when order number exists', async () => {
            await sut.getByOrderNumber(order.orderNumber);

            expect(client.getByOrderNumber).toHaveBeenCalledWith(order.orderNumber);
        });

        it('should return null when order number does not exist', async () => {
            client.getByOrderNumber.mockResolvedValue(null);
            await sut.getByOrderNumber('nonexistentOrderNumber');

            expect(client.getByOrderNumber).toHaveBeenCalledWith('nonexistentOrderNumber');
        });
    });

    describe('getAll', () => {
        it('should return all orders based on the input', async () => {
            const input: GetAllOrdersInput = { status: 'received' };
            const output: GetAllOrdersOutput = [order];

             await sut.getAll(input);

            expect(client.getAll).toHaveBeenCalledWith(input);
        });
    });

    describe('updateStatus', () => {
        it('should update the status of the order and return the updated order', async () => {
            const newStatus = 'shipped';

            await sut.updateStatus(order.orderNumber, newStatus);

            expect(client.updateStatus).toHaveBeenCalledWith(order.orderNumber, newStatus);
            expect(client.getByOrderNumber).toHaveBeenCalledWith(order.orderNumber);
        });

        it('should throw an error if status update fails', async () => {
            const newStatus = 'shipped';
            client.updateStatus.mockRejectedValue(new Error('Update failed'));

            await expect(sut.updateStatus(order.orderNumber, newStatus)).rejects.toThrow('Update failed');
        });
    });

    describe('delete', () => {
        it('should delete the order with the given id', async () => {
            const orderId = 'order1';

            await sut.delete(orderId);

            expect(client.delete).toHaveBeenCalledWith(orderId);
        });

        it('should throw an error if deletion fails', async () => {
            const orderId = 'order1';
            client.delete.mockRejectedValue(new Error('Deletion failed'));

            await expect(sut.delete(orderId)).rejects.toThrow('Deletion failed');
        });
    });
});
