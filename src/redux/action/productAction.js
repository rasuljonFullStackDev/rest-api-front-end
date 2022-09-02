import { actionType } from "../actionType/actionTypes"


export const productAdd = (data)  =>{
    return{
        type:actionType.productAdd,
        payload:data
    }
}
export const productEdit = (edit)  =>{
    return{
        type:actionType.productEdit,
        payload:edit
    }
}
export const productDelete = (id)  =>{
    return{
        type:actionType.productDelete,
        payload:id
    }
}

export const menuToggle = ()  =>{
    return{
        type:actionType.menu,
    }
}
export const productUpdate = ()  =>{
    return{
        type:actionType.productUpdate,
    }
}
