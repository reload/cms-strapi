import React, { useEffect, useState } from "react";

import { Button, Layout, Menu, Table, Typography } from "antd";
import {
  CoffeeOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { DataSource, Site } from "./types";
import { Header } from "antd/lib/layout/layout";
import LoginForm from "./LoginForm";
import Avatar from "antd/lib/avatar/avatar";

const { Content, Footer, Sider } = Layout;
const { Title } = Typography;

type Menus = "guides" | "sites" | "events";

type ColumnItem = {
  title: string;
  dataIndex: string;
  key: string;
};

type Columns = {
  [P in Menus]: string[];
};

const columnsBase: Columns = {
  guides: ["Header", "Name", "created_at"],
  sites: ["id", "Title", "ShortDescription", "created_at"],
  events: ["header", "uuid", "description"],
};

const App = () => {
  const [menu, setMenu] = useState<Menus>("guides");
  const [columns, setColumns] = useState<null | ColumnItem[]>(null);
  const [dataSource, setDataSource] = useState<null | DataSource>(null);
  const [isModalVisbile, setModal] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const menuSelected = menu;
    axios
      .get(`http://localhost:1337/${menuSelected}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyMjc4ODI2LCJleHAiOjE2MTQ4NzA4MjZ9.WMPFKUGYMR6QER-voz7WG1sAs-t8yO-09WQtLwJAQY0`,
        },
      })
      .then((res: any) => {
        const resData = res.data as Site[];
        setColumns(
          columnsBase[menuSelected].map((column) => ({
            title: column.toUpperCase(),
            dataIndex: column,
            key: column,
          }))
        );
        setDataSource(resData);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [menu]);

  return (
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
        <Layout className="site-layout">
          <Content style={{ padding: "50px" }}>
            <Title style={{ textTransform: "capitalize" }}>{menu}</Title>
            {dataSource && columns ? (
              <Table dataSource={dataSource as any} columns={columns} />
            ) : null}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Reload production ©2021
          </Footer>
        </Layout>
      </Layout>
      <LoginForm
        setSignedIn={() => {
          setSignedIn(true);
        }}
        setModal={setModal}
        isModalVisible={isModalVisbile}
      />
    </div>
  );
};

export default App;
