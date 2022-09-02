import {
  Button,



} from "antd";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Swal from "sweetalert2";

import UmumiyFoyda from "./UmumiyFoyda";
import UmuiyFoyda1 from "./UmuiyFoyda1";
import TopMaxsulot from "./hisobot/TopMaxsulot";
import TopKlient from "./hisobot/TopKlient";
const HisobotCrud = () => {

  const { profile } = useSelector((state) => state.profileReducer);



  useEffect(() => {
    let table = document.querySelector("table");
    table.setAttribute("id", "table-to-xls");
  }, []);
  const [tab, setTab] = useState("/");

  const tabFun = (route) => {
    switch (route) {
      case "/": {
        return <UmuiyFoyda1 />;
      }
      case "/1": {
        return <UmumiyFoyda />;
      }
      case "/2": {
        return <TopMaxsulot />;
      }
      case "/3": {
        return <TopKlient />;
      }
      default:
        break;
    }
  };
  return (
    <div>
      <Button type="primary" size="large" onClick={() => setTab('/')} style={{ marginRight:'5px' }}>
      Hisobot
      </Button>
      <Button type="primary" size="large" onClick={() => setTab('/1')} style={{ marginRight:'5px' }}>
     Oylik Hisobot
      </Button>
      <Button type="primary" size="large" onClick={() => setTab('/2')} style={{ marginRight:'5px' }}>
       Top maxsulot
      </Button>
      <Button type="primary" size="large" onClick={() => setTab('/3')} style={{ marginRight:'5px' }}>
       Top klient
      </Button>
      <br />
      <br />
    {tabFun(tab)}
    </div>
  );
};

export default HisobotCrud;
