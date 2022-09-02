import { actionType } from "../actionType/actionTypes"


export const orderItemAdd = (data)  =>{
    return{
        type:actionType.orderItemAdd,
        payload:data
    }
}


export const orderItemUpdate = ()  =>{
    return{
        type:actionType.orderItemUpdate,
    }
}
