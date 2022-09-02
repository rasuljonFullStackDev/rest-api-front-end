import React from "react";
import HisobotCrud from "../../componet/adminComponet/HisobotCrud";

import Layout from "../../Layout/Layout";

const Hisobot = () => {
  return (
    <Layout
      content={
        <>
          <HisobotCrud />
        </>
      }
    />
  );
};

export default Hisobot;
