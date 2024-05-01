import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
import { makeCreateOrderController } from '../factories/controllers/create-order-controller.factory'
import { makeDeleteOrderController } from '../factories/controllers/delete-order-controller.factory'
import { makeGetAllOrdersController } from '../factories/controllers/get-all-orders-controller.factory'
import { makeGetOrderByNumberController } from '../factories/controllers/get-order-by-number-controller.factory'
import { makeGetOrderStatusController } from '../factories/controllers/get-order-controller.factory'
import { makeUpdateOrderStatusUseCaseController } from '../factories/controllers/update-order-status-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.get('/livenessProbe', expressAdapter(makeLivenessProbeController()))
router.get('/readinessProbe', expressAdapter(makeReadinessProbeController()))

// Orders
router.delete('/orders/:orderNumber', expressAdapter(makeDeleteOrderController()))
router.patch('/orders/:orderNumber', expressAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/orders/:orderNumber', expressAdapter(makeGetOrderByNumberController()))
router.get('/orders/:orderNumber/status', expressAdapter(makeGetOrderStatusController()))
router.get('/orders', expressAdapter(makeGetAllOrdersController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))


export { router }
