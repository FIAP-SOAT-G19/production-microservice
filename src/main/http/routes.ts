import { Router } from 'express'
import { expressRouteAdapter } from '@/adapters/tools/http/express.adapter'
import { 
    makeDeleteOrderController,
    makeGetAllOrdersController,
    makeGetOrderByNumberController,
    makeUpdateOrderStatusUseCaseController
} from '../factories'

const router = Router()

// router.get('/healthcheck', expressRouteAdapter(makeHealthcheckController()))
// router.get('/livenessProbe', expressRouteAdapter(makeLivenessProbeController()))
// router.get('/readinessProbe', expressRouteAdapter(makeReadinessProbeController()))

// Orders
router.delete('/orders/:orderNumber', expressRouteAdapter(makeDeleteOrderController()))
router.patch('/orders/:orderNumber', expressRouteAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/orders/:orderNumber', expressRouteAdapter(makeGetOrderByNumberController()))
router.get('/orders', expressRouteAdapter(makeGetAllOrdersController()))

export { router }
