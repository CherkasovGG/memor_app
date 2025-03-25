import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import Page from '../Page/Page';
import Block from '../../components/Block/Block';
import { getWorkspace } from '../../client/notes/workspace';


const WorkSpace = () => {
    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {
        getWorkspace()
            .then(data => setWorkspace(data))
    }, []);

    if (!workspace) {
        return <>Loading...</>;
    }

    return (
        <Navigate to={"/app/page/" + workspace.id} />
    );
};

export default WorkSpace;