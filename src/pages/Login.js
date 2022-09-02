import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
// import axios from 'axios';
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { load, userDetil } from "../redux/action/profileAction";

const Login = () => {
  const dispath = useDispatch();

  const onFinish = (values) => {
    dispath(load(true));
    axios
      .get("/user/")
      .then((res) => {
        console.log(res.data);
        let data = [...res.data];
        if (res.status === 200 && data.length > 0) {
          let res =
            data.filter(
              (item) =>
                item.username === values.username &&
                item.password === window.btoa(values.password)
            ) || [];
          if (res.length === 1) {
            dispath(userDetil({ ...res[0], rules: true }));
            Swal.fire({
              title: "Tabriklayman ",
              text: "Siz shaxsiy profiliga kirdingiz!",
              icon: "success",
              position: "top-end",
              timer: 2000,
              showConfirmButton: false,
            });
            dispath(load(false));
          }else{
            Swal.fire({
                title: "Xatolik",
                text: "Username yoki parol notog'ri kiritlgan!",
                icon: "info",
                position: "top-end",
                timer: 2000,
                showConfirmButton: false,
              });
              dispath(load(false));
          }
        }else
        {
            dispath(load(false));
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
