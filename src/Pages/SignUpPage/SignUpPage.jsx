import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import 'antd/dist/reset.css';

import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import { createUser } from '../../client/auth/user';
import { login } from '../../client/auth/auth';
import { setAuthToken } from '../../client/auth';


const SignUpPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onLogin = (values) => {
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
                console.log(error);

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
    }

    const onFinish = (values) => {
        createUser(values)
            .then((data) => {
                messageApi.open({
                    type:'success',
                    content: 'Регистрация прошла успешно!' + JSON.stringify(data)
                })

                onLogin(values);
            })
            .catch((error) => {
                console.log(error);

                let errorMessage = "Неизвестная ошибка! Попробуйте позже.";

                try {
                    errorMessage = error.detail.error_massage;
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
            <Card title="Регистрация" style={{ width: 400 }}>
                <Form
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="Имя пользователя"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваше имя!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
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
                        Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <Button style={{ width: '100%' }} type='default' href='/auth/signin'>
                    Вход
                </Button>
            </Card>
        </div>
    );
};

export default SignUpPage;