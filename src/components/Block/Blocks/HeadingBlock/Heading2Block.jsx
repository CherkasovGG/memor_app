import React from 'react';
import HeadingBlock from './HeadingBlock';

const Heading2Block = ({ block, inline=false }) => {
    return (
        <HeadingBlock block={block} inline={inline} level={2}/>
    );
};

export default Heading2Block;