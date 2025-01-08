import { Avatar, Button, Card, Layout, Typography } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const LayoutProfile = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
          {/* Content */}
          <Content style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
            <Card style={{ maxWidth: 400, textAlign: "center", padding: 20 }}>
              <Avatar
                size={100}
                src="https://via.placeholder.com/150" 
                style={{ marginBottom: 20 }}
              />
              <Title level={4}>John Doe</Title>
              <Text type="secondary">johndoe@example.com</Text>

            <div style={{ marginTop: 20 }}>
            <Link to="/profile/change-password" className='text-blue-500'>
              Đổi mật khẩu ?
            </Link>
            </div>
            </Card>
          </Content>
        </Layout>
      );
}

export default LayoutProfile
