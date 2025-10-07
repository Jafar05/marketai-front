import React from "react";
import { Typography, Button, Space, Card } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";

const { Title, Paragraph } = Typography;

const Main: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/login");
    };

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <RocketOutlined className={styles.icon} />
                    <Title level={2}>Добро пожаловать в MarketAI</Title>
                    <Paragraph className={styles.text}>
                        Генерируйте карточки товаров для Wildberries и Ozon с помощью
                        искусственного интеллекта. Просто добавьте фото и описание — всё
                        остальное сделает AI.
                    </Paragraph>
                    <Button type="primary" size="large" onClick={handleStart}>
                        Начать работу
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default Main;
