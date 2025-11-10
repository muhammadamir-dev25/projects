import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  type FormProps,
} from "antd";
import type { FieldType } from "../shared/types/login";
import { useNavigate } from "react-router-dom";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";

export default function Login() {
  const navigate = useNavigate();
  const [messageApi] = message.useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (
      ADMIN_USERNAME === values.username &&
      ADMIN_PASSWORD === values.password
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/");
    } else messageApi.error("Incorrect login or password");
  };

  return (
    <Row justify={"center"} style={{ paddingTop: "10rem" }}>
      <Col>
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //   onFinishFailed={}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
