import { ReadinessController } from '@/presentation/controllers/probes/readiness.controller'

export const makeReadinessProbeController = (): ReadinessController => {
  return new ReadinessController()
}