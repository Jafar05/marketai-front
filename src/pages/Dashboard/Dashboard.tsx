import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography, Image, Tag, Spin } from 'antd';
import { UploadOutlined, RobotOutlined } from '@ant-design/icons';
import { cardsApi } from '../../api/api';
import { useAuthStore } from '../../store/authStore';
import './Dashboard.module.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface GenerateCardForm {
  photo_url: string;
  short_description: string;
}

interface GeneratedCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const Dashboard: React.FC = () => {
  const [form] = Form.useForm<GenerateCardForm>();
  const [loading, setLoading] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<GeneratedCard | null>(null);
  const { token, user } = useAuthStore();

  const handleGenerate = async (values: GenerateCardForm) => {
    if (!token) {
      message.error('Необходимо войти в систему');
      return;
    }

    try {
      setLoading(true);
      const response = await cardsApi.generateCard(values, token);
      
      setGeneratedCard(response);
      message.success('Карточка успешно сгенерирована!');
    } catch (error: any) {
      console.error('Ошибка при генерации карточки:', error);
      message.error('Не удалось сгенерировать карточку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <Title level={2}>Добро пожаловать, {user?.fullname}!</Title>
        <Paragraph>Создайте карточку товара с помощью AI на основе фото и описания</Paragraph>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Форма генерации */}
        <Card title="Генерация карточки" style={{ height: 'fit-content' }}>
          <Form
            form={form}
            onFinish={handleGenerate}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="photo_url"
              label="URL фотографии товара"
              rules={[
                { required: true, message: 'Введите URL фотографии' },
                { type: 'url', message: 'Введите корректный URL' },
              ]}
            >
              <Input
                placeholder="https://example.com/product.jpg"
                prefix={<UploadOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="short_description"
              label="Краткое описание товара"
              rules={[
                { required: true, message: 'Введите описание товара' },
                { min: 10, message: 'Описание должно содержать минимум 10 символов' },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Опишите товар: цвет, размер, материал, особенности..."
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                icon={<RobotOutlined />}
                style={{ height: '45px' }}
              >
                Сгенерировать карточку
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Результат генерации */}
        <Card title="Результат" style={{ height: 'fit-content' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
              <div style={{ marginTop: '16px' }}>Генерируем карточку...</div>
            </div>
          ) : generatedCard ? (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <Image
                  src={generatedCard.image}
                  alt={generatedCard.title}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
              
              <Title level={4}>{generatedCard.title}</Title>
              
              <Paragraph>{generatedCard.description}</Paragraph>
              
              <div style={{ marginTop: '16px' }}>
                <strong>Теги:</strong>
                <div style={{ marginTop: '8px' }}>
                  {generatedCard.tags.map((tag, index) => (
                    <Tag key={index} color="blue" style={{ marginBottom: '4px' }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Заполните форму и нажмите "Сгенерировать карточку"
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
