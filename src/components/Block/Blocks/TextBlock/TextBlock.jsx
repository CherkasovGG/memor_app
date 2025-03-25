import React from 'react';

import { Typography } from 'antd';

import classes from "./TextBlock.module.css";
import TextContent from './TextContent';


const TextBlock = ({ block }) => {
    return (
        <Typography.Text className={classes.wrap}>
            <TextContent block={block} />
        </Typography.Text>
    );
};

export default TextBlock;
