import React, { useEffect, useState } from 'react';

import { Button, Card, Divider, Flex, Tag, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { deleteReminder, getReminders } from '../../client/reminder/reminder';
import moment from 'moment';

const InboxPage = () => {
    const navigate = useNavigate();

    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        getReminders({
            start_date: todayDate,
            end_date: todayDate,
        })
            .then(data => {
                setReminders(data);
            })
    }, []);

    return (
        <>
            <h1 style={{paddingLeft: 42, margin: 0, justifyContent: "space-between"}} className='flex align-items-center'>
                <Flex gap="small">
                    <InboxOutlined style={{margin: "0 8px 0 0"}}/>
                    <strong style={{width: '-webkit-fill-available'}}>
                    <Typography.Title style={{margin: 0}}>
                        Inbox
                    </Typography.Title>
                    </strong>
                </Flex>
            </h1>   
            <Divider />
            <Flex style={{marginLeft: 50}} vertical gap="large">
            <Typography.Title level={4}>You have {reminders.length} reminders:</Typography.Title>
            {
                reminders.map((reminder, index) => (
                    <Card key={index}>
                        <Flex vertical gap="small">
                            <Flex gap="small">
                                <Typography.Text>{reminder.text}</Typography.Text>
                                <Tag color="blue">{reminder.date}</Tag>
                            </Flex>
                            <Flex gap="small"className='w100p' style={{justifyContent: 'flex-end'}}>
                                <Button onClick={() => {
                                    deleteReminder(reminder.id)
                                        .then(data => {
                                            setReminders(reminders.filter((data, i) => data.id !== reminder.id))
                                        })
                                }} color="danger" variant='filled'>Delete</Button>
                            </Flex>
                        </Flex>
                    </Card>
                ))
            }
            </Flex>
        </>
    );
};

export default InboxPage;