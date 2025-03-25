import React, { useEffect, useState } from 'react';

import classes from './Block.module.css';

import TextBlock from './Blocks/TextBlock/TextBlock';
import PageBlock from './Blocks/PageBlock/PageBlock';
import WorkSpaceBlock from './Blocks/WorkSpaceBlock/WorkSpaceBlock';

import { getBlock, patchBlock } from '../../client/notes/block';
import ContentCtx from './ContentCtx/ContentCtx';
import { EventEmitter } from '../../events/events';
import HeadingBlock from './Blocks/HeadingBlock/HeadingBlock';
import Heading3Block from './Blocks/HeadingBlock/Heading3Block';
import QuoteBlock from './Blocks/QuoteBlock/QuoteBlock';
import Heading1Block from './Blocks/HeadingBlock/Heading1Block';
import Heading2Block from './Blocks/HeadingBlock/Heading2Block';
import ImageBlock from './Blocks/ImageBlock/ImageBlock';
import CheckBoxBlock from './Blocks/CheckBoxBlock/CheckBoxBlock';
import { useParams } from 'react-router-dom';


const Block = ({ id, onError, inline=false, inline_content=false, ...props }) => {
  const [block, setBlock] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reload, setReload] = useState(false);

  const { pageId } = useParams();

  if (pageId !== id) {
      inline = true;
  }

  const updateData = () => {
    setLoading(true);

    getBlock(id)
      .then((data) => {
        setBlock({
          ...data
        });

        EventEmitter.subscribe('update-block-' + data.id, updateData);

        setReload(!reload)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);

        if (onError) {
          onError();
        } 
        
        setLoading(false);
      })
  }

  useEffect(() => {
    updateData();
  }, [id]);

  const patchContent = (content) => {
    if (block.content === content)
        return;

    block.content = content.filter((val, i) => !val.startsWith("skeleton-"));

    patchBlock(block.id, {
      content: block.content,
    })
      .then(reposnse => {
        if (block.type === 'workspace') {
          EventEmitter.emit('updateMenu');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  if (block === null) {
    return (
      <div className={classes.wrap}>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.loading}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div className={classes.error}>Error: {error.message}</div>
    );
  }

  return (
    <div className={classes.wrap} id={"block-" + id}>
      {
        {
          "text": <TextBlock block={block} inline={inline}/>,
          "h1": <Heading1Block block={block} inline={inline} />,
          "h2": <Heading2Block block={block} inline={inline} />,
          "h3": <Heading3Block block={block} inline={inline} />,
          "quote": <QuoteBlock block={block} inline={inline} />,
          "image": <ImageBlock block={block} inline={inline} />,
          "page": <PageBlock block={block} inline={inline}/>,
          "check-box": <CheckBoxBlock block={block} inline={inline}/>,
          "workspace": <WorkSpaceBlock block={block} inline={inline} inline_content={true}/>,
        }[block.type]
      }
      {
        block === null || (inline && block.type === "page") ?
        null :
        <ContentCtx key={reload} inline={inline_content || block.type === "workspace" || block.type === "page"} block={block} onUpdate={(reorderedItems) => {
          patchContent(reorderedItems)
        }}/>
      }
    </div>
  );
};

export default Block;
