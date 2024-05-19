import { IOrderRepository, ICreateOrderGateway, IQueueService } from '@/interfaces';
import { Order } from '@/domain/models/order';
import { CreateOrderGateway } from './';
import { mock } from 'jest-mock-extended'

const orderRepository = mock<IOrderRepository>()
const queueService = mock<IQueueService>()

describe('CreateOrderGateway', () => {
    let sut: ICreateOrderGateway
    let order: Order
    
    beforeEach(() => {
        sut = new CreateOrderGateway(orderRepository, queueService)

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
        orderRepository.save.mockResolvedValue(order)
        orderRepository.getByOrderNumber.mockResolvedValue(order)
        queueService.sendMessage.mockResolvedValue(true)

        jest.clearAllMocks()
    });

    describe('saveOrder', () => {
        it('should save the order and return the saved order', async () => {
            await sut.saveOrder(order);
            expect(orderRepository.save).toHaveBeenCalledWith(order);
        });
    });

    describe('getOrderByNumber', () => {
        it('should return the order when order number exists', async () => {
            await sut.getOrderByNumber('anyOrderNumber');
            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith('anyOrderNumber');
        });

        it('should return null when order number does not exist', async () => {
            const orderNumber = '123';
            orderRepository.getByOrderNumber.mockResolvedValue(null);

            await sut.getOrderByNumber(orderNumber);
            expect(orderRepository.getByOrderNumber).toHaveBeenCalledWith(orderNumber);
        });
    });

    describe('sendMessage', () => {
        it('should send a message and return true', async () => {
            const queueName = 'order-queue';
            const input = 'order-data';
            const messageId = 'msg-123';
            queueService.sendMessage.mockResolvedValue(true);

            await sut.sendMessage(queueName, input, messageId);
            expect(queueService.sendMessage).toHaveBeenCalledWith(queueName, input, messageId, messageId);
        });

        it('should return false when message sending fails', async () => {
            const queueName = 'order-queue';
            const input = 'order-data';
            const messageId = 'msg-123';
            queueService.sendMessage.mockResolvedValue(false);

            await sut.sendMessage(queueName, input, messageId);
            expect(queueService.sendMessage).toHaveBeenCalledWith(queueName, input, messageId, messageId);
        });
    });
});
