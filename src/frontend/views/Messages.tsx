import React from 'react';

import { UiText } from '@ory/client/api';

interface Props {
    messages: Array<UiText>;
}

export const Messages: React.FC<Props> = props => {
    const { messages } = props;
    return (
        <div>
            {messages.map(msg => (
                <div>{msg.text}</div>
            ))}
        </div>
    );
};
