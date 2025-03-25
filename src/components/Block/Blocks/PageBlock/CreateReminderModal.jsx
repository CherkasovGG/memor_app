import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';

import moment from 'moment';

const formatReminderData = (reminder) => {
    const date = new Date(reminder.date);

    if (isNaN(date.getTime())) {
        throw new Error("Неверная дата");
    }

    date.setDate(date.getDate() + 1);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
    const formattedDate = date.toLocaleDateString('en-CA', options);

    return {
        date: formattedDate,
        text: reminder.text
    };
};

const CreateReminderModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                onCreate(formatReminderData(values));
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={open}
            title="Создать напоминание"
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" name="create_reminder_form">
                <Form.Item
                    name="date"
                    label="Дата"
                    rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="text"
                    label="Текст напоминания"
                    rules={[{ required: true, message: 'Пожалуйста, введите текст напоминания!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateReminderModal;