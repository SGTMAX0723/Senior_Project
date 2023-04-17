'use client';

import React, { useEffect, useState } from 'react';
import { pb } from '../../../../components/UserAuthentication';

interface Component {
    type?: string;
    tagName?: string;
    attributes?: {
        [key: string]: string;
    };
    components?: Component[];
    content?: string;
}

interface Frame {
    component: Component;
}

interface Page {
    frames: Frame[];
    type: string;
    id: string;
}

interface Style {
    selectors: string[];
    style: {
        [key: string]: any;
    };
}

const Preview: React.FC = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [styles, setStyles] = useState<Style[]>([]);

    useEffect(() => {
        const url: any = window.location.href;
        const urlArray: any = url.split('/');
        const pid: any = urlArray[urlArray.length - 2];

        async function fetchJson() {
            const jsonList = await pb.collection('projects').getList<any>(1, 50, {
                filter: 'created >= "2022-01-01 00:00:00" && id = ' + '"' + pid + '"',
            });

            setJsonArray(jsonList.items);
        }

        fetchJson();
    }, [jsonArray]);

    useEffect(() => {
        if (jsonArray.length > 0) {
            // const page = jsonArray[0].page_contents.pages[0];
            if (jsonArray[0].page_contents !== null) {
                setStyles(jsonArray[0].page_contents.styles);
            }
        }
    }, [jsonArray]);

    const getStylesForComponent = (id: string): { [key: string]: any } => {
        const styleObj = styles.find((style) => style.selectors.includes('#' + id));

        return styleObj ? styleObj.style : {};
    };

    const renderComponent = (component: Component): React.ReactNode => {
        if (component.type === 'textnode') {
            return component.content;
        }

        const tagName = component.tagName || 'div';
        const attributes = component.attributes || {};
        const children = (component.components || []).map(renderComponent);
        const style = component.attributes && component.attributes.id ? getStylesForComponent(component.attributes.id) : {};

        if (attributes.src && attributes.src.startsWith('data:image/')) {
            // If the src attribute starts with 'data:image/', assume it's a base64 encoded image
            const imgSrc = `data:image/png;base64,${attributes.src.split(',')[1]}`;
            return React.createElement('img', { ...attributes, src: imgSrc, style }, ...children);
        } else if (attributes.src && attributes.src.startsWith('http')) {
            return React.createElement('img', { ...attributes, style }, ...children);
        } else if (component.type === 'link') {
            return React.createElement('a', { ...attributes, href: attributes.href, style }, ...children);
        }
        else {
            return React.createElement(tagName, { ...attributes, style }, ...children);
        }
    };

    if (!jsonArray.length || jsonArray[0].page_contents === null) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Project is null
            </div>
        );
    } else {
        const page = jsonArray[0].page_contents.pages[0];
        const styleTags = styles.map((style, index) => (
            <style key={index}>
                {style.selectors.join(', ')} {
                    Object.keys(style.style).map((key) => {
                        const value = style.style[key];
                        return `${key}: ${value};`;
                    }).join(' ')
                }
            </style>
        ));

        return (
            <>
                <div>
                    {page.frames.map((frame:any, index:number) => (
                        <React.Fragment key={index}>{renderComponent(frame.component)}</React.Fragment>
                    ))}
                </div>
                <head>
                    {styleTags}
                </head>
            </>
        );
    }
};

export default Preview;
