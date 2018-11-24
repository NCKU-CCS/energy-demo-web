import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from 'react-router';

const { Sider } = Layout;

interface IProps extends RouteComponentProps {
  collapsed: boolean;
}

const Sidebar = (props: IProps) => {  
  return (
    <Sider
      width={64}
      breakpoint="lg"
      trigger={null}
      collapsedWidth={0}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[props.location.pathname]}
      >
        <Menu.Item key="/map3d">
          <Icon type="home" />
          <Link to="/map3d">Map3D</Link>
        </Menu.Item>
        <Menu.Item key="/">
          <Icon type="dashboard" />
          <Link to="/">Overview</Link>
        </Menu.Item>
        {/* <Menu.Item key="/heatmap">
          <Icon type="heat-map" />  
          <Link to="heatmap">Heatmap</Link>
        </Menu.Item>
        <Menu.Item key="/map">
          <Icon type="environment" />
          <Link to="/map">Map</Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
