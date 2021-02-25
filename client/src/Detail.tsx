import React, { useEffect, useState } from "react";

import {
  CoffeeOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { DataSource, Guide, Site } from "./types";

import LoginForm from "./LoginForm";
import { Link, RouteComponentProps } from "react-router-dom";

import {
  Button,
  Layout,
  Menu,
  Table,
  Typography,
  List,
  Statistic,
  Row,
  Col,
} from "antd";

import { Content, Header } from "antd/lib/layout/layout";
import Avatar from "antd/lib/avatar/avatar";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Detail = (
  props: RouteComponentProps<any, any, { record: Site | null }>
) => {
  const record = props.location.state?.record;

  console.log(record);

  if (!record) {
    return (
      <Layout className="site-layout">
        <Content style={{ padding: "50px" }}>
          <Title style={{ textTransform: "capitalize" }}>Site</Title>
          <Text>Missing data</Text>
          <Text>Didn't receive data through props</Text>
        </Content>
      </Layout>
    );
  }

  const r = record;

  return (
    <Layout className="site-layout">
      <Content style={{ padding: "50px", maxWidth: "1000px" }}>
        <Title style={{ textTransform: "capitalize" }}>
          Site: {record.Title}
        </Title>
        <Text style={{ textTransform: "capitalize" }}>
          {record.ShortDescription}
        </Text>
        <Text>{record.Description}</Text>
        <List
          style={{ marginTop: "20px" }}
          size="large"
          bordered
          dataSource={[
            `id: ${r.id}`,
            `geolocation: ${r.geolocation}`,
            `type: ${r.type}`,
            `district: ${r.district}`,
            `published_at: ${r.published_at}`,
            `created_at: ${r.created_at}`,
            `updated_at: ${r.updated_at}`,
          ]}
          renderItem={(item: any) => <List.Item>{item}</List.Item>}
        />
        <Title level={3} style={{ marginTop: "20px" }}>
          Components
        </Title>

        <BoxContainer>
          <Title level={5} style={{ marginTop: "20px" }}>
            BoxFriendlist
          </Title>
          {[1, 2, 3, 4, 5].map((i) => (
            <Avatar
              shape="square"
              style={{ marginRight: "10px" }}
              size={64}
              src={
                "https://images.pexels.com/photos/158109/kodiak-brown-bear-adult-portrait-wildlife-158109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
            />
          ))}
        </BoxContainer>

        <BoxContainer>
          <Title level={5} style={{ marginTop: "20px" }}>
            BoxStatistics
          </Title>
          <Row gutter={16}>
            <Col span={4}>
              <Statistic title="Active Users" value={192893} />
            </Col>
            <Col span={4}>
              <Statistic title="Non-active Users" value={123123} />
            </Col>
            <Col span={4}>
              <Statistic title="Disable users" value={441} />
            </Col>
            <Col span={4}>
              <Statistic title="Banned Users" value={5123} />
            </Col>
          </Row>
        </BoxContainer>

        <BoxContainer>
          <Title level={5} style={{ marginTop: "20px" }}>
            BoxFacts
          </Title>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="This is panel header 1" key="1">
              <p>Facts linje 1</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>Facts linje 2</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>Facts linje 3</p>
            </Panel>
          </Collapse>
          ,
        </BoxContainer>
      </Content>
    </Layout>
  );
};

const BoxContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        border: "2px solid #e4e4e4",
        padding: "10px",
        marginTop: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default Detail;
