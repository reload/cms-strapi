import React, { useEffect, useState } from "react";

import { Button, Layout, Menu, Table, Typography } from "antd";
import {
  CoffeeOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { DataSource, Menus, Site } from "./types";
import { Header } from "antd/lib/layout/layout";
import LoginForm from "./LoginForm";
import Avatar from "antd/lib/avatar/avatar";
import Title from "antd/lib/typography/Title";
import { useHistory, Link } from "react-router-dom";

const { Content, Footer } = Layout;

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

type MainProps = {
  menu: Menus;
};

const Main = ({ menu }: MainProps) => {
  const [columns, setColumns] = useState<null | ColumnItem[]>(null);
  const [dataSource, setDataSource] = useState<null | DataSource>(null);
  const history = useHistory();

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
    <Layout className="site-layout">
      <Content style={{ padding: "50px" }}>
        <Title style={{ textTransform: "capitalize" }}>{menu}</Title>
        {dataSource && columns ? (
          <Table
            dataSource={dataSource as any}
            columns={columns}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  history.push("/detail", { record });
                },
              };
            }}
          />
        ) : null}
      </Content>
      <Footer style={{ textAlign: "center" }}>Reload production ©2021</Footer>
    </Layout>
  );
};

export default Main;
