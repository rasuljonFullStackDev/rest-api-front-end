import { Button, Input, Table } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { CloudDownloadOutlined,SearchOutlined } from "@ant-design/icons";
const TopMaxsulot = () => {
  const { product } = useSelector((state) => state.productReducer);
  const { orderItem } = useSelector((state) => state.orderItemReducer);
  const orderItems = orderItem.filter(item=> item.status === "topshirildi" || item.status === "bekor" )
  const top = () => {
    let res = [];
    for (let key of product) {
      let k = orderItems.filter(item=>item.product===key.id) || []
      res.push({
        ...key,
        static:{
          qty:k.reduce((a,b)=>a+b.qty,0),
          data:k,
          price:k.reduce((a,b)=>a+b.qty*b.price,0)
        }
      })
    }
    return res || []
  };
 
  const columns = [
    {
      title: "Nomi",
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
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Sotilgan soni",
      dataIndex: "static",
      key: "static",
      render:(item)=>{
        const {qty} = item;
        return qty
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
        const {qty} = record.static;
        return String(qty).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Narxi",
      dataIndex: "static",
      key: "static",
      render:(item)=>{
        const {price} = item;
        return price
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
        const {price} = record.static;
        return String(price).toLowerCase().includes(value.toLowerCase());
      },
    },
  ];
  useEffect(() => {
    let table = document.querySelector("table");
    table.setAttribute("id", "table-to-xls");
  }, []);
  return <div>
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
          loading={product.length === 0 ? true : false}
          columns={columns}
          dataSource={top().sort((a,b)=> b.static.qty-a.static.qty)}
          pagination={{
            pageSize: 20,
          }}
          rowKey={(product) => product.id}
          scroll={{
            x: 700,
            y:600
          }}
        />

  </div>;
};

export default TopMaxsulot;
