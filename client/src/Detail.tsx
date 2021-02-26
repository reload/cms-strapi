import React from "react";
import { Site } from "./types";
import { RouteComponentProps } from "react-router-dom";
import { Layout, List } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { BoxFacts, BoxFriendlist, BoxStatistics } from "./Boxes";

const Detail = (
  props: RouteComponentProps<any, any, { record: Site | null }>
) => {
  const record = props.location.state?.record;

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
            `geolocation: ${JSON.stringify(r.geolocation)}`,
            `type: ${JSON.stringify(r.type)}`,
            `district: ${JSON.stringify(r.district)}`,
            `published_at: ${r.published_at}`,
            `created_at: ${r.created_at}`,
            `updated_at: ${r.updated_at}`,
          ]}
          renderItem={(item: any) => <List.Item>{item}</List.Item>}
        />
        <Title level={3} style={{ marginTop: "20px" }}>
          Components
        </Title>
        <Text style={{ marginTop: "20px" }}>
          {(!r.boxes || r.boxes?.length === 0) && "Ingen boxes tilføjet"}
        </Text>
        {record.boxes?.map((box, index) => {
          switch (box.__component) {
            case "boxes.box-facts":
              return <BoxFacts key={index} data={box} />;

            case "boxes.box-friendlist":
              return <BoxFriendlist key={index} data={box} />;

            case "boxes.box-statistics":
              return <BoxStatistics key={index} data={box} />;

            default:
              return <div>Box ikke implementeret</div>;
          }
        })}
      </Content>
    </Layout>
  );
};

export default Detail;
