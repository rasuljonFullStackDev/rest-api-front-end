import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tooltip,
  DatePicker,
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
import Moment from "moment";
import {
  orderDate,
  orderDelete,
  orderEdit,
  orderUpdate,
} from "../../redux/action/orderAction";
import Swal from "sweetalert2";
import { load } from "../../redux/action/profileAction";
import { Diogramma } from "./hisobot/Diogramma";
const UmumiyFoyda = () => {
  const { RangePicker } = DatePicker;
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
  const { profile } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);

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
  const [date, setDate] = useState({
    date1: "2022-08-01",
    date2: "2022-08-31",
  });
  const filterDate = (date1, date2, array) => {
console.log('product',array);
    return array.filter(
      (val) =>
      Date.parse(Moment(val.created).format("YYYY-MM-DD")) >=
      Date.parse(Moment(date1).format("YYYY-MM-DD")) &&
    Date.parse(Moment(val.created).format("YYYY-MM-DD")) <=
      Date.parse(Moment(date2).format("YYYY-MM-DD"))
    );

  };
  // colum

  const { product } = useSelector((state) => state.productReducer);

  const data = [
    {
      key: 0,
      m_soni: '',
      kirim: filterDate(date.date1, date.date2, product).reduce(
        (a, b) => a + +b.old_price ,
        0
      ),
      sotildi: filterDate(date.date1, date.date2,  order.filter(
        (val) =>
          val.status === "topshirildi" ||
          val.status === "bekor" 
      ) || []).reduce(
        (a, b) => a + parseInt(b.get_total_price_with_discount),
        0
      ),
      foyda:
        filterDate(date.date1, date.date2,  order.filter(
          (val) =>
            val.status === "topshirildi" ||
            val.status === "bekor" 
        ) || []).reduce(
          (a, b) => a + parseInt(b.get_total_price_with_discount-b.get_total_old_price),
          0
        ) -
        filterDate(date.date1, date.date2,  order.filter(
          (val) =>
            val.status === "topshirildi" ||
            val.status === "bekor" 
        ) || []).reduce(
          (a, b) => a + parseInt(b.get_total_old_price),
          0
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
      <RangePicker
        onChange={(e) => {
          let d = filterDate(e[0], e[1], product);
          setDate({ date1: e[0], date2: e[1] });
          dispatch(orderDate({
            date1: e[0], date2: e[1]
          }))
        }}
      />

      <br />
      <br />
      <Table
        loading={order.length === 0 ? true : false}
        columns={[
          {
            title: "Maxsulot soni",
            dataIndex: "m_soni",
            render:()=>{
              return `${filterDate(date.date1, date.date2, product).length || 0}(${filterDate(date.date1, date.date2, orderItem).reduce(
                (a, b) => a + parseInt(b.qty),
                0
              ) || 0})`
            },
          

          },
          {
            title: "Maxsulot kirm",
            dataIndex: "kirim",
          },
          {
            title: "Sotildi",
            dataIndex: "sotildi",
          },
          {
            title: "Foyda",
            dataIndex: "foyda",
          },
        ]}
        dataSource={data || []}
        pagination={{
          pageSize: 20,
        }}
        rowKey={(order) => order.id}
        scroll={{
          x: 700,
          y:600
        }}
       
      />
      <Diogramma />
    </div>
  );
};

export default UmumiyFoyda;
