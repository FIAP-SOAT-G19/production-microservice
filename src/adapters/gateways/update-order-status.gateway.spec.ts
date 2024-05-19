import { IOrderRepository, OrderOutput, IUpdateOrderStatusGateway, IQueueService } from '@/interfaces';
import { UpdateOrderStatusGateway } from './';
import { mock } from 'jest-mock-extended';

const orderRepository = mock<IOrderRepository>();
const queueService = mock<IQueueService>();

describe('UpdateOrderStatusGateway', () => {
    let sut: IUpdateOrderStatusGateway;
    let orderOutput: OrderOutput;

    beforeEach(() => {
        sut = new UpdateOrderStatusGateway(orderRepository, queueService);
        orderOutput = {
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
                email: "client1@example.com",
                cpf: "cpf1"
            }
        };
        orderRepository.getByOrderNumber.mockResolvedValue(orderOutput);
        orderRepository.updateStatus.mockResolvedValue(orderOutput);
        queueService.sendMessage.mockResolvedValue(true);
    });

    describe('updateStatus', () => {
        it('should update the status of the order and return the updated order', async () => {
            const orderNumber = 'order1';
            const status = 'shipped';

            await sut.updateStatus(orderNumber, status);
            expect(orderRepository.updateStatus).toHaveBeenCalledWith(orderNumber, status);
        });

        it('should throw an error if status update fails', async () => {
            const orderNumber = 'order1';
            const status = 'shipped';
            orderRepository.updateStatus.mockRejectedValue(new Error('Update failed'));

            await expect(sut.updateStatus(orderNumber, status)).rejects.toThrow('Update failed');
        });
    });

    describe('getByOrderNumber', () => {
        it('should return the order when order number exists', async () => {
            const orderNumber = 'order1';

            const result = await sut.getByOrderNumber(orderNumber);

            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
            expect(result).toBe(orderOutput);
        });

        it('should return null when order number does not exist', async () => {
            const orderNumber = 'order2';
            orderRepository.getByOrderNumber.mockResolvedValue(null);

            const result = await sut.getByOrderNumber(orderNumber);

            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
            expect(result).toBeNull();
        });
    });

    describe('sendMessage', () => {
        it('should send a message with the given parameters', async () => {
            const queueName = 'order-queue';
            const input = 'order-data';
            const messageId = 'msg-123';

            await sut.sendMessage(queueName, input, messageId);

            expect(queueService.sendMessage).toHaveBeenCalledWith(queueName, input, messageId, messageId);
        });

        it('should throw an error if message sending fails', async () => {
            const queueName = 'order-queue';
            const input = 'order-data';
            const messageId = 'msg-123';
            queueService.sendMessage.mockRejectedValue(new Error('Message sending failed'));

            await expect(sut.sendMessage(queueName, input, messageId)).rejects.toThrow('Message sending failed');
        });
    });
});
