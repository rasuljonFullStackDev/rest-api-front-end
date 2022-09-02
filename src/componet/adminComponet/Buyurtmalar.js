import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  CloudDownloadOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import {
  orderDelete,
  orderEdit,
  orderUpdate,
} from "../../redux/action/orderAction";
import Swal from "sweetalert2";
import { load } from "../../redux/action/profileAction";
import { orderItemUpdate } from "../../redux/action/orderItemAction";
const Buyurtmalar = () => {
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
  const { order } = useSelector((state) => state.orderReducer);
  const { orderItem } = useSelector((state) => state.orderItemReducer);
  const { product } = useSelector((state) => state.productReducer);
  const { users } = useSelector((state) => state.usersReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [buyurtma, setBuyurtma] = useState({
    id: null,
    user: [],
    status: "",
  });
  const onFinish = (e) => {
    dispatch(load(true));
    if (editAdd) {
      axios
        .put(`/order/${e.id}/`, e)
        .then((res) => {
          if (res.status === 201) {
            dispatch(orderEdit(e));
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
        .post("/order/", e)
        .then((res) => {
          if (res.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Malumot qo`shildi",
            });
            dispatch(orderUpdate());
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

  const deleteorder = (id) => {
    dispatch(load(true));
    axios
      .delete(`/order/${id}`)
      .then((res) => {
        if (res.status === 204) {
          Toast.fire({
            icon: "success",
            title: "Malumot o`chrildi",
          });
          dispatch(orderDelete(id));
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
    setEditAdd(false);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, res) => {
      console.log(res);
      setBuyurtma({
        ...buyurtma,
        id: selectedRowKeys,
        user: res,
      });
    },
  };
  let checkStrictly = false;
  // colum
  const buyurtmaSend = async (id) => {
    dispatch(load(true));
    let itemOrder = 0;
    const data = orderItem.filter((item) => item.order === id.id);
    if(buyurtma.id!==null,buyurtma.status!==''){
      for (let key of data) {
        let res = await axios.put("/orderitem/" + key.id + "/", {
          ...key,
          status: buyurtma.status,
        });
        console.log(res);
        if (res.status === 200) {
          ++itemOrder;
          console.log(itemOrder);
          console.log(data.length);
          if (itemOrder === data.length) {
            let ress = await axios.put("/order/" + id.id + "/", {
              user: id.user,
              status: buyurtma.status,
            });
            if (ress.status === 200) {
              dispatch(load(false));
              dispatch(orderUpdate());
              dispatch(orderItemUpdate());
              setBuyurtma({
                id: null,
                user: [],
                status: "",
              });
              Toast.fire({
                icon: "success",
                title: "Malumot yuborildi",
              });
            } else {
              Toast.fire({
                icon: "warning",
                title: "Malumot o'zgartirishda xatolik tug'ildi",
              });
              dispatch(load(false));
              dispatch(orderUpdate());
              dispatch(orderItemUpdate());
              setBuyurtma({
                id: null,
                user: [],
                status: "",
              });
            }
          }
        } else {
          dispatch(load(false));
          dispatch(orderUpdate());
          dispatch(orderItemUpdate());
          setBuyurtma({
            id: null,
            user: [],
            status: "",
          });
          Toast.fire({
            icon: "warning",
            title: "Malumot o'zgartirishda xatolik tug'ildi qayta junating",
          });
        }
      }
    }else{
      Toast.fire({
        icon: "error",
        title: "Malumot tanlang!",
      });
      dispatch(load(false));
    }
  };
  const { profile } = useSelector((state) => state.profileReducer);
  const columns = [
    {
      title: "Buyurtma raqami",
      render: (e, i) => {
        return <>{e.id}</>;
      },
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "To'lov",
      dataIndex:'photo',
      render: (img) => {
        return <img style={{ width:"100px",height:'100px' }} src={img} alt="rasm toplimadi"/>;
      },
    },
    {
      title: "Foydalanuvchi",
      dataIndex: "user",
      render: (id) => {
        const { username } = profile.filter((val) => val.id === id)[0] || "";
        return <>{username}</>;
      },
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
        const { username } =
          users.filter((val) => val.id === record.id)[0] || "";
        return String(username).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Narxi",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        const { price_with_discount } =
          orderItem.filter((item) => item.order === id)[0] || {};
        return price_with_discount;
      },
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
        const { price_with_discount } =
          orderItem.filter((item) => item.order === record.id)[0] || {};
        return String(price_with_discount)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Buyurtma holati",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Qabul qilindi",
          value: "qabul_qilindi",
        },
        {
          text: "To`landi",
          value: "tulandi",
        },
        {
          text: "Yuborildi",
          value: "yuborildi",
        },
        {
          text: "Topshirildi",
          value: "topshirildi",
        },
        {
          text: "Bekor qilindi",
          value: "bekor",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },

    {
      title: "Activatsiya",
      render: (values) => (
        <div className="crud_btn">
          <Popconfirm
            title="Malumotni ochirasizmi"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteorder(values.id)}
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Select
            placeholder="turi"
            style={{
              margin: " 0 5px",
              width: "150px",
            }}
            onChange={(e) => status(values.id, e)}
            value={values.id === buyurtma.id ? buyurtma.status : ""}
          >
            <Option key="qabul_qilindi">Qabul qilindi</Option>
            <Option key="tulandi">Tulandi</Option>
            <Option key="yuborildi">Yuborildi</Option>
            <Option key="topshirildi">Topshirildi</Option>
            <Option key="bekor">Bekor</Option>
          </Select>
          <Button type="primary" onClick={() => buyurtmaSend(values)}>
            <SendOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const status = (id, e) => {
    setBuyurtma({
      ...buyurtma,
      id: id,
      status: e,
    });
  };

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

      <Modal
        title={editAdd ? "order malumotlarni yangilash" : "order qoshish"}
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
            name="title"
            rules={[{ required: true, message: "Iltimos sarlavha kiriting!" }]}
            hasFeedback
          >
            <Input placeholder="user" />
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
              <Option values="active">active</Option>
              <Option values="inactive">inactive</Option>
              <Option values="delete ">delete </Option>
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
      <br />
      <br />
      <Table
        loading={order.length === 0 ? true : false}
        columns={columns}
        dataSource={order.filter(
          (item) => item.status === "tulandi" || item.status === "qabul_qilindi"
        )}
        pagination={{
          pageSize: 20,
        }}
        rowKey={(order) => order.id}
        scroll={{
          x: 700,
          y: 600,
        }}
        expandable={{
          expandedRowRender: (record) => {
            const data =
              orderItem.filter((item) => item.order === record.id) || [];
            const products = product;
            console.log();
            return (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nomi</th>
                      <th>Soni</th>
                      <th>Bonus foiz</th>
                      <th>Asl narxi</th>
                      <th>Sotuv narxi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      (
                        {
                          bonus_foiz,
                          bonus_qty,
                          product,
                          qty,
                          price_with_discount,
                        },
                        i
                      ) => {
                        const { name, new_price, old_price } =
                          products.filter((item) => item.id === +product)[0] ||
                          {};
                        console.log(name);

                        return (
                          <tr key={i}>
                            <td> {i + 1} </td>
                            <td> {name} </td>
                            <td> {qty} </td>
                            <td> {bonus_foiz} </td>
                            <td> {new_price} </td>
                            <td> {price_with_discount} </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </>
            );
          },
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </div>
  );
};

export default Buyurtmalar;
