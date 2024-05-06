import { 
    PutCommandOutput, 
    GetCommandOutput, 
    QueryCommandOutput, 
    UpdateCommandOutput, 
    DeleteCommandOutput 
} from '@aws-sdk/lib-dynamodb';

export type SaveOrderOutput<T> = Omit<PutCommandOutput, 'Attributes'> & { 
    Attributes: T 
};

export type GetOrderOutput<T> = Omit<GetCommandOutput, 'Item'> & { 
    Item?: T 
}
 
export type FindAllOrdersOutput<T> = Omit<QueryCommandOutput, 'Items'> & {
    Items?: T;
};

export type UpdateOrderOutput<T> = Omit<UpdateCommandOutput, 'Attributes'> & {
    Attributes?: T;
};

export type DeleteOrderOutput<T> = Omit<DeleteCommandOutput, 'Attributes'> & {
    Attributes?: T;
};