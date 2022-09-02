import React from 'react'
import UsersCrud from '../../componet/adminComponet/UsersCrud'
import Layout from '../../Layout/Layout'

const Users = () => {
  return (
    <Layout content={
      <>
      <UsersCrud/>
      </>
    } />
  )
}

export default Users