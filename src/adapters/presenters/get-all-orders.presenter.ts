import { IGetAllOrdersPresenter, GetAllOrdersOutput, IGetAllOrdersUseCase } from '@/interfaces'
import { OrderStatus, Order } from '@/domain/models/order'

export class GetAllOrdersPresenter implements IGetAllOrdersPresenter {

  createOrdenation(orders: GetAllOrdersOutput, filter: IGetAllOrdersUseCase.Input): GetAllOrdersOutput {
    const { status, createdAtInitialDate, createdAtEndDate } = filter
    
    if (orders?.length) {
      const result: Order[] = []
      let ordersToOrdenate = orders

      if (createdAtInitialDate && createdAtEndDate) {
        const filteredOrders = orders.filter(order => { 
          const orderCreatedAt = new Date(order.createdAt)
          return (orderCreatedAt > new Date(createdAtInitialDate) && orderCreatedAt < new Date(createdAtEndDate))
        })
        ordersToOrdenate = filteredOrders
      }

      if (!status) {
        const preparedOrders = ordersToOrdenate.filter(order => { return order?.status === OrderStatus.PREPARED })
        const inPreparationOrders = ordersToOrdenate.filter(order => { return order?.status === OrderStatus.IN_PREPARATION })
        const receivedOrders = ordersToOrdenate.filter(order => { return order?.status === OrderStatus.RECEIVED })

        const ordenatedPreparedOrders = preparedOrders.length ? this.sortByDate(preparedOrders) : []
        const ordenatedInPreparationOrders = inPreparationOrders.length ? this.sortByDate(inPreparationOrders) : []
        const ordenatedReceivedOrders = receivedOrders.length ? this.sortByDate(receivedOrders) : []

        result.push(...ordenatedPreparedOrders, ...ordenatedInPreparationOrders, ...ordenatedReceivedOrders)

      } else {
        const ordenatedOrders = this.sortByDate(ordersToOrdenate)
        result.push(...ordenatedOrders)
      }
      return result
    }

    return null
  }

  private sortByDate(orders: Order[]): Order[] {
    return orders.sort(function (currentItem, nextItem) {
      const currentItemInMs = new Date(currentItem?.createdAt).valueOf() || 0
      const nextItemInMs = new Date(nextItem?.createdAt).valueOf() || 0

      return currentItemInMs - nextItemInMs
    })
  }
}
