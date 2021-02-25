import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Button, Layout, Menu } from "antd";
import {
  CoffeeOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menus } from "./types";
import { Header } from "antd/lib/layout/layout";
import LoginForm from "./LoginForm";
import Avatar from "antd/lib/avatar/avatar";
import Detail from "./Detail";
import Main from "./Main";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const App = () => {
  const [menu, setMenu] = useState<Menus>("guides");
  const [isModalVisbile, setModal] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);

  return (
    <Router>
      <div>
        <Header
          className="header"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div>
            {isSignedIn ? (
              <Avatar icon={<UserOutlined />} />
            ) : (
              <Button
                style={{ cursor: "pointer" }}
                onClick={() => setModal(true)}
                type="primary"
              >
                Sign in
              </Button>
            )}
          </div>
        </Header>
        <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
          <Sider>
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={[menu]}
              mode="inline"
              onClick={(e) => {
                setMenu(e.key as Menus);
              }}
            >
              <Menu.Item key="guides" icon={<EnvironmentOutlined />}>
                Guides
              </Menu.Item>
              <Menu.Item key="sites" icon={<CoffeeOutlined />}>
                Sites
              </Menu.Item>
              <Menu.Item key="events" icon={<CarryOutOutlined />}>
                Events
              </Menu.Item>
            </Menu>
          </Sider>
          <Switch>
            <Route
              path="/detail"
              render={(props: any) => <Detail {...props} />}
            />
            <Route path="/">
              <Main menu={menu} />
            </Route>
          </Switch>
        </Layout>
        <LoginForm
          setSignedIn={() => {
            setSignedIn(true);
          }}
          setModal={setModal}
          isModalVisible={isModalVisbile}
        />
      </div>
    </Router>
  );
};

export default App;
