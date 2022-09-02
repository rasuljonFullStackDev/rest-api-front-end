import { actionType } from "../actionType/actionTypes"


export const carsAdd = (data)  =>{
    return{
        type:actionType.carsAdd,
        payload:data
    }
}
export const carsEdit = (edit)  =>{
    return{
        type:actionType.carsEdit,
        payload:edit
    }
}
export const carsDelete = (id)  =>{
    return{
        type:actionType.carsDelete,
        payload:id
    }
}

export const menuToggle = ()  =>{
    return{
        type:actionType.menu,
    }
}

export const carsUpdate = ()  =>{
    return{
        type:actionType.carsUpdate,
    }
}
