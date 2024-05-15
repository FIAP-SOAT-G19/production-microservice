export interface IQueuePoller {
    processMessagesOnQueue: () => Promise<void>
}
