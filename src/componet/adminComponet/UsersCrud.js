import { Button, Form, Input, Modal, Popconfirm, Select, Table, Tooltip, DatePicker, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, SearchOutlined,CloudDownloadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import axios from "axios";
import {
  usersDelete,
  usersEdit,
  usersUpdate,
} from "../../redux/action/usersAction";
import Swal from "sweetalert2";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { load } from "../../redux/action/profileAction";
const UsersCrud = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const { Option } = Select;
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const onFinish = (e) => {
    dispatch(load(true));
    if (editAdd) {
      axios
        .put(`/user/${e.id}/`, {...e,  password:window.btoa(e.password)})
        .then((res) => {
          if (res.status === 200) {
            dispatch(usersEdit(e));
            Toast.fire({
              icon: "success",
              title: "Malumot ozgartirildi",
            });
            dispatch(load(false));
          } else {
            Toast.fire({
              icon: "warning",
              title: "Malumot turida xatolik mavjud",
            });
          }
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err.message,
          });
          dispatch(load(false));
        });

    } else {
      axios
        .post("/user/", {...e,
        password:window.btoa(e.password)
        })
        .then((res) => {
          if (res.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Malumot qo`shildi",
            });
            dispatch(usersUpdate());
            dispatch(load(false));
          } else {
            Toast.fire({
              icon: "warning",
              title: "Malumot turida xatolik mavjud",
            });
          }
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err.message,
          });
          dispatch(load(false));
        });
    }
    setVisible(false);

  };
  // open modal
  const openModal = () => {
    form.resetFields();
    setVisible(true);
    setEditAdd(false)
  };
  // edit
  const editusers = (e) => {
    setEditAdd(true);
    form.setFieldsValue({
      last_login:  moment(e.last_login, 'YYYY/MM/DD'),
      is_superuser: e.is_superuser,
      username: e.username,
      password:  window.atob(e.password),
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      id: e.id,
    });
    setVisible(true);
  };
  const deleteusers = (id) => {
    dispatch(load(true));
    axios
      .delete(`/user/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          Toast.fire({
            icon: "success",
            title: "Malumot o`chrildi",
          });
          dispatch(usersDelete(id));
          dispatch(load(false));
        } else {
          Toast.fire({
            icon: "warning",
            title: "Malumot turida xatolik mavjud",
          });
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.message,
        });
        dispatch(load(false));
      });
    form.resetFields();
    setEditAdd(false)
  };

  // colum
  const columns = [
    {
      title: 'User id',
      render: (e, i) => {
        return e.id
      },
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            placeholder="search"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined size="large" />;
      },
      onFilter: (value, record) => {
        return record.username.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "first_name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            placeholder="search"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined size="large" />;
      },
      onFilter: (value, record) => {
        return record.first_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Familiya",
      dataIndex: "last_name",
      key: "last_name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            placeholder="search"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined size="large" />;
      },
      onFilter: (value, record) => {
        return record.last_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            placeholder="search"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined size="large" />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Daraja",
      dataIndex: "is_superuser",
      key: "is_superuser",
      render:(val)=>{
        return val ? 'admin' : 'user'
      },
      filters: [
        {
          text: "Admin",
          value: true,
        },
        {
          text: "user",
          value: false,
        },
      ],
      onFilter: (value, record) =>{
        return value===record.is_superuser
      },
      filterSearch: true,
    },
    {
      title: "activatsiya",
      render: (values) => (
        <div className="crud_btn">
          <Tooltip title="Tahrirlash">
            <Button
              type="primary"
              onClick={() => editusers(values)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Malumotni ochirasizmi"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteusers(values.id)}

          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>


        </div>
      ),
    },
  ];
  useEffect(() => {
    let table = document.querySelector("table");
    table.setAttribute("id", "table-to-xls");
  }, []);
  return (
    <div>
        <Button
        size="large"
        icon={<CloudDownloadOutlined />}
        className="download-table-xls-button-parent"
      >
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          buttonText=""
          sheet="tablexls"
        />
      </Button>
      <Button type="primary" onClick={openModal}>
        users qoshish
      </Button>
      <Modal
        title={editAdd ? "users malumotlarni yangilash" : "users qoshish"}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          form={form}
        >
          <Form.Item
            name="last_login"
            rules={[{ required: true, message: "Iltimos sarlavha kiriting!" }]}
            hasFeedback
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Iltimos sarlavha kiriting!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Iltimos username kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: "Iltimos first_name kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="first_name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: "Iltimos last_name kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="last_name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Iltimos email kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item name="is_superuser" valuePropName="checked" noStyle>
            <Checkbox>Admin</Checkbox>
          </Form.Item>
          <Form.Item name="id" style={{ display: "none" }}>
            <Input placeholder="maoshini" type="hidden" />
          </Form.Item>
      <br />

      <br />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editAdd ? "Yangilash" : "Qo'shish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <br/>
      <br/>
      <Table
        loading={users.length === 0 ? true : false}
        columns={columns}
        dataSource={users}
        pagination={{
          pageSize: 20,
        }}
        rowKey={users => users.id}
        scroll={{
          x: 700,
          y:600
        }}
      />
    </div>
  );
};

export default UsersCrud;
