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
import { Link, RouteComponentProps } from "react-router-dom";

const Detail = (
  props: RouteComponentProps<any, any, { record: Site | null }>
) => {
  const record = props.location.state.record;
  console.log(record);
  return (
    <div>
      <h1>detail</h1>
      <div>{JSON.stringify(record)}</div>
    </div>
  );
};

export default Detail;
