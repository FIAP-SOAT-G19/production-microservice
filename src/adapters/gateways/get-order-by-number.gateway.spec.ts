import { IOrderRepository, OrderOutput, IGetOrderByNumberGateway } from '@/interfaces';
import { GetOrderByNumberGateway } from './';
import { mock } from 'jest-mock-extended';

const orderRepository = mock<IOrderRepository>();

describe('GetOrderByNumberGateway', () => {
    let sut: IGetOrderByNumberGateway;
    let orderOutput: OrderOutput;

    beforeEach(() => {
        sut = new GetOrderByNumberGateway(orderRepository);
        orderOutput = {
            orderNumber: 'order1',
            status: 'received',
            totalValue: 5000,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            products: [{
                id: 'product1',
                name: 'Product 1',
                category: 'Category 1',
                price: 2500,
                description: 'Description 1',
                image: 'ImageURL1',
                amount: 2
            }],
            client: {
                name: 'Client 1',
                email: "client1@example.com",
                cpf: "cpf1"
            }
        };
        orderRepository.getByOrderNumber.mockResolvedValue(orderOutput);
    });

    describe('getOrderByNumber', () => {
        it('should return the order when order number exists', async () => {
            const orderNumber = 'order1';

            await sut.getOrderByNumber(orderNumber);
            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
        });

        it('should return null when order number does not exist', async () => {
            const orderNumber = 'order2';
            orderRepository.getByOrderNumber.mockResolvedValue(null);

            await sut.getOrderByNumber(orderNumber);
            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
        });
    });
});
