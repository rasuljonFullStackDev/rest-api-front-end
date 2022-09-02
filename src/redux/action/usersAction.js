import { actionType } from "../actionType/actionTypes"


export const usersAdd = (data)  =>{
    return{
        type:actionType.usersAdd,
        payload:data
    }
}
export const usersEdit = (edit)  =>{
    return{
        type:actionType.usersEdit,
        payload:edit
    }
}
export const usersDelete = (id)  =>{
    return{
        type:actionType.usersDelete,
        payload:id
    }
}

export const menuToggle = ()  =>{
    return{
        type:actionType.menu,
    }
}

export const usersUpdate = ()  =>{
    return{
        type:actionType.usersUpdate,
    }
}
