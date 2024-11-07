import { useState } from "react";
import { Form, Row, Col, Input, Button, Select } from "antd";
const { TextArea } = Input;
import TimePicker from "react-time-picker";

export default function DoctorForm({ onSubmit, initialValues }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("19:00");
  const options = [
    {
      value: "Mental health",
      label: "Mental health",
    },
    {
      value: "Relationship advice",
      label: "Relationship advice",
    },
    {
      value: "career counseling",
      label: "career counseling",
    },
    {
      value: "Social anxiety",
      label: "Social anxiety",
    },
  ];

  return (
    <>
      <Form
        layout="vertical"
        onFinish={(value) =>
          onSubmit({ ...value, timings: [`${startTime}`, `${endTime}`] })
        }
        initialValues={initialValues}
      >
        <h1 className="card-title">Perssenol information:</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="PhoneNumber"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="PhoneNumber"
                type="number"
                maxLength={12}
                minLength={10}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <h1 className="card-title">Professional information:</h1>
        <hr />
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Select defaultValue="Mental health" options={options} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Experience" type="number" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="price" name="price" rules={[{ required: true }]}>
              <Input
                placeholder="Price per hours"
                type="number"
                prefix="₹"
                maxLength={4}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} xs={24} sm={24} lg={16}>
            <Form.Item label="About" name="about" rules={[{ required: true }]}>
              <TextArea
                placeholder="Tell abou you in 100 to 250words"
                rows={4}
                maxLength={270}
              />
            </Form.Item>
          </Col>
        </Row>
        <h6 className="mx-2">Timings:</h6>
        <div className="d-flex mb-5 mt-3">
          <TimePicker
            className="px-2"
            onChange={setStartTime}
            value={startTime}
          />
          <h3>➪</h3>
          <TimePicker className="px-2" onChange={setEndTime} value={endTime} />
        </div>

        <div className="d-flex justify-content-end ">
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#b8b8ff",
              width: "130px",
              fontSize: "20px",
              padding: "20px",
              marginRight: "30px",
            }}
            className="btn-primary"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
