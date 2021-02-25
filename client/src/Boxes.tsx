import React from "react";

import { BoxFactsType, BoxFriendlistType, BoxStatisticsType } from "./types";

import { Statistic, Row, Col } from "antd";

import Avatar from "antd/lib/avatar/avatar";
import Title from "antd/lib/typography/Title";
import { Collapse } from "antd";

const { Panel } = Collapse;

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

export function BoxFriendlist({ data }: { data: BoxFriendlistType }) {
  return (
    <BoxContainer>
      <Title level={5} style={{ marginTop: "20px" }}>
        BoxFriendlist
      </Title>
      {data.images.map((i) => (
        <Avatar
          key={i.id}
          shape="square"
          style={{ marginRight: "10px" }}
          size={64}
          src={`http://localhost:1337${i.url}`}
        />
      ))}
    </BoxContainer>
  );
}

export function BoxStatistics({ data }: { data: BoxStatisticsType }) {
  return (
    <BoxContainer>
      <Title level={5} style={{ marginTop: "20px" }}>
        BoxStatistics
      </Title>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="Active Users" value={data.activeUsers} />
        </Col>
        <Col span={4}>
          <Statistic title="Non-active Users" value={data.nonActiveUsers} />
        </Col>
        <Col span={4}>
          <Statistic title="Disable users" value={data.disabledUsers} />
        </Col>
        <Col span={4}>
          <Statistic title="Banned Users" value={data.bannedUsers} />
        </Col>
      </Row>
    </BoxContainer>
  );
}

export function BoxFacts({ data }: { data: BoxFactsType }) {
  return (
    <BoxContainer>
      <Title level={5} style={{ marginTop: "20px" }}>
        BoxFacts
      </Title>
      <Collapse defaultActiveKey={["1"]}>
        {data.facts.map((i) => (
          <Panel key={i.id} header={i.header}>
            <p>{i.content}</p>
          </Panel>
        ))}
      </Collapse>
    </BoxContainer>
  );
}
