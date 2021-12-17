import React, { MouseEventHandler } from 'react';

import { UiNodeAttributes, UiText } from '@ory/client/api';
import {
    getNodeLabel,
    isUiNodeAnchorAttributes,
    isUiNodeImageAttributes,
    isUiNodeInputAttributes,
    isUiNodeScriptAttributes,
    isUiNodeTextAttributes,
} from '@ory/integrations/ui';
import { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';

export const messagesView = (messages: Array<UiText>) =>
    messages.map(message => <div>{message.text}</div>);

export const toUiNodePartial = (node: UiNode) => {
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
            case 'checkbox':
                return (
                    <fieldset>
                        <div>
                            <input name={node.attributes.name} type="hidden" value="false" />
                            <input
                                name={node.attributes.name}
                                id={node.attributes.name}
                                type={node.attributes.type}
                                value="true"
                                placeholder={getNodeLabel(node)}
                                checked={node.attributes.value}
                                disabled={node.attributes.disabled}
                            />
                            <label id={node.attributes.name}>
                                <svg
                                    width="8"
                                    height="7"
                                    viewBox="0 0 8 7"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M7.75 1.8125L2.75 6.8125L0.25 4.3125L1.1875 3.375L2.75 4.9375L6.8125 0.875L7.75 1.8125Z"
                                        fill="#F9F9FA"
                                    />
                                </svg>
                                <span>{getNodeLabel(node)}</span>
                            </label>
                        </div>
                        {node.messages && node.messages.length > 0 && (
                            <div>
                                {node.messages.map(msg => (
                                    <span id={msg.id.toString()}>{msg.text}</span>
                                ))}
                            </div>
                        )}
                    </fieldset>
                );
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
