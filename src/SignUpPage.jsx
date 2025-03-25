import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import 'antd/dist/reset.css';
import { Config } from '../../../../api/config';

// import { AuthService } from '/src/api/AuthApi';


const SignUpPage = () => {
    // let apiInstance = new AuthService.UserApi();

    const onFinish = async (values) => {
        // let userCreateDTO = new AuthService.UserCreateDTO(values);
        // apiInstance.createUserRouteUserPost(userCreateDTO, (error, data, response) => {
        // if (error) {
        //     console.error(error);
        // } else {
        //     console.log('API called successfully. Returned data: ' + data);
        // }
        // });
    };

    return (
        <div className="flex column align-items-center justify-content-center w100vw h100vh">
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
                                message: 'Пожалуйста, введите ваше имя пользователя!',
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
            </Card>
        </div>
    );
};

export default SignUpPage;