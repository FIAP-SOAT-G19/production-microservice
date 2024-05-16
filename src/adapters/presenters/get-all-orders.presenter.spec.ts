import { OrderStatus } from '@/domain/models/order'
import { GetAllOrdersPresenter } from './get-all-orders.presenter'
import { OrderOutput, GetAllOrdersOutput } from '@/interfaces'

const defaultOrderInput: OrderOutput = {
    orderNumber: 'anyOrderNumber',
    status: 'received',
    totalValue: 10000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
        email: 'anyClientEmail',
        cpf: 'anyClientCpf'
    }
}

describe('GetAllOrdersPresenter', () => {
  let sut: GetAllOrdersPresenter

  beforeAll(() => {
    sut = new GetAllOrdersPresenter()
  })

  test('should filter by createdAt date and ordenate by status if date filter is sent', async () => {
    const orderInput: GetAllOrdersOutput = [{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-11T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-12T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-13T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-12T12:00:00.000Z'
    }]
    
    const output = sut.createOrdenation(orderInput, { 
        createdAtInitialDate: '2024-01-11', 
        createdAtEndDate: '2024-01-13'  
    })

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-12T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-11T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-12T12:00:00.000Z'
    }])
  })

  test('should filter by createdAt date if filters are sent', async () => {
    const orderInput: GetAllOrdersOutput = [{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-11T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-12T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-13T12:00:00.000Z'
    }]
    
    const output = sut.createOrdenation(orderInput, { 
        createdAtInitialDate: '2024-01-11', 
        createdAtEndDate: '2024-01-13',
        status: OrderStatus.RECEIVED
    })

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-11T12:00:00.000Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-12T12:00:00.000Z'
    }])
  })

  test('should create ordenation for orders by status following the rule: prepared - inPreparation - received if no filter is sent', async () => {
    const orderInput: GetAllOrdersOutput = [{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION
    }]
    
    const output = sut.createOrdenation(orderInput, {})

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.PREPARED
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED
    }])
  })

  test('should create ordenation for orders by status following the rule: prepared - inPreparation - received, and by createdAt date', async () => {
    const orderInput: GetAllOrdersOutput = [{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-11T12:00:00.166Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        createdAt: '2024-01-11T12:00:00.168Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        createdAt: '2024-01-11T12:00:00.164Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.169Z'
    }]
    
    const output = sut.createOrdenation(orderInput, {})

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        createdAt: '2024-01-11T12:00:00.164Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        createdAt: '2024-01-11T12:00:00.168Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.169Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        createdAt: '2024-01-11T12:00:00.166Z'
    }])
  })

  test('should create ordenation for orders by status following the rule: prepared - inPreparation - received, and by createdAt date', async () => {
    const orderInput: GetAllOrdersOutput = [{
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.166Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.164Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.165Z'
    }]
    
    const output = sut.createOrdenation(orderInput, {})

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.164Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.165Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        createdAt: '2024-01-11T12:00:00.166Z'
    }])
  })

  test('should create ordenation by createdAt date if there are other status and status filter is sent', async () => {
    const orderInput: GetAllOrdersOutput = [{
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        createdAt: '2024-01-11T12:00:00.166Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        createdAt: '2024-01-11T12:00:00.164Z'
    }]
    
    const output = sut.createOrdenation(orderInput, { status: OrderStatus.FINALIZED })

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        createdAt: '2024-01-11T12:00:00.164Z'
    }, {
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        createdAt: '2024-01-11T12:00:00.166Z'
    }])
  })

  test('should return null if input is null, udefined or empty', async () => {
    const output1 = sut.createOrdenation(null, {})
    expect(output1).toEqual(null)

    const output2 = sut.createOrdenation(undefined as any, {})
    expect(output2).toEqual(null)

    const output3 = sut.createOrdenation([], {})
    expect(output3).toEqual(null)
  })


})
