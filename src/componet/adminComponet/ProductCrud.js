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
import { EditOutlined, DeleteOutlined,SearchOutlined,CloudDownloadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import {
  productDelete,
  productEdit,
  productUpdate,
} from "../../redux/action/productAction";
import Swal from "sweetalert2";
import { load } from "../../redux/action/profileAction";
const ProductCrud = () => {
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
  const { product } = useSelector((state) => state.productReducer);
  const { category } = useSelector((state) => state.categoryReducer);
  const [form] = Form.useForm();
  const [editAdd, setEditAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ file,setFile] = useState(null);
  const onFinish = (e) => {
    dispatch(load(true));
    if (editAdd) {
      let forData = new FormData();
      forData.append('category',e.category_edit===category.filter(item=>item.id===+e.category)[0].title || '' ? e.category : e.category_edit )
      forData.append('name',e.name)
      forData.append('description',e.description)
      forData.append('old_price',e.old_price)
      forData.append('new_price',e.new_price)
      forData.append('current_qty',e.current_qty)
      forData.append('status',e.status)
      forData.append('manbasi',e.manbasi)
      forData.append('bonus_qty',e.bonus_qty)
      forData.append('bonus_foiz',e.bonus_foiz)
      if(file){
        forData.append('photo',file || null);
      }
      axios
        .put(`/product/${e.id}/`, forData)
        .then((res) => {
          if (res.status === 200) {
            dispatch(productEdit(e));
            Toast.fire({
              icon: "success",
              title: "Malumot ozgartirildi",
            });
            dispatch(load(false));
            dispatch(productUpdate())
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
      let forData = new FormData();
      forData.append('category',e.category)
      forData.append('name',e.name)
      forData.append('description',e.description)
      forData.append('old_price',e.old_price)
      forData.append('new_price',e.new_price)
      forData.append('current_qty',e.current_qty)
      forData.append('status',e.status)
      forData.append('bonus_qty',e.bonus_qty)
      forData.append('manbasi',e.manbasi)
      forData.append('bonus_foiz',e.bonus_foiz)
      forData.append('photo',file)
      axios
        .post("/product/", forData)
        .then((res) => {
          if (res.status === 201) {
            Toast.fire({
              icon: "success",
              title: "Malumot qo`shildi",
            });
            dispatch(productUpdate());
            dispatch(load(false));
            setFile({})
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
  const editproduct = (e) => {
    setEditAdd(true);
    form.setFieldsValue({
      name: e.name,
      description: e.description,
      old_price: e.old_price,
      bonus_qty: e.bonus_qty,
      bonus_foiz: e.bonus_foiz,
      new_price: e.new_price,
      current_qty: e.current_qty,
      status: e.status,
      manbasi: e.manbasi,
      id: e.id,
      image:e.photo,
      category:e.category,
      category_edit:category.filter(item=>item.id===+e.category)[0].title || ''
    });
    setVisible(true);
  };
  const deleteproduct = (id) => {
    dispatch(load(true));
    axios
      .delete(`/product/${id}`)
      .then((res) => {
        if (res.status === 204) {
          Toast.fire({
            icon: "success",
            title: "Malumot o`chrildi",
          });
          dispatch(productDelete(id));
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
      title: "Maxsulot",
      dataIndex: "name",
      key: "name",
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
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Rasm",
      dataIndex: "photo",
      key: "photo",
      render:(val)=>{
        return <img src={val} width='100'height='100' alt="" />
      }
    },
    {
      title: "Maxsulot haqida",
      dataIndex: "description",
      key: "description",
      render:(val)=>{
        return `${val.slice(0,20)}...`
      }
      ,
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
        return record.description.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Asl narxi",
      dataIndex: "old_price",
      key: "old_price",
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
        return String(record.old_price).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Bonus chegarasi",
      dataIndex: "bonus_qty",
      key: "bonus_qty",
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
        return String(record.bonus_qty).toLowerCase().includes(value.toLowerCase());
      },
      
    },
    {
      title: "Bonus foizi",
      dataIndex: "bonus_foiz",
      key: "bonus_foiz",
      render:(item)=>{
        return item + "%"
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
        return String(record.bonus_foiz).toLowerCase().includes(value.toLowerCase());
      },
      
    },
    {
      title: "Sotuvdagi narxi",
      dataIndex: "new_price",
      key: "new_price",
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
        return String(record.new_price).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Manbasi",
      dataIndex: "manbasi",
      key: "manbasi",
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
        return String(record.manbasi).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Product holati",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: 'active',
          value: 'Active',
        },
        {
          text: 'inactive',
          value: 'Inactive',
        },
        {
          text: 'delete',
          value: 'Delete',
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
              onClick={() => editproduct(values)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Malumotni ochirasizmi"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteproduct(values.id)}
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
        product qoshish
      </Button>
      <Modal
        title={editAdd ? "product malumotlarni yangilash" : "product qoshish"}
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
            name="category"
            rules={[{required: !editAdd, message: "Iltimos Kategoriya nomi kiriting!" }]}
            hasFeedback
            hidden={editAdd}
          >
            <Select
              placeholder="Kategoriya nomi"
              style={{
                width: "100%",
              }}
            >
              {category.map((val, i) => (
                <Option key={val.id}>{val.title}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="category_edit"
            rules={[{required: editAdd, message: "Iltimos Kategoriya nomi kiriting!" }]}
            hasFeedback
            hidden={!editAdd}
          >
            <Select
              placeholder="Kategoriya nomi edit"
              style={{
                width: "100%",
              }}
            >
              {category.map((val, i) => (
                <Option key={val.id}>{val.title}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Iltimos Mahsulot nomi kiriting!" },
            ]}
            hasFeedback
          >
            <Input placeholder="Mahsulot nomi" />
          </Form.Item>
          <Form.Item
            name="manbasi"
            rules={[
              { required: true, message: "Iltimos manbasi nomi kiriting!" },
            ]}
            hasFeedback
          >
            <Input placeholder="Manbasi" />
          </Form.Item>
          <Form.Item
            name="bonus_qty"
            rules={[
              { required: true, message: "Iltimos Bonus chegarasi kiriting!" },
            ]}
            hasFeedback
          >
            <Input placeholder="Bonus chegarasi" type='number' min={0} />
          </Form.Item>
          <Form.Item
            name="bonus_foiz"
            rules={[
              { required: true, message: "Iltimos  Bonus foizi kiriting!" },
            ]}
            hasFeedback
          >
            <Input placeholder=" Bonus foizi" type='number' min={0} />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: false, message: "Iltimos izoh kiriting!" }]}
            hasFeedback
          >
            <Input.TextArea placeholder="Batafsil" />
          </Form.Item>
          <Form.Item
            name="old_price"
            rules={[{ required: true, message: "Iltimos Sotuvdagi narxi kiriting!" }]}
            hasFeedback
          >
            <Input type="number" min={0} placeholder="Sotuvdagi narxi" />
          </Form.Item>
          <Form.Item
            name="new_price"
            rules={[
              { required: true, message: "Iltimos Asl Sotuvdagi narxi kiriting!" },
            ]}
            hasFeedback
          >
            <Input type="number" min={0} placeholder="Asl narxi" />
          </Form.Item>
        
          <Form.Item
            name="photo"
            rules={[{ required: false, message: "Iltimos photo kiriting!" }]}
            hasFeedback
            onChange={
              (e)=>{
              setFile(e.target.files[0])
              }
            }
          >
            <Input type="file" min={0} max={32767} placeholder="photo" />
          </Form.Item>
           {editAdd ? <Form.Item name="image" >
            <Input placeholder="maoshini" style={{ 
              height:'150px',
              objectFit:'cover'
             }} src={form.getFieldValue().image} type="image" />
          </Form.Item> : ""}
          <Form.Item
            name="current_qty"
            rules={[
              { required: false, message: "Iltimos Hozir mavjud kiriting!" },
            ]}
            hasFeedback
          >
            <Input
              type="number"
              min={0}
              max={32767}
              placeholder="Hozir mavjud"
            />
          </Form.Item>
          <Form.Item name="id" style={{ display: "none" }}>
            <input placeholder="maoshini" type="hidden" />
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
        loading={product.length === 0 ? true : false}
        columns={columns}
        dataSource={product}
        pagination={{
          pageSize: 20,
        }}
        rowKey={(product) => product.id}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
        }}
        scroll={{
          x: 700,
          y:600
        }}
      />
    </div>
  );
};

export default ProductCrud;
