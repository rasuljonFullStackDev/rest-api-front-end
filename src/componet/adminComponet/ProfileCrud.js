import { Badge, Button, Form, Input, Modal, Popconfirm, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, DeleteOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import {
    profileDelete,
    profileEdit,
    profileUpdate,
} from "../../redux/action/profileAction";
import Swal from "sweetalert2";
import { load } from "../../redux/action/profileAction";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const ProfileCrud = () => {
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
    const { profile } = useSelector((state) => state.profileReducer);
    const [form] = Form.useForm();
    const [editAdd, setEditAdd] = useState(false);
    const [visible, setVisible] = useState(false);
    const onFinish = (e) => {
        dispatch(load(true));
        if (editAdd) {
            axios
                .put(`/profile/${e.id}/`, e)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(profileEdit(e));
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
                .post("/profile/", e)
                .then((res) => {
                    if (res.status === 201) {
                        Toast.fire({
                            icon: "success",
                            title: "Malumot qo`shildi",
                        });
                        dispatch(profileUpdate());
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
    const editprofile = (e) => {
        setEditAdd(true);
        form.setFieldsValue({
            title: e.title,
            status: e.status,
            id: e.id,
        });
        setVisible(true);
    };
    const deleteprofile = (id) => {
        dispatch(load(true));
        axios
            .delete(`/profile/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    Toast.fire({
                        icon: "success",
                        title: "Malumot o`chrildi",
                    });
                    dispatch(profileDelete(id));
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
            title: 'profile id',
            render: (e, i) => {
                return e.id
            },
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "F.I",
            dataIndex: "user_fio",
            key: "user_fio",
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
                return String(record.user_fio).toLowerCase().includes(value.toLowerCase());
              },
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
                return String(record.username).toLowerCase().includes(value.toLowerCase());
              },
        },
        {
            title: "Telefon",
            render: (val) => {
                const { phone_number, phone_number1 } = val || '';
                return <>
                    <Badge status="success" size="large" text={phone_number} />
                    <br />
                    <Badge status="success" size="large" text={phone_number1} />
                </>
            }

        },
        {
            title: "Manzil",
            dataIndex: "address",
            key: "address",
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
                return String(record.address).toLowerCase().includes(value.toLowerCase());
              },
        },
        {
            title: "Activatsiya",
            render: (values) => (
                <div className="crud_btn">
                    {/* <Tooltip title="Tahrirlash">
                        <Button
                            type="primary"
                            onClick={() => editprofile(values)}
                            icon={<EditOutlined />}
                        />
                    </Tooltip> */}
                    <Popconfirm
                        title="Malumotni ochirasizmi"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteprofile(values.id)}

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
            <Modal
                title={editAdd ? "profile malumotlarni yangilash" : "profile qoshish"}
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
                        name="parent"
                        rules={[{ message: "Iltimos sarlavha kiriting!" }]}
                        hasFeedback
                    >
                        <Select
                            placeholder="catogory"
                            style={{
                                width: "100%",
                            }}
                        >
                            {
                                profile.map(val => (
                                    <Option key={val.id}>{val.title}</Option>
                                ))
                            }
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
                loading={profile.length === 0 ? true : false}
                columns={columns}
                dataSource={profile}
                pagination={{
                    pageSize: 20,
                }}
                scroll={{
                    x: 700,
                    y:600
                }}
                rowKey={profile => profile.id}
            />
        </div>
    );
};

export default ProfileCrud;
