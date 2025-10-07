import React, { useState } from "react";
import {
    CloudOutlined,
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Space, theme } from "antd";
import styles from "./Navbar.module.css";
import CardForm from "../../components/Card/CardForm.tsx";
import {Link, useNavigate} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const navLabel = [
    { id: 1, label: "Личный кабинет", icon: UserOutlined },
    { id: 2, label: "История", icon: CloudOutlined },
];

const items: MenuProps["items"] = navLabel.map((item) => ({
    key: item.id,
    icon: React.createElement(item.icon),
    label: item.label,
}));

const Navbar: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()

    // Пока логика входа заглушка (позже будет auth state)
    const [isAuth, setIsAuth] = useState(false);

    const handleLogin = () => {
        console.log("Register clicked");
        // потом — открыть модалку/редирект на страницу логина
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        setIsAuth(false);
    };

    const handleRegister = () => {
        navigate('/register')
    };

    return (
        <Layout hasSider>
            <Sider className={styles.sider}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={items}
                />
            </Sider>

            <Layout>
                <Header
                    className={styles.header}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Space>
                        {isAuth ? (
                            <>
                                <Button
                                    type="text"
                                    icon={<LogoutOutlined />}
                                    onClick={handleLogout}
                                    disabled
                                >
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="text"
                                    icon={<LoginOutlined />}
                                    onClick={handleLogin}
                                    disabled
                                >
                                    Войти
                                </Button>
                                <Button
                                    type="text"
                                    icon={<UserAddOutlined />}
                                    onClick={handleRegister}
                                >
                                    Зарегистрироваться
                                </Button>
                            </>
                        )}
                    </Space>
                </Header>

                <Content className={styles.contentWrapper}>
                    <div
                        className={styles.contentInner}
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Link to="/"><CardForm /></Link>
                    </div>
                </Content>

                <Footer className={styles.footer}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Navbar;
