import React from 'react'
import ProductCrud from '../../componet/adminComponet/ProductCrud'
import Layout from '../../Layout/Layout'

const Product = () => {
  return (
    <Layout content={
      <>
      <ProductCrud/>
      </>
    } />
  )
}

export default Product