export interface IMessageConsumer {
    execute: () => Promise<void>
}