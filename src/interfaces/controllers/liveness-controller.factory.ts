import { LivenessController } from '@/presentation/controllers/probes/liveness.controller'

export const makeLivenessProbeController = (): LivenessController => {
  return new LivenessController()
}