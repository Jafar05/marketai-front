import React, { useState } from "react";
import { Form, Input, Button, message, Card, Select } from "antd";
import style from "./RegisterForm.module.css";
import "antd/dist/reset.css";

interface FormValues {
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    password: string;
}

const countries = [
    { code: "+7", flag: "🇷🇺", name: "Россия", mask: "999 999 99 99" },
    { code: "+375", flag: "🇧🇾", name: "Беларусь", mask: "99 999 99 99" },
    { code: "+380", flag: "🇺🇦", name: "Украина", mask: "99 999 99 99" },
    { code: "+996", flag: "🇰🇬", name: "Киргизия", mask: "999 999 999" },
    { code: "+998", flag: "🇺🇿", name: "Узбекистан", mask: "99 999 99 99" },
    { code: "+374", flag: "🇦🇲", name: "Армения", mask: "99 999 999" },
    { code: "+993", flag: "🇹🇲", name: "Туркменистан", mask: "9 99 999999" },
    { code: "+994", flag: "🇦🇿", name: "Азербайджан", mask: "99 999 99 99" },
    { code: "+995", flag: "🇬🇪", name: "Грузия", mask: "99 999 999" },
    { code: "+90", flag: "🇹🇷", name: "Турция", mask: "999 999 99 99" },
];

const formatPhone = (digits: string, mask: string) => {
    let i = 0;
    return mask.replace(/\d/g, () => digits[i++] || "");
};

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm<FormValues>();
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneDisplay, setPhoneDisplay] = useState("");
    const [loading, setLoading] = useState(false);


    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const raw = target.value.replace(/\D/g, "");
        setPhoneDisplay(formatPhone(raw, selectedCountry.mask));
        form.setFieldValue(["phone"], raw);
    };

    const handleCountryChange = (value: string) => {
        const country = countries.find((c) => c.code === value);
        if (!country) return;
        setSelectedCountry(country);
        setPhoneDisplay("");
        form.setFieldValue(["phone"], "");
    };

    const handleLogin = async (values: FormValues) => {
        try {
            setLoading(true)
            const phoneToSend = `${selectedCountry.code}${values.phone}`;
            const response = await fetch("/api/auth/api/v1/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: values.fullName,
                    email: values.email,
                    phoneNumber: phoneToSend,
                    password: values.password, // отправляем пароль
                }),
            });

            if (!response.ok) {
                const errText = await response.text().catch(() => "");
                throw new Error(`Ошибка регистрации: ${response.status} ${errText}`);
            }

            const data = await response.json();
            console.log("Успешный ответ:", data);
            message.success("Форма успешно отправлена!");
            form.resetFields();
            setPhoneDisplay("");
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            message.error("Не удалось отправить форму. Попробуйте снова.");
            setLoading(false)
        }
    };

    return (
        <div className={style.formContainer}>
            <Card title="Регистрация продавца" className={style.formCard} bordered>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleLogin}
                    style={{ width: "100%" }}
                >
                    <Form.Item
                        label="ФИО"
                        name="fullName"
                        rules={[{ required: true, message: "Введите ФИО" }]}
                    >
                        <Input placeholder="Введите полное имя" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Введите Email" },
                            { type: "email", message: "Некорректный Email" },
                        ]}
                    >
                        <Input placeholder="example@mail.com" />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            { required: true, message: "Введите пароль" },
                            { min: 6, message: "Пароль должен содержать минимум 6 символов" },
                        ]}
                    >
                        <Input.Password placeholder="Введите пароль" />
                    </Form.Item>

                    <Form.Item label="Номер телефона" required>
                        <Input.Group compact>
                            <Select
                                defaultValue={selectedCountry.code}
                                style={{ width: "30%" }}
                                onChange={handleCountryChange}
                            >
                                {countries.map((c) => (
                                    <Select.Option key={c.code} value={c.code}>
                                        {c.flag} ({c.code})
                                    </Select.Option>
                                ))}
                            </Select>

                            <Form.Item
                                name="phone"
                                noStyle
                                rules={[
                                    { required: true, message: "Введите номер телефона" },
                                    {
                                        pattern: /^\d{7,10}$/,
                                        message: "Введите корректный номер без кода страны",
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: "70%" }}
                                    placeholder={selectedCountry.mask}
                                    maxLength={selectedCountry.mask.replace(/\D/g, "").length}
                                    value={phoneDisplay}
                                    onChange={handlePhoneChange}
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Отправить
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterForm;
