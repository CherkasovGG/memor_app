import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import classes from './Block.module.css';
import BlockText from './Blocks/TextBlock/TextBlock';


const BlockSceleton = ({ id, ...props }) => {
    return (
        <div className={classes.wrap} {...props}>
            <BlockText block={{
                properties : {
                    text: [["123"]]
                }
            }}/>
            123
        </div>
    );
};

export default BlockSceleton;
