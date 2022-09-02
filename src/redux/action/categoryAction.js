import { actionType } from "../actionType/actionTypes"


export const categoryAdd = (data)  =>{
    return{
        type:actionType.categoryAdd,
        payload:data
    }
}
export const categoryEdit = (edit)  =>{
    return{
        type:actionType.categoryEdit,
        payload:edit
    }
}
export const categoryDelete = (id)  =>{
    return{
        type:actionType.categoryDelete,
        payload:id
    }
}

export const menuToggle = ()  =>{
    return{
        type:actionType.menu,
    }
}

export const categoryUpdate = ()  =>{
    return{
        type:actionType.categoryUpdate,
    }
}
