import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency-logo.png";

const Navbar = ({ pathName }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    const handleScroll = () => {
      if (screenSize < 768) {
        setActiveMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [screenSize]);

  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const handleLinkClick = () => {
    if (screenSize < 768) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".menu-control-container") &&
        !event.target.closest(".ant-menu") &&
        screenSize < 768
      ) {
        setActiveMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">ZenixCoin</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={toggleMenu}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          defaultSelectedKeys={["/"]}
          selectedKeys={[`/${pathName}`]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/cryptocurrencies" icon={<FundOutlined />}>
            <Link to="/cryptocurrencies" onClick={handleLinkClick}>
              Cryptocurrencies
            </Link>
          </Menu.Item>
          <Menu.Item key="/news" icon={<BulbOutlined />}>
            <Link to="/news" onClick={handleLinkClick}>
              News
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
