import {
    Button,

    Table,
    DatePicker,
    Input,
  } from "antd";
  import React, { useEffect, useState } from "react";
  import { CloudDownloadOutlined ,SearchOutlined} from "@ant-design/icons";
  import { useSelector, useDispatch } from "react-redux";
  import ReactHTMLTableToExcel from "react-html-table-to-excel";

  import Moment from "moment";
import { orderDate } from "../../redux/action/orderAction";

  const Maxsulot = () => {
    const { RangePicker } = DatePicker;
 


    
    const { order,date } = useSelector((state) => state.orderReducer);
    const { orderItem } = useSelector((state) => state.orderItemReducer);
 
    const { product } = useSelector((state) => state.productReducer);
   
    const dispatch = useDispatch();
    
   
 
    const filterDate = (date1, date2, array) => {
      let kirim = array.filter(
        (val) =>
        Date.parse(Moment(val.created).format("YYYY-MM-DD")) >=
      Date.parse(Moment(date1).format("YYYY-MM-DD")) &&
    Date.parse(Moment(val.created).format("YYYY-MM-DD")) <=
      Date.parse(Moment(date2).format("YYYY-MM-DD"))
      );
      return kirim;
    };
    const columns = [
      {
        title:'Maxsulot nomi',
        dataIndex:'product',
        render:(id)=>{
          const {name} = product.filter(item=>item.id===id)[0] || ''
          return name
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
          const {name} = product.filter(item=>item.id===record.product)[0] || ''
          return String(name).toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title:'Soni',
        render:(qty)=>{
          let k = qty.res.reduce((a,b)=>a+b.qty,0)
          return k
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
          let k = record.res.reduce((a,b)=>a+b.qty,0)
          return String(k).toLowerCase().includes(value.toLowerCase());
        },
      },
     
      {
        title:'Asl Narxi',
        render:(data)=>{
          const {qty,old_price} = data;
          return <>{old_price}</>
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
          let k = record.res.reduce((a,b)=>a+b.qty*b.price,0)
          return String(k).toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title:'Sotuv Narxi',
        render:(data)=>{
          const {qty,price} = data;
          return <>{price}</>
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
          let k = record.res.reduce((a,b)=>a+b.qty*b.price,0)
          return String(k).toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title:'Sotilgan narxi',
        dataIndex:'price_with_discount',
       key:'price_with_discount'
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
          let k = record.res.reduce((a,b)=>a+b.qty,0)
          return String(k).toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        title:'Foyda',
        render:(data)=>{
          const {price_with_discount,price,qty,old_price} = data
          // let k = qty.res.reduce((a,b)=>a+b.qty*b.price,0)
          // let k1 = qty.res.reduce((a,b)=>a+b.qty*b.old_price,0)
          return price_with_discount - qty*old_price
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
          let k = record.res.reduce((a,b)=>a+b.qty*b.price,0)
          let k1 = record.res.reduce((a,b)=>a+b.qty*b.old_price,0)
          return String(k-k1).toLowerCase().includes(value.toLowerCase());
        },
      },
    ];
    useEffect(() => {
      let table = document.querySelector("table");
      table.setAttribute("id", "table-to-xls");
    }, []);
    
    // const {orderItem} = useSelector(state=>state.orderItemReducer)

    const maxsulot = () =>{
    const orderItems = orderItem.filter(item=> item.status === "qabul_qilindi" ||
    item.status === "tulandi")
      let set = new Set(filterDate(date.date1,date.date2,orderItem).map(item=>item.product));
      let res = [];
      for(let key of set){
        let a = orderItems.filter(item=>item.product===key)
        res.push({
           ...a[0],
           count:a.length,
           res:a
        })
      }
      console.log('foyda',res);
      return res || []
    }
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
          dispatch(orderDate(
            {
              date1: e[0],
              date2: e[1]
            }
          ))
          
        }}
      />
        <br/>
        <br/>
        <Table
          loading={order.length === 0 ? true : false}
          columns={columns}

          dataSource={maxsulot().filter(item=>item.count>0)}
          pagination={{
            pageSize: 20,
          }}
          rowKey={(order) => order.id}
          
          scroll={{
            x: 700,
            y:600
          }}
          
        />
      </div>
    );
  };
  
  export default Maxsulot;
  