import React from 'react';
import HeadingBlock from './HeadingBlock';

const Heading3Block = ({ block, inline=false }) => {
    return (
        <HeadingBlock block={block} inline={inline} level={3}/>
    );
};

export default Heading3Block;