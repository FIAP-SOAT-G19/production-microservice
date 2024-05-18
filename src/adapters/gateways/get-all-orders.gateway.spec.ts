import { IOrderRepository, GetAllOrdersInput, GetAllOrdersOutput, IGetAllOrdersGateway } from '@/interfaces';
import { GetAllOrdersGateway } from './';
import { mock } from 'jest-mock-extended';

const orderRepository = mock<IOrderRepository>();

describe('GetAllOrdersGateway', () => {
    let sut: IGetAllOrdersGateway;
    let ordersOutput: GetAllOrdersOutput;

    beforeEach(() => {
        sut = new GetAllOrdersGateway(orderRepository);
        ordersOutput = [{
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
        }, {
            orderNumber: 'order2',
            status: 'shipped',
            totalValue: 3000,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            products: [{
                id: 'product2',
                name: 'Product 2',
                category: 'Category 2',
                price: 1500,
                description: 'Description 2',
                image: 'ImageURL2',
                amount: 2
            }],
            client: {
                name: 'Client 2',
                email: "client2@example.com",
                cpf: "cpf2"
            }
        }]
        orderRepository.getAll.mockResolvedValue(ordersOutput);
    });

    describe('getAllOrders', () => {
        it('should return all orders based on the input', async () => {
            const input: GetAllOrdersInput = { status: 'received' };

            await sut.getAllOrders(input);
            expect(orderRepository.getAll).toHaveBeenCalledWith(input);
        });

        it('should return an empty array when no orders match the input', async () => {
            const input: GetAllOrdersInput = { status: 'nonexistent' };
            orderRepository.getAll.mockResolvedValue([]);

            await sut.getAllOrders(input);
            expect(orderRepository.getAll).toHaveBeenCalledWith(input);
        });
    });
});
