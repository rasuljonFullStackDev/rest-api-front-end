import { actionType } from "../actionType/actionTypes"

export const userDetil = (data)  =>{
    return{
        type:actionType.user,
        payload:data
    }
}

export const userLogout = ()  =>{
    return{
        type:actionType.logout,
    }
}
export const load = (load)  =>{
    return{
        type:actionType.load,
        payload:load
    }
}
export const profileAdd = (data)  =>{
    return{
        type:actionType.profileAdd,
        payload:data
    }
}
export const profileEdit = (edit)  =>{
    return{
        type:actionType.profileEdit,
        payload:edit
    }
}
export const profileDelete = (id)  =>{
    return{
        type:actionType.profileDelete,
        payload:id
    }
}



export const profileUpdate = ()  =>{
    return{
        type:actionType.profileUpdate,
    }
}
