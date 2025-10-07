import React, {useState} from 'react';
import styles from "./CardForm.module.css";
import { Card, Button, Form, Input, message, Select, Space, Tag, Upload } from "antd";
import type { UploadFile } from "antd";
const { Option } = Select;

const categories = ["Одежда", "Электроника", "Косметика", "Обувь", "Дом и сад"];
const audiences = ["Женщины", "Мужчины", "Дети", "Все"];
const stylesList = ["Продающий", "Официальный", "Лёгкий", "Эмоциональный"];

const CardForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [characteristics, setCharacteristics] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleAddCharacteristic = () => {
        if (inputValue.trim() && !characteristics.includes(inputValue.trim())) {
            setCharacteristics([...characteristics, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemoveCharacteristic = (tag: string) => {
        setCharacteristics(characteristics.filter((t) => t !== tag));
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            console.log("Отправляем данные:", {
                ...values,
                characteristics,
                photos: fileList.map((f) => f.name),
            });
            message.success("Товар успешно отправлен!");
            form.resetFields();
            setCharacteristics([]);
            setFileList([]);
        } catch (err) {
            message.error("Ошибка при отправке данных");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <Card title="Добавление товара" bordered>
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Название товара"
                        name="title"
                        rules={[{required: true, message: "Введите название товара"}]}
                    >
                        <Input placeholder="Например: Футболка Nike"/>
                    </Form.Item>

                    <Form.Item
                        label="Категория"
                        name="category"
                        rules={[{required: true, message: "Выберите категорию"}]}
                    >
                        <Select placeholder="Выберите категорию">
                            {categories.map((cat) => (
                                <Option key={cat} value={cat}>
                                    {cat}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Фото товара (1–3)">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={({fileList}) => setFileList(fileList.slice(0, 3))}
                        >
                            {fileList.length < 3 && "+ Upload"}
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Ключевые характеристики">
                        <Space wrap>
                            {characteristics.map((tag) => (
                                <Tag
                                    key={tag}
                                    closable
                                    onClose={() => handleRemoveCharacteristic(tag)}
                                >
                                    {tag}
                                </Tag>
                            ))}
                            <Input
                                className={styles.characteristicsInput}
                                placeholder="Например: цвет: белый"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onPressEnter={handleAddCharacteristic}
                                onBlur={handleAddCharacteristic}
                            />
                        </Space>
                    </Form.Item>

                    <Form.Item label="Целевая аудитория" name="audience">
                        <Select placeholder="Выберите аудиторию">
                            {audiences.map((a) => (
                                <Option key={a} value={a}>
                                    {a}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Ключевые слова" name="keywords">
                        <Input placeholder="женская футболка, белая, хлопковая"/>
                    </Form.Item>

                    <Form.Item label="Стиль описания" name="style">
                        <Select placeholder="Выберите стиль">
                            {stylesList.map((s) => (
                                <Option key={s} value={s}>
                                    {s}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Сгенерировать
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CardForm;
