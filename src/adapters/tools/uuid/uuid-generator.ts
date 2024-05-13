
import { IUUIDGenerator } from '@/interfaces'
import { randomUUID } from 'crypto'

export class UUIDGeneratorAdapter implements IUUIDGenerator {
  generate (): string {
    return randomUUID()
  }
}
