import { actionType } from "../actionType/actionTypes"


export const cartAdd = (data)  =>{
    return{
        type:actionType.cartAdd,
        payload:data
    }
}
export const cartEdit = (edit)  =>{
    return{
        type:actionType.cartEdit,
        payload:edit
    }
}
export const cartDelete = (id)  =>{
    return{
        type:actionType.cartDelete,
        payload:id
    }
}

export const menuToggle = ()  =>{
    return{
        type:actionType.menu,
    }
}

export const cartUpdate = ()  =>{
    return{
        type:actionType.cartUpdate,
    }
}
