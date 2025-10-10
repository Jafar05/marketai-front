import React from "react";
import {
    CloudOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Space, theme, Typography } from "antd";
import styles from "./Navbar.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const Navbar: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();

    const navItems = isAuthenticated ? [
        { id: 1, label: "Главная", icon: HomeOutlined, path: "/dashboard" },
        { id: 2, label: "История", icon: CloudOutlined, path: "/history" },
    ] : [];

    const items: MenuProps["items"] = navItems.map((item) => ({
        key: item.id,
        icon: React.createElement(item.icon),
        label: item.label,
        onClick: () => navigate(item.path),
    }));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Layout hasSider>
            {isAuthenticated && (
                <Sider className={styles.sider}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={items}
                    />
                </Sider>
            )}

            <Layout>
                <Header
                    className={styles.header}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text strong>MarketAI</Text>
                        
                        <Space>
                            {isAuthenticated ? (
                                <>
                                    <Text>Привет, {user?.fullname}!</Text>
                                    <Button
                                        type="text"
                                        icon={<LogoutOutlined />}
                                        onClick={handleLogout}
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
                    </div>
                </Header>

                <Content className={styles.contentWrapper}>
                    <div
                        className={styles.contentInner}
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                <Footer className={styles.footer}>
                    MarketAI ©{new Date().getFullYear()} - AI-powered marketplace cards
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Navbar;
