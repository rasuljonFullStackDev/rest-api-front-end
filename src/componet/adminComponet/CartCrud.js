import { Button, Form, Input, Modal, Popconfirm, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined,SearchOutlined,CloudDownloadOutlined } from "@ant-design/icons";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  cartDelete,
  cartEdit,
  cartUpdate,
} from "../../redux/action/cartAction";
import Swal from "sweetalert2";
import { load } from "../../redux/action/profileAction";
const CartCrud = () => {
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
  const { cart } = useSelector((state) => state.cartReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const onFinish = (e) => {
    dispatch(load(true));
    if (editAdd) {
      axios
      .put(`/cart/${e.id}/`,  {...e,cart_number:+e.cart_number})
      .then((res) => {
        if (res.status === 200) {
          dispatch(cartEdit(e));
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
        .post("/cart/", {...e,cart_number:+e.cart_number})
        .then((res) => {
          if (res.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Malumot qo`shildi",
            });
            dispatch(cartUpdate());
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
  const editcart = (e) => {
    setEditAdd(true);
    form.setFieldsValue({
      cart_fio: e.cart_fio,
      cart_number: e.cart_number,
      status: e.status,
      id: e.id,
    });
    setVisible(true);
  };
  const deletecart = (id) => {
    dispatch(load(true));
    axios
      .delete(`/cart/${id}`)
      .then((res) => {
        if (res.status === 204) {
          Toast.fire({
            icon: "success",
            title: "Malumot o`chrildi",
          });
          dispatch(cartDelete(id));
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
      title: "Karta egasi",
      dataIndex: "cart_fio",
      key: "cart_fio",
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
        return <SearchOutlined size={64} />;
      },
      onFilter: (value, record) => {
        return record.cart_fio.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Karta raqami",
      dataIndex: "cart_number",
      key: "cart_number",
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
        return String(record.cart_number).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Karta holati",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: 'Active',
          value: 'active',
        },
        {
          text: 'Inactive',
          value: 'inactive',
        },
        {
          text: 'Delete',
          value: 'delete',
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
   
    },
   {
      title: "Activatsiya",
      render: (values) => (
        <div className="crud_btn">
          <Tooltip title="Tahrirlash">
            <Button
              type="primary"
              onClick={() => editcart(values)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Malumotni ochirasizmi"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deletecart(values.id)}
         
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
 table.setAttribute("id", "table-to-xls")
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
        cart qoshish
      </Button>
      <Modal
        title={editAdd ? "cart malumotlarni yangilash" : "cart qoshish"}
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
            name="cart_number"
            rules={[{ required: true, message: "Iltimos Karta raqami kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="Karta raqami" />
          </Form.Item>
          <Form.Item
            name="cart_fio"
            rules={[{ required: true, message: "Iltimos Karta egasi kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="Karta egasi" />
          </Form.Item>
          <Form.Item
            name="status"
            rules={[{ message: "Iltimos sarlavha kiriting!" }]}
            hasFeedback
          >
            <Select
              placeholder="turi"
              style={{
                width: "100%",
              }}
            >
              <Option key="active">active</Option>
              <Option key="inactive">inactive</Option>
              <Option key="delete ">delete </Option>
            </Select>
          </Form.Item>
          <Form.Item name="id" style={{ display: "none" }}>
            <Input placeholder="maoshini" type="hidden" />
          </Form.Item>
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
        loading={cart.length === 0 ? true : false}
        columns={columns}
        dataSource={cart}
        pagination={{
          pageSize: 20,
        }}
        scroll={{
          x: 700,
          y:600
        }}
        rowKey={cart =>cart.id}
      />
    </div>
  );
};

export default CartCrud;
