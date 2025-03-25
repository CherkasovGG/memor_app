import React from 'react';

import { Typography } from 'antd';
import TextContent from '../TextBlock/TextContent';


const HeadingBlock = ({ block, level, inline=false }) => {
    return (
        <Typography.Title level={level}>
            <TextContent block={block} />
        </Typography.Title>
    );
};

export default HeadingBlock;