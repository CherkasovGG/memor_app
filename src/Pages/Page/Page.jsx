import React, { useState } from 'react';
import Menu from './Menu/Menu';


const Page = ({ children }) => {
    const [reloadMenu, setReloadMenu] = useState(false);

    const reload = () => {
        setReloadMenu(!reloadMenu);
    }

    return (
        <div className="flex row align-items-left w100vw" style={{padding: "50px"}}>
            <div className="flex column">
                <Menu reload={reload}/>
            </div>
            <div style={{
                width: "-webkit-fill-available",
                padding: "0 200px 50px 200px",
            }}>
                {children}
            </div>
        </div>
    );
};

export default Page;