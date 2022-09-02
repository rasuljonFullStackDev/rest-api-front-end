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
  SearchOutlined,
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
import UmumiyFoyda from "./UmumiyFoyda";
import { Diogramma } from "./hisobot/Diogramma";
const UmuiyFoyda1 = () => {
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
  const { users } = useSelector((state) => state.usersReducer);
  const { orderItem } = useSelector((state) => state.orderItemReducer);
  const { Option } = Select;
  const { product } = useSelector((state) => state.productReducer);
  const { profile } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);

  // open modal
  const openModal = () => {
    form.resetFields();
    setVisible(true);
    setEditAdd(false);
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

  // colum
  const columns = [
    {
      title: "Buyurtma raqami",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return id;
      },
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
        const { user_fio } = profile.filter((val) => val.id === id)[0] || "";
        return (
          <>
            {/* {e.id} */}
            {user_fio}
          </>
        );
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
        const { user_fio } = profile.filter((val) => val.id === record.user)[0] || "";
        return String(user_fio).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Asl narxi",
      dataIndex: "get_total_old_price",
      key: "get_total_old_price",
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
        return String(record.get_total_old_price).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Sotilgan narxi",
      dataIndex: "get_total_price",
      key: "get_total_price",
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
        return String(record.get_total_price).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Foyda",
      render: (id) => {
        const { get_total_old_price, get_total_price_with_discount } = id;
        return <>{get_total_price_with_discount-get_total_old_price}</>;
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
        const { get_total_price_with_discount, get_total_old_price } = record;
        return String(get_total_price_with_discount - get_total_old_price).toLowerCase().includes(value.toLowerCase());
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
  ];
  const [hisobot, setHisobot] = useState(false);
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
      <Table
        loading={order.length === 0 ? true : false}
        columns={columns}
        dataSource={
          order.filter(
            (val) =>
              val.status === "topshirildi" ||
              val.status === "bekor" 
          ) || []
        }
        pagination={{
          pageSize: 5,
        }}
        rowKey={(order) => order.id}
        scroll={{
          x: 700,
          y:600
        }}
        expandable={{
          expandedRowRender: (record) => {
            const data =
              orderItem.filter((item) => item.order === record.id ) || [];
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
                      ({
                        bonus_foiz,
                        bonus_qty,
                        product,
                        qty,
                        price_with_discount
                      },i) => {
                        const { name,new_price,old_price} =
                          products.filter((item) => item.id === +product)[0]|| {};
                          console.log(name);

                        return (
                          <tr key={i}>
                            <td> {i+1} </td>
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

export default UmuiyFoyda1;
