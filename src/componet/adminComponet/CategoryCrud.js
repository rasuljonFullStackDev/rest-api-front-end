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
import React, { useRef, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import {
  categoryDelete,
  categoryEdit,
  categoryUpdate,
} from "../../redux/action/categoryAction";
import Swal from "sweetalert2";
import { load } from "../../redux/action/profileAction";
import { useEffect } from "react";
const CategoryCrud = () => {
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
  const { category } = useSelector((state) => state.categoryReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [edits,setEdits] = useState({});
  const onFinish = (e) => {
    dispatch(load(true));
    if (editAdd) {
      axios
        .put(`/category/${e.id}/`,{...e,
          parent:e.parent_edit===category.filter(item=>item.id===e.parent)[0].title || '' ? e.parent : e.parent_edit || null
          })
        .then((res) => {
          if (res.status === 200) {
            dispatch(categoryEdit({...e,
              parent:e.parent_edit===category.filter(item=>item.id===e.parent)[0].title || '' ? e.parent : e.parent_edit || null
              }));
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
    } 
    else {
      axios
        .post("/category/", { ...e, parent: e.parent ?? null })
        .then((res) => {
          if (res.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Malumot qo`shildi",
            });
            dispatch(categoryUpdate());
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
  const editcategory = (e) => {
    setEdits(e)
    setEditAdd(true);
    form.setFieldsValue({
      title: e.title,
      status: e.status,
      parent: e.parent,
      id: e.id,
      parent_edit:e.parent===null ? '' :  category.filter(item=>item.id===e.parent)[0] ? category.filter(item=>item.id===e.parent)[0].title || '' : ' '
    });
    setVisible(true);
  };
  const deletecategory = (id) => {
    dispatch(load(true));
    axios
      .delete(`/category/${id}`)
      .then((res) => {
        if (res.status === 204) {
          Toast.fire({
            icon: "success",
            title: "Malumot o`chrildi",
          });
          dispatch(categoryDelete(id));
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
      title: "Category id",
      render: (e, i) => {
        return e.id;
      },
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Category parent",
      dataIndex: "parent",
      key: "parent",
      render: (val) => {
        const {title} = category.filter(item=>item.id===+val)[0] || 'mavjud emas'
        return title  || 'mavjud emas'
      },
   
    },
    {
      title: "Category",
      dataIndex: "title",
      key: "title",
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
        return record.title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Category holati",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "active",
          value: "active",
        },
        {
          text: "inactive",
          value: "inactive",
        },
        {
          text: "delete",
          value: "delete",
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
              onClick={() => editcategory(values)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Malumotni ochirasizmi"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deletecategory(values.id)}
          >
            <Button type="danger" icon={<DeleteOutlined />} />
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
        category qoshish
      </Button>
      <Modal
        title={editAdd ? "category malumotlarni yangilash" : "category qoshish"}
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
            name="parent_edit"
            rules={[{ required: false,message: "Iltimos parent kiriting!" }]}
            hasFeedback
            hidden={!editAdd}
          >
            <Select
              placeholder="catogory edit"
              style={{
                width: "100%",
              }}
            >
              {category.map((val) => (
                <Option key={`${val.id}`}>{val.title}</Option>
              ))}
            </Select>
          </Form.Item> 
         
           <Form.Item
            name="parent"
            rules={[{ required: false,message: "Iltimos parent kiriting!" }]}
            hasFeedback

            hidden={editAdd}
          >
            <Select
              placeholder="catogory"
              style={{
                width: "100%",
              }}
            >
              {category.map((val) => (
                <Option key={`${val.id}`}>{val.title}</Option>
              ))}
            </Select>
          </Form.Item>
        
      
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
              <Option key="active">active</Option>
              <Option key="inactive">inactive</Option>
              <Option key="delete">delete </Option>
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
        loading={category.length === 0 ? true : false}
        columns={columns}
        dataSource={category}
        pagination={{
          pageSize: 20,
        }}
        scroll={{
          x: 700,
          y:600
        }}
        rowKey={(category) => category.id}
      />
    </div>
  );
};

export default CategoryCrud;
