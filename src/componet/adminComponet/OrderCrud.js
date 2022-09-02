import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
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
import Maxsulot from "./Maxsulot";
import Buyurtmalar from "./Buyurtmalar";
import Yuborildi from "./Yuborildi";
const OrderCrud = () => {
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
  const { users } = useSelector((state) => state.usersReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [buyurtma, setBuyurtma] = useState({
    id: [],
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

  // edit
  const editorder = (e) => {
    setEditAdd(true);
    form.setFieldsValue({
      title: e.title,
      status: e.status,
      id: e.id,
    });
    setVisible(true);
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
    onChange: (selectedRowKeys) => {
      setBuyurtma({
        ...buyurtma,
        id: selectedRowKeys,
      });
    },
  };
  let checkStrictly = false;
  // colum
  const columns = [
    {
      title: "Buyurtma raqami",
      render: (e, i) => {
        return <>{e.id}</>;
      },
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Foydalanuvchi",
      dataIndex: "user",
      render: (id) => {
        const { username } = users.filter((val) => val.id === id)[0] || "";
        return (
          <>
            {/* {e.id} */}
            {username}
          </>
        );
      },
    },
    {
      title: "Rasm",
      dataIndex: "photo",
      key: "photo",
      render: (val) => {
        return <img src={val} width="100" height="100" alt="" />;
      },
    },
    {
      title: "Narxi",
      dataIndex: "get_total_price",
      key: "get_total_price",
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
        </div>
      ),
    },
  ];

  const status = (e) => {
    setBuyurtma({
      ...buyurtma,
      status: e,
    });
  };
  const buyurtmaSend = () => {
    if (buyurtma.id.length > 0 && buyurtma.status !== "") {
      dispatch(load(true));
      let res = 0;
      for (let key of buyurtma.id) {
        axios
          .put(`/order/${key}/`, {
            user: key,
            status: buyurtma.status,
          })
          .then((response) => {
            if (response.status === 200) {
              ++res;
            }
            if (res === buyurtma.id.length) {
              Toast.fire({
                icon: "success",
                title: "Malumot qo`shildi",
              });
              dispatch(orderUpdate());
              dispatch(load(false));
              setBuyurtma({
                ...buyurtma,
                status: "",
              });
            } else {
              Toast.fire({
                icon: "warning",
                title: "Malumot o'zgartirishda xatolik tug'ildi",
              });
              dispatch(load(false));
              dispatch(orderUpdate());
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
    } else {
      Toast.fire({
        icon: "error",
        title: "Malumot kiritng",
      });
    }
  };

  const [orderTab, setOrderTab] = useState(false);
  const [tab, setTab] = useState("/");

  const tabFun = (route) => {
    switch (route) {
      case "/": {
        return  <Buyurtmalar/> ;
      }
      case "/1": {
        return <Maxsulot/>;
      }
      case "/2": {
        return <Yuborildi />;
      }
      default:
        break;
    }
  };
  return (
    <div>
      <Button type="primary" size="large" onClick={()=>setTab('/')}>
        Buyurtmalar
      </Button>
      <Button type="primary" size="large" style={{ marginLeft:'10px' }} onClick={()=>setTab('/1')}>
      Maxsulotlar
      </Button>
      <Button type="primary" size="large" style={{ marginLeft:'10px' }} onClick={()=>setTab('/2')}>
      Yuborildi
      </Button>
     
          {tabFun(tab)}
    </div>
  );
};

export default OrderCrud;
