import React, { HTMLAttributeReferrerPolicy, MouseEventHandler, useMemo } from 'react';

import {
    UiNodeAnchorAttributes,
    UiNodeImageAttributes,
    UiNodeMeta,
    UiNodeScriptAttributes,
    UiNodeTextAttributes,
    UiText,
} from '@ory/client/api';
import {
    getNodeLabel,
    isUiNodeAnchorAttributes,
    isUiNodeImageAttributes,
    isUiNodeInputAttributes,
    isUiNodeScriptAttributes,
    isUiNodeTextAttributes,
} from '@ory/integrations/ui';
import { UiNodeAttributes, UiNodeInputAttributes } from '@ory/kratos-client';
import ReactJson from 'react-json-view';
import { useLocation } from 'react-router-dom';

export const messagesView = (messages: Array<UiText>) =>
    messages.map(message => <div>{message.text}</div>);

export const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
};

interface DefaultAttributes {
    required: boolean;
    name: string;
    type: string;
    value: string;
    disabled: boolean;
}

export interface UiNode {
    attributes: UiNodeAttributes;
    group: string;
    messages: Array<UiText>;
    meta: UiNodeMeta;
    type: string;
}

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
                return (
                    <fieldset
                        className="text-input-fieldset"
                        data-testid="node/input/{{attributes.name}}"
                    >
                        <label>
                            <span>
                                {getNodeLabel(node)}
                                {node.attributes.required && <span>*</span>}
                            </span>
                            this is the input
                            <input
                                name={node.attributes.name}
                                type={node.attributes.type}
                                placeholder={getNodeLabel(node)}
                                disabled={node.attributes.disabled}
                            />
                        </label>
                        {node.messages && node.messages.length > 0 && (
                            <div>
                                {node.messages.map(msg => (
                                    <span id={msg.id.toString()}>{msg.text}</span>
                                ))}
                            </div>
                        )}
                    </fieldset>
                );
        }
    } else if (isUiNodeScriptAttributes(node.attributes)) {
        return (
            <script
                src={node.attributes.src}
                type={node.attributes.type}
                integrity={node.attributes.integrity}
                referrerPolicy={
                    node.attributes.referrerpolicy as unknown as HTMLAttributeReferrerPolicy
                }
                crossOrigin={node.attributes.crossorigin}
                async={node.attributes.async}
            />
        );
    } else if (isUiNodeTextAttributes(node.attributes)) {
        return (
            <div>
                <p>{getNodeLabel(node)}</p>
                {node.attributes.text.id === 1050015 ? (
                    <div>
                        {node.attributes.text.context ? (
                            <ReactJson src={node.attributes.text.context} />
                        ) : (
                            <div>node.attributes.text.context is undefined</div>
                        )}
                    </div>
                ) : (
                    <pre>
                        <code>{node.attributes.text.text}</code>
                    </pre>
                )}
            </div>
        );
    }

    const attr = node.attributes as DefaultAttributes;
    return (
        <fieldset>
            <label>
                <span>
                    {getNodeLabel(node)}
                    {attr.required && <span className="required-indicator">*</span>}
                </span>
                registrate works perhaps
                <input
                    name={attr.name}
                    type={attr.type}
                    value={attr.value}
                    placeholder={getNodeLabel(node)}
                    disabled={attr.disabled}
                />
            </label>
            {node.messages && node.messages.length > 0 && (
                <div>
                    {node.messages.map(msg => (
                        <span id={msg.id.toString()}>{msg.text}</span>
                    ))}
                </div>
            )}
        </fieldset>
    );
};
