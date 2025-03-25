import React, { useEffect, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';

import { Avatar, Button, Divider, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../client/auth/user';

const AccountPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser()
            .then(data => {
                setUser(data);
            })
    }, []);

    if (!user) {
        return null;
    }

    return (
        <>
            <h1 style={{paddingLeft: 42, margin: 0, justifyContent: "space-between"}} className='flex align-items-center'>
                <Flex gap="small">
                    <Avatar src={"https://api.dicebear.com/7.x/miniavs/svg?seed=" + user["id"]} size="large" style={{margin: "0 8px 0 0"}}/>
                    <strong style={{width: '-webkit-fill-available'}}>
                    <Typography.Title style={{margin: 0}}>
                        { user.username }
                    </Typography.Title>
                    </strong>
                </Flex>
                <Button color="danger" variant="filled" size="large" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('blockCache');
                    localStorage.removeItem('user');
                    
                    navigate("/auth/signin");
                }}>Выйти</Button>
            </h1>   
            <Divider />
        </>
    );
};

export default AccountPage;