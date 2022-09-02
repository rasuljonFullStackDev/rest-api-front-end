import React from 'react'
import CartCrud from '../../componet/adminComponet/CartCrud'
import Layout from '../../Layout/Layout'

const Cart = () => {
  return (
    <Layout content={
      <>
      <CartCrud/>
      </>
    } />
  )
}

export default Cart