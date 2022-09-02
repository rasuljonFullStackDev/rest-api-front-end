import React from 'react'
import OrderCrud from '../../componet/adminComponet/OrderCrud'

import Layout from '../../Layout/Layout'

const Order = () => {
  return (
    <Layout content={
      <>
<OrderCrud/>
      </>
    } />
  )
}

export default Order