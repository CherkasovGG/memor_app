import React from 'react';
import HeadingBlock from './HeadingBlock';

const Heading1Block = ({ block, inline=false }) => {
    return (
        <HeadingBlock block={block} inline={inline} level={1}/>
    );
};

export default Heading1Block;