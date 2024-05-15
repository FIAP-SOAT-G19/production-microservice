import { Router } from 'express'
import { expressRouteAdapter } from '@/adapters/tools/http/express.adapter'
import { 
    makeDeleteOrderController,
    makeGetAllOrdersController,
    makeGetOrderByNumberController,
    makeUpdateOrderStatusUseCaseController
} from '../factories'

const router = Router()

router.delete('/production/:orderNumber', expressRouteAdapter(makeDeleteOrderController()))
router.patch('/production/:orderNumber', expressRouteAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/production/:orderNumber', expressRouteAdapter(makeGetOrderByNumberController()))
router.get('/production', expressRouteAdapter(makeGetAllOrdersController()))

export { router }
