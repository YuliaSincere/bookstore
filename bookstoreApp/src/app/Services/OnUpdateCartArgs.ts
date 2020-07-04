import { Guid } from 'guid-typescript';


export interface OnUpdateCartArgs
{
    allowToCheckout: boolean;
    customerId: Guid;
}