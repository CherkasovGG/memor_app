import React, { useState } from 'react';

import { Card, Image, Input, Modal, Typography } from 'antd';
import { SettingOutlined } from "@ant-design/icons"
import { patchBlock } from '../../../../client/notes/block';
import Meta from 'antd/es/card/Meta';


const ImageBlock = ({ block }) => {
    const [textContent, setTextContent] = useState(block.properties.text ? block.properties.text[0][0] : "");
    const [imageContent, setImageContent] = useState(block.properties.image ? block.properties.image[0][0] : null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    let [newProps, setNewProps] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setNewProps(null);
    }

    const submitModal = () => {
        patchBlock(block.id, {
            properties: {
                ...block.properties,
                ...newProps,
            }
        })
            .then(data => {
                closeModal();
                if ("text" in newProps) {
                    setTextContent(newProps.text);
                }

                if ("image" in newProps) {
                    setImageContent(newProps.image);
                }
            })
    }

    const onEdit = (prop, val) => {
        setNewProps({
            [prop]: val,
        });
    }

    const onChange = (prop="text", text) => {
        setTextContent(text);

        let newProperties = {
            ...block.properties
        }

        newProperties[prop] = [[text]];

        patchBlock(block.id, {
            properties: newProperties,
        })
    }

    return (
        <>
        <Modal
            title="Settings"
            open={isModalOpen}
            onCancel={closeModal}
            onClose={closeModal}
            onOk={submitModal}
        >   
            <Typography.Paragraph>
                Text
                <Input defaultValue={textContent} onChange={(e) => onEdit('text', [[e.target.value]])} />
            </Typography.Paragraph>
            <Typography.Paragraph>
                Image URL
                <Input defaultValue={imageContent} onChange={(e) => onEdit('image', [[e.target.value]])} />
            </Typography.Paragraph>
        </Modal>
        <Card
            style={{
                width: '50%',
                overflow: 'hidden',
            }}
            cover={<Image alt="Image" src={imageContent} style={{minHeight: "100px"}} className='flex aling-items-center'/>}
            actions={[
                <SettingOutlined key="setting" onClick={openModal}/>,
            ]}   
        >
            <Meta title={
                textContent === '' ?
                "Untitled" :
                textContent
            }/>
        </Card>
        </>
    );
};

export default ImageBlock;
