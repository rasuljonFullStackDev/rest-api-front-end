import React from 'react'
import CategoryCrud from '../../componet/adminComponet/CategoryCrud'
import Layout from '../../Layout/Layout'

const Category = () => {
  return (
    <Layout content={
      <>
      <CategoryCrud/>
      </>
    } />
  )
}

export default Category