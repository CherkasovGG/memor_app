import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import 'antd/dist/reset.css';

import { authClient } from '../../client/client';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../client/auth';
import { config } from '../../config';
import { login } from '../../client/auth/auth';


const SignInPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(JSON.stringify(values));

        login(values)
            .then((data) => {
                console.log(data);

                const token  =  data.access_token;

                setAuthToken(token);

                messageApi.open({
                    type:'success',
                    content: 'Авторизация прошла успешно!'
                })

                navigate('/app');
            })
            .catch((error) => {
                let errorMessage = "Неизвестная ошибка! Попробуйте позже.";

                try {
                    errorMessage = error.response.data.detail.error_massage;
                } catch (e) {
                    console.log(e);
                }

                messageApi.open({
                    type: 'error',
                    content: errorMessage
                })
            });
    };

    return (
        <div className="flex column align-items-center justify-content-center w100vw h100vh">
            { contextHolder }
            <Card title="Авторизация" style={{ width: 400 }}>
                <Form
                    name="login"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Некорректный email!',
                            },
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваш email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваш пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
                <Button style={{ width: '100%' }} type='default' href='/auth/signup'>
                    Регистрация
                </Button>
            </Card>
        </div>
    );
};

export default SignInPage;