import { IOrderRepository, IDeleteOrderGateway } from '@/interfaces';
import { DeleteOrderGateway } from '.';
import { mock } from 'jest-mock-extended'
import { Order } from '@/domain/models/order';

const orderRepository = mock<IOrderRepository>()

describe('DeleteOrderGateway', () => {
    let sut: IDeleteOrderGateway
    let order: Order

    beforeEach(() => {
        sut = new DeleteOrderGateway(orderRepository)
        order = {
            orderNumber: 'anyOrderNumber',
            status: 'received',
            totalValue: 8000,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            products: [{
                id: 'anyProductId',
                name: 'AnyProductName',
                category: 'anyProductCategory',
                price: 2500,
                description: 'anyProductDescription',
                image: 'anyProductImageUrl',
                amount: 1
            }, {
                id: 'anyAnotherProductId',
                name: 'AnyAnotherProductName',
                category: 'anyAnotherProductCategory',
                price: 1000,
                description: 'anyAnotherProductDescription',
                image: 'anyAnotherProductImageUrl',
                amount: 1
            }],
            client: {
                name: 'anyClientName',
                email: "anyEmail@email.com",
                cpf: "anyCPF",
            }
        }
        orderRepository.getByOrderNumber.mockResolvedValue(order)
        orderRepository.delete.mockResolvedValue()
    });

    describe('getOrderByNumber', () => {
        it('should return the order when order number exists', async () => {
            const orderNumber = '123';
            orderRepository.getByOrderNumber.mockResolvedValue(order);

            await sut.getOrderByNumber(orderNumber);
            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
        });

        it('should return null when order number does not exist', async () => {
            const orderNumber = '123';
            orderRepository.getByOrderNumber.mockResolvedValue(null);

            await sut.getOrderByNumber(orderNumber);
            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
        });
    });

    describe('deleteOrder', () => {
        it('should delete the order with the given order number', async () => {
            const orderNumber = '123';
            await sut.deleteOrder(orderNumber);
            expect(orderRepository.delete).toHaveBeenCalledWith(orderNumber);
        });

        it('should throw an error if deletion fails', async () => {
            const orderNumber = '123';
            orderRepository.delete.mockRejectedValue(new Error('Deletion failed'));
            await expect(sut.deleteOrder(orderNumber)).rejects.toThrow('Deletion failed');
        });
    });
  
});
