import React, { MouseEventHandler } from 'react';

import { UiText } from '@ory/client/api';
import {
    getNodeLabel,
    isUiNodeAnchorAttributes,
    isUiNodeImageAttributes,
    isUiNodeInputAttributes,
    isUiNodeScriptAttributes,
    isUiNodeTextAttributes,
} from '@ory/integrations/ui';
import { UiNode } from '@ory/kratos-client';

export const messagesView = (messages: Array<UiText>) =>
    messages.map(message => <div>{message.text}</div>);

export // This helper function translates the html input type to the corresponding partial name.
const toUiNodePartial = (node: UiNode) => {
    if (isUiNodeAnchorAttributes(node.attributes)) {
        return (
            <div>
                <a href={node.attributes.href}>{node.attributes.title.text}</a>
                {node.messages && messagesView(node.messages)}
            </div>
        );
    } else if (isUiNodeImageAttributes(node.attributes)) {
        return (
            <img
                src={node.attributes.src}
                width={node.attributes.width}
                height={node.attributes.height}
                alt={getNodeLabel(node)}
            />
        );
    } else if (isUiNodeInputAttributes(node.attributes)) {
        switch (node.attributes.type) {
            case 'hidden':
                return (
                    <input
                        name={node.attributes.name}
                        type="hidden"
                        value={node.attributes.value}
                    />
                );
            case 'submit':
                return (
                    <div>
                        <button
                            onClick={
                                node.attributes
                                    .onclick as unknown as MouseEventHandler<HTMLButtonElement>
                            }
                            name={node.attributes.name}
                            type={node.attributes.type}
                            value={node.attributes.value}
                            disabled={node.attributes.disabled}
                        >
                            {getNodeLabel(node)}
                        </button>
                        {node.messages && (
                            <span>
                                {node.messages.map(uiText => (
                                    <div id={uiText.id.toString()}>{uiText.text}</div>
                                ))}
                            </span>
                        )}
                    </div>
                );
            case 'button':
                return 'ui_node_input_button';
            case 'checkbox':
                return 'ui_node_input_checkbox';
            default:
                return 'ui_node_input_default';
        }
    } else if (isUiNodeScriptAttributes(node.attributes)) {
        return 'ui_node_script';
    } else if (isUiNodeTextAttributes(node.attributes)) {
        return 'ui_node_text';
    }

    return 'ui_node_input_default';
};
