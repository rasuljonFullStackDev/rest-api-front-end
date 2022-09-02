import React from 'react'
import ProfileCrud from '../../componet/adminComponet/ProfileCrud'
import Layout from '../../Layout/Layout'

const Profile = () => {
  return (
    <Layout content={
      <>
      <ProfileCrud/>
      </>
    } />
  )
}

export default Profile