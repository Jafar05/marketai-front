import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Tag, Image, Button, message, Spin } from 'antd';
import { EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { cardsApi, CardInfo } from '../../api/api';
import { useAuthStore } from '../../store/authStore';
import './History.module.css';

const { Title } = Typography;

const History: React.FC = () => {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token, user } = useAuthStore();

  const fetchCards = async () => {
    if (!token) {
      message.error('Необходимо войти в систему');
      return;
    }

    try {
      const response = await cardsApi.getCardHistory(token);
      setCards(response.cards);
    } catch (error: any) {
      console.error('Ошибка при загрузке истории:', error);
      message.error('Не удалось загрузить историю карточек');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCards();
  };

  const columns = [
    {
      title: 'Фото',
      dataIndex: 'photo_url',
      key: 'photo_url',
      width: 100,
      render: (url: string) => (
        <Image
          src={url}
          alt="Product"
          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      ),
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Описание',
      dataIndex: 'short_description',
      key: 'short_description',
      ellipsis: true,
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <div>
          {tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} color="blue" style={{ marginBottom: 2 }}>
              {tag}
            </Tag>
          ))}
          {tags.length > 3 && <Tag color="default">+{tags.length - 3}</Tag>}
        </div>
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 100,
      render: (_, record: CardInfo) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            // Здесь можно добавить модальное окно с деталями карточки
            message.info(`Просмотр карточки: ${record.title}`);
          }}
        >
          Просмотр
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>Загружаем историю карточек...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>История карточек</Title>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
          loading={refreshing}
        >
          Обновить
        </Button>
      </div>

      <Card>
        {cards.length > 0 ? (
          <Table
            columns={columns}
            dataSource={cards}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} карточек`,
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            <Title level={4}>Карточки не найдены</Title>
            <p>Создайте свою первую карточку товара на главной странице</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default History;
