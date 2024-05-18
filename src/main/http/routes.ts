import { Router } from 'express'
import { expressRouteAdapter } from '@/adapters/tools/http/express.adapter'
import { 
    makeDeleteOrderController,
    makeGetAllOrdersController,
    makeGetOrderByNumberController,
    makeUpdateOrderStatusUseCaseController
} from '../factories'
import { makeLivenessProbeController, makeReadinessProbeController } from '@/interfaces/'

const router = Router()

router.get('/livenessProbe', expressRouteAdapter(makeLivenessProbeController()))
router.get('/readinessProbe', expressRouteAdapter(makeReadinessProbeController()))


router.delete('/production/:orderNumber', expressRouteAdapter(makeDeleteOrderController()))
router.patch('/production/:orderNumber', expressRouteAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/production/:orderNumber', expressRouteAdapter(makeGetOrderByNumberController()))
router.get('/production', expressRouteAdapter(makeGetAllOrdersController()))

export { router }
