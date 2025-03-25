import React, { useState } from 'react';

import { Checkbox, Typography } from 'antd';
import { patchBlock } from '../../../../client/notes/block';
import TextContent from '../TextBlock/TextContent';


const CheckBoxBlock = ({ block }) => {
    const [checked, setChecked] = useState(block.properties.checked ? block.properties.checked[0][0] : false);

    const onChange = (prop, val) => {
        if (prop !== "text")
            setChecked(val);

        patchBlock(block.id, {
            properties: {
                ...block.properties,
                [prop]: [[val]],
            }
        })
    }

    return (
        <Checkbox onChange={(e) => onChange("checked", e.target.checked)} checked={checked}>
            <Typography.Text>
                <TextContent block={block} />
            </Typography.Text>
        </Checkbox>
    );
};

export default CheckBoxBlock;
