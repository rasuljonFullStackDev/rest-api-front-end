import { BackTop,Button } from 'antd';
import React from 'react';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

const BackTops = () => (
  <BackTop visibilityHeight={100}>
  <Button type='primary' size='large' icon={<VerticalAlignTopOutlined />}/>
</BackTop>
);

export default BackTops;