import React, { useEffect, useState } from "react";
import { Modal, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const LoginForm = ({ setModal, isModalVisible, setSignedIn }: any) => {
  return (
    <Modal
      title="Signed In"
      visible={isModalVisible}
      onCancel={() => {
        setSignedIn();
        setModal(false);
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            setSignedIn();
            setModal(false);
          }}
        >
          Ok
        </Button>,
      ]}
    >
      <Paragraph>Godt gået, nu du logged ind 👏</Paragraph>
    </Modal>
  );
};
export default LoginForm;
