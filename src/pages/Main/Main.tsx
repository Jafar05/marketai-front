import React, {useEffect} from "react";
import {Typography, Button, Space, Card, message} from "antd";
import { RocketOutlined } from "@ant-design/icons";
import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./Main.module.css";

const { Title, Paragraph } = Typography;

const Main: React.FC = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        const token = params.get("token")
        fetch(`/api/auth/api/v1/verify-email?token=${token}`)
            .then(res => res.json())
            .then(() => messageApi.open({
                type: 'success',
                content: "Email успешно подтверждён!",
            }))
            .catch(() => messageApi.open({
                type: 'error',
                content: "Ошибка при подтверждении email",
            }));
    }, [params]);




    const handleStart = () => {
        navigate("/login");
    };

    return (
        <div className={styles.wrapper}>
            {contextHolder}
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
