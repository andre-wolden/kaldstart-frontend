import React from 'react';

export const LogoutButton: React.FC<{ logoutUrl: string }> = props => {
    const handleClick = () => {
        window.location.href = props.logoutUrl;
    };

    return <button onClick={handleClick}>Logout</button>;
};
