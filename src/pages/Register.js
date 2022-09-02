import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
// import axios from 'axios';
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { load, userDetil } from "../redux/action/profileAction";

const Register = () => {
  const dispath = useDispatch();
  const [file,setFile] = useState({});
  const onFinish = (values) => {
    let formdata = new FormData();
    formdata.append('username',values.username)
    formdata.append('password',values.password)
    formdata.append('email',values.email)
    formdata.append('img',file)
    axios
      .post("/register/",formdata)
      .then((res) => {
        console.log(res.data);
        const {token} = res.data;
        if(res.status===201 && token){
         dispath( userDetil({...values,token:token,rules:true}))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        size="large"
        onFinish={onFinish}
      >
        <h1>Login</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="file"
            placeholder="Password"
            onChange={(e)=>{
              setFile(e.target.files[0])
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
