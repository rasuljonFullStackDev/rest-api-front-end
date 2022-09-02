import {
    Button,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Table,
    Tooltip,
    Pagination
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
    carsDelete,
    carsEdit,
    carsUpdate,
  } from "../../redux/action/carsAction";
  import Swal from "sweetalert2";
  import { load } from "../../redux/action/profileAction";
  import { useEffect } from "react";
  const CarsCrud = () => {
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
    const { cars } = useSelector((state) => state.carsReducer);
    const [form] = Form.useForm();
    const [editAdd, setEditAdd] = useState(false);
    const [visible, setVisible] = useState(false);
    const [edits,setEdits] = useState({});
    const [pagination, setPagination] = useState({
      current: 1,
      page:20,
      pages:()=>{
        return this.current * this.page - this.page, this.current * this.page
      }
    });
    const [file,setFile] = useState({});
    const onFinish = (e) => {
      dispatch(load(true));
      setVisible(false)
      if (editAdd) {
        axios
          .put(`/cars/${e.id}/`,{...e,
            // parent:e.parent_edit===cars.filter(item=>item.id===e.parent)[0].title || '' ? e.parent : e.parent_edit || null
            })
          .then((res) => {
            if (res.status === 200) {
              dispatch(carsEdit({...e,
                // parent:e.parent_edit===cars.filter(item=>item.id===e.parent)[0].title || '' ? e.parent : e.parent_edit || null
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
        let formData = new FormData();
        formData.append('name',e.name);
        formData.append('description',e.description);
        formData.append('price',e.price);
        formData.append('img',file);
        axios
          .post("/cars/", formData)
          .then((res) => {
            if (res.status === 201) {
              Toast.fire({
                icon: "success",
                title: "Malumot qo`shildi",
              });
              dispatch(carsUpdate());
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
    const editcars = (e) => {
      setEdits(e)
      setEditAdd(true);
      form.setFieldsValue({
        title: e.title,
        status: e.status,
        parent: e.parent,
        id: e.id,
        // parent_edit:e.parent===null ? '' :  cars.filter(item=>item.id===e.parent)[0] ? cars.filter(item=>item.id===e.parent)[0].title || '' : ' '
      });
      setVisible(true);
    };
    const pageLoad = (pagination,data) =>{
      if(data.slice(pagination.current * pagination.page - pagination.page, pagination.current * pagination.page).length===1){
        setPagination({
          ...pagination,
          current:pagination.current-1,
        })
      }
    }
    const deletecars = (id) => {
      dispatch(load(true));
      axios
        .delete(`/cars/?id=${id}`)
        .then((res) => {
          if (res.status === 204) {
            Toast.fire({
              icon: "success",
              title: "Malumot o`chrildi",
            });
            dispatch(carsDelete(id));
            dispatch(load(false));
            pageLoad(pagination,cars)
          
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
        title: "cars id",
        render: (e, i) => {
          return e.id;
        },
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Img",
        dataIndex: "img",
        key: "img",
        render: (img) => {
         return <img src={`http://localhost/rest-api-back-end/src/controller${img}`}/>
        },
     
      },
      {
        title: "Name",
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
          return <SearchOutlined size="large" />;
        },
        onFilter: (value, record) => {
          return record.name.toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
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
          return record.price.toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title: "Activatsiya",
        render: (values) => (
          <div className="crud_btn">
            <Tooltip title="Tahrirlash">
              <Button
                type="primary"
                onClick={() => editcars(values)}
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Popconfirm
              title="Malumotni ochirasizmi"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deletecars(values.id)}
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
     
    }, [pagination]);
  
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
          cars qoshish
        </Button>
        <Modal
          title={editAdd ? "cars malumotlarni yangilash" : "cars qoshish"}
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
            layout='vertical'
          >
            
  
          
        
            <Form.Item
              label="Car name "
              name="name"
              rules={[{ required: true, message: "Car name !" }]}
              hasFeedback
            >
              <Input placeholder="car name" />
            </Form.Item>
            <Form.Item
              label="Car price "
              name="price"
              rules={[{ required: true, message: "Car price !" }]}
              hasFeedback
            >
              <Input type='number' placeholder="car price" />
            </Form.Item>
            <Form.Item
              label="Car price "
              name="img"
              rules={[{ required: true, message: "Car price !" }]}
              hasFeedback
              onChange={(e)=>{
                setFile(e.target.files[0])
              }}
            >
              <Input type='file' placeholder="car price" />
            </Form.Item>
            <Form.Item
              label="Car about "
              name="description"
              rules={[{ required: true, message: "Car about!" }]}
              hasFeedback
            >
              <Input.TextArea placeholder="car about" />
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
        <Pagination
          total={cars.length}
          defaultPageSize={20}
         
          current={pagination.current}
          pageSize={20}
          onChange={(e, s) => {
            setPagination({
              ...pagination,
              current:e,
              page:s,
             
            });
          }}
         
        />
        <Table
          loading={cars.length === 0 ? true : false}
          columns={columns}
          dataSource={cars.slice(pagination.current * pagination.page - pagination.page, pagination.current * pagination.page)}
          pagination={false}
          scroll={
            {
            x: 700,
          }
        }
          rowKey={(cars) => cars.id}
        />
          <Pagination
          total={cars.length}
          defaultPageSize={20}
          pageSizeOptions={[20, 30, 40, 50]}
          current={pagination.current}
          pageSize={20}
          onChange={(e, s) => {
            setPagination({
              ...pagination,
              current:e,
              page:s,
             
            });
          }}
         
        />
      </div>
    );
  };
  
  export default CarsCrud;
  