import React, { useRef, useState } from 'react';

import { Input } from 'antd';
import { patchBlock } from '../../../../client/notes/block';
import { BlockStateManager } from '../../../../state/StateManager';

import classes from "./TextBlock.module.css";


const TextContent = ({ block, onChange, field = "text", defaultValue = ""}) => {
    const [textContent, setTextContent] = useState(block.properties[field] ? block.properties[field][0][0] : "");
    const textRef = useRef(null);

    const handleChange = (text) => {
        if (text === textContent) {
            return;
        }

        setTextContent(text);

        patchBlock(block.id, {
            properties: {
                ...block.properties,
                [field]: [[text]],
            }
        })
            .then((data) => {
                if (onChange) {
                    onChange();
                }
            })
    }

    const onKeyDown = (event) => {
        if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            BlockStateManager.lowerBlockPosition(block.id);

            setTimeout(() => {
                if (textRef.current) {
                    textRef.current.focus();
                }
            }, 0);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            BlockStateManager.raiseBlockPosition(block.id);

            setTimeout(() => {
                if (textRef.current) {
                    textRef.current.focus();
                }
            }, 0);
        }
    };

    return (
        <Input.TextArea
            autoSize 
            className={classes.text}
            defaultValue={textContent ? textContent : defaultValue}
            onBlur={(e) => handleChange(e.target.value)}
            onKeyDown={onKeyDown}
            ref={textRef}
            placeholder='Type text...'
            style={{
                border: 'none',
                outline: 'none',
                marginBottom: -8,
            }}
        />
    );
};

export default TextContent;