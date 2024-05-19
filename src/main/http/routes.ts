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


router.delete('/productionOrder/:orderNumber', expressRouteAdapter(makeDeleteOrderController()))
router.patch('/productionOrder/:orderNumber', expressRouteAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/productionOrder/:orderNumber', expressRouteAdapter(makeGetOrderByNumberController()))
router.get('/productionOrder', expressRouteAdapter(makeGetAllOrdersController()))

export { router }
