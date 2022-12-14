import React from "react";
import {
  CreditCardOutlined,
  BarsOutlined,
  InboxOutlined,
  LeftCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  BarChartOutlined,
  HistoryOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../redux/action/categoryAction";
import { userLogout } from "../redux/action/profileAction";
import Swal from "sweetalert2";
const Layout = ({ content }) => {
  const { menu } = useSelector((state) => state.categoryReducer);
  const { user } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(menuToggle());
  };
  // profildan chiqish
  const logout = () => {
    dispatch(userLogout());
    Swal.fire({
      title: "Tabriklayman ",
      text: "Siz shaxsiy profiliga chiqdingiz!",
      icon: "success",
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <div className="gridLayout">
        <nav className={menu ? "saidbarLayout active" : "saidbarLayout"}>
          <div className="navlogo">
            <NavLink to="/">
              <img src="./logo/logo.png" alt="" />
            </NavLink>
            <span></span>
          </div>
          <ul className="navItem">
            <li>
              <NavLink to="/">
                <span>
                  <BarsOutlined />
                </span>
                <span>Cars</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/product">
                <span>
                  <InboxOutlined />
                </span>
                <span>Blog</span>
              </NavLink>
            </li>
         
          </ul>
        </nav>
        <div className="contentLayaot">
          <Button
            icon={<LeftCircleOutlined />}
            type="primary"
            className={menu ? "menuToggle active" : "menuToggle"}
            onClick={toggle}
          />
          <div className="headerContent">
            <h1>Admin</h1>
            <div className="profiles">
              <Tooltip title={user.username}>
                <Avatar
                  size={{
                    xl: 44,
                    sm: 32,
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Tooltip title="Profildan chiqish" onClick={logout}>
                <Avatar
                  size={{
                    xl: 44,
                    sm: 32,
                  }}
                  icon={<LogoutOutlined />}
                />
              </Tooltip>
            </div>
          </div>
          <div className="itemContent">
            {/* <Galery/> */}
            {/* <ZommImg/> */}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
