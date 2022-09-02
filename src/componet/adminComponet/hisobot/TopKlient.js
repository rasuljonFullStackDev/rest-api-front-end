import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { CloudDownloadOutlined,SearchOutlined } from "@ant-design/icons";
const TopKlient = () => {
  const { profile } = useSelector((state) => state.profileReducer);
  const { order } = useSelector((state) => state.orderReducer);
  const top = () => {
    let res = [];
    for (let key of profile) {
      let s = order.filter((item) => item.user === key.id && (item.status === "topshirildi" || item.status === "bekor")) || [];
      res.push({
        ...key,
        static: {
          count: s.length,
          order: s,
        },
      });
    }
    return res || []
  };
  const columns = [
    {
      title: "I.F",
      render: (item) => {
        const {user_fio} =item
        return user_fio
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
        const {user_fio} =record
        return String(user_fio).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Username",
      render: (item) => {
        const {username} =item
        return username
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
        const {username} =record
        return String(username).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Xarid",
      render: (item) => {
        return item.static.count || 0
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
        const {count} =record.static
        return String(count).toLowerCase().includes(value.toLowerCase());
      },
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
      <Table
        loading={profile.length === 0 ? true : false}
        columns={columns}
        dataSource={top().sort((a, b) => b.static.count - a.static.count)}
        pagination={{
          pageSize: 20,
        }}
        rowKey={(profile) => profile.id}
        scroll={{
          x: 700,
          y:600
        }}
      />
    </div>
  );
};

export default TopKlient;
