import React from 'react'
import CarsCrud from '../../componet/adminComponet/CarsCrud'
import BackTops from '../../componet/Backtops'
import Layout from '../../Layout/Layout'

const Cars = () => {
  return (
    <Layout content={
      <>
      <CarsCrud/>
      <BackTops/>
      </>
    } />
  )
}

export default Cars