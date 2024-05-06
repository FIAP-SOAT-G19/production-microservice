import { Router } from 'express'
import { expressRouteAdapter } from '../../adapters/tools/http/express.adapter'
import { makeCreateOrderController } from '../factories/controllers/create-order-controller.factory'
import { makeDeleteOrderController } from '../factories/controllers/delete-order-controller.factory'
import { makeGetAllOrdersController } from '../factories/controllers/get-all-orders-controller.factory'
import { makeGetOrderByNumberController } from '../factories/controllers/get-order-by-number-controller.factory'
import { makeUpdateOrderStatusUseCaseController } from '../factories/controllers/update-order-status-controller.factory'

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
