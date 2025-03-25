import React from 'react';

import { Typography } from 'antd';

import TextContent from '../TextBlock/TextContent';


const QuoteBlock = ({ block }) => {
    return (
        <Typography.Paragraph>
            <blockquote style={{margin: 0}}>
                <TextContent block={block}/>
            </blockquote>
        </Typography.Paragraph>
    );
};

export default QuoteBlock;
