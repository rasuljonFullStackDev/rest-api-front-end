import { actionType } from "../actionType/actionTypes"


export const orderAdd = (data)  =>{
    return{
        type:actionType.orderAdd,
        payload:data
    }
}
export const orderEdit = (edit)  =>{
    return{
        type:actionType.orderEdit,
        payload:edit
    }
}
export const orderDelete = (id)  =>{
    return{
        type:actionType.orderDelete,
        payload:id
    }
}

export const menuToggle = ()  =>{
    return{
        type:actionType.menu,
    }
}

export const orderUpdate = ()  =>{
    return{
        type:actionType.orderUpdate,
    }
}

export const orderDate = (date)  =>{
    return{
        type:actionType.date,
        payload:date
    }
}