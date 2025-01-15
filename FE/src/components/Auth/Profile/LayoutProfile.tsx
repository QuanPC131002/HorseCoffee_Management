import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import instance from '../../../config/axios';
import { useLocalStorage } from '../../../hook/useStorage';

const { Content } = Layout;
const { Title, Text } = Typography;
const LayoutProfile = () => {
  const [user] = useLocalStorage('user', {})
  const userId = user?.user?._id

  const {data} = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const res = await instance.get(`/auth/${userId}`)
      return res.data
    }
  })
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
              <Title level={4}>{data.data?.name}</Title>
              <Text type="secondary">{data.data?.email}</Text>
              <div style={{ marginTop: 10 }}>
                <Text type="secondary">{data.data?.role}</Text>
              </div>

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
