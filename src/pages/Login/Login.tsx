import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/api';
import { useAuthStore } from '../../store/authStore';
import './Login.module.css';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const response = await authApi.login(values);
      
      login(response.token, {
        id: response.user.id,
        fullname: response.user.fullname,
        email: response.user.email,
      });

      message.success('Успешный вход в систему!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Ошибка при входе:', error);
      message.error('Неверные учетные данные');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card 
        title={<Title level={2} style={{ textAlign: 'center', margin: 0 }}>Вход в систему</Title>}
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
      >
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Введите email' },
              { type: 'email', message: 'Некорректный email' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
              style={{ height: 45 }}
            >
              Войти
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span>Нет аккаунта? </span>
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
