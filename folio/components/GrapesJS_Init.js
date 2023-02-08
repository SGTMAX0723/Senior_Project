/*
***********************************************************************************************************************
** This is just a very ROUGH implementation with a lot of hardcoding to just get it to work. After this component w- **
** orks as intended, I'm going to create seperate components for the layout, blocks, pannels, etc. to help with code **
** reusability and reduce it's complexity. This will help you identify and isolate areas of the code that can be im- **
** proved, making it easier to debug and update = better readability and maintainability.                            **
***********************************************************************************************************************
*/

// Include client directive to indicate that the component should only be used in the client-side context.
// The "useRef" hook can only be used in client-side components and not in server-side components, due to 
// the fact that React is only running on the client-side and not on the server-side.
'use client'

// Importing the required libraries and dependencies
import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

const GrapesJS = () => {
    // Use hooks 'useRef' and 'useEffect' to create the editor instance and manage the state of the component.
    const editorRef = useRef(null);

    // Sets up the editor instance when the component is first rendered and sets up the layout, blocks, and 
    // panels for the editor. The editor instance is stored in a ref so that it can be used across multiple renders.
    useEffect(() => {
        if (!editorRef.current) {
            const editor = grapesjs.init({
                container: '#gjs',
                height: '94.5%',
                width: 'auto',
                fromElement: true,
                storageManager: false,
                layerManager: {
                    appendTo: '.layers-container'
                },
                panels: {
                    defaults: [{
                        id: 'layers',
                        el: '.panel__right',
                        // Make the panel resizable
                        resizable: {
                            maxDim: 350,
                            minDim: 200,
                            tc: 0, // Top handler
                            cl: 1, // Left handler
                            cr: 0, // Right handler
                            bc: 0, // Bottom handler
                            // Being a flex child we need to change `flex-basis` property
                            // instead of the `width` (default)
                            keyWidth: 'flex-basis',
                        },
                    }]
                },
                blockManager: {
                    appendTo: '#blocks',
                    blocks: [
                        {
                            id: 'section',
                            label: '<b>Section</b>',
                            attributes: { class: 'gjs-block-section' },
                            content: `
                            <section>
                                <h1>This is a simple title</h1>
                                <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                            </section>`,
                        },
                        {
                            id: 'text',
                            label: 'Text',
                            content: '<div data-gjs-type="text">Insert your text here</div>',
                        },
                        {
                            id: 'image',
                            label: 'Image',
                            select: true,
                            content: { type: 'image' },
                            activate: true,
                        }
                    ]
                },
            });

            editor.Panels.addPanel({
                id: 'panel-top',
                el: '.panel__top',
            });

            editor.Panels.addPanel({
                id: 'basic-actions',
                el: '.panel__basic-actions',
                buttons: [
                    {
                        id: 'visibility',
                        active: true,
                        className: 'btn-toggle-borders',
                        label: '<u>B</u>',
                        command: 'sw-visibility',
                    },
                    {
                        id: 'export',
                        className: 'btn-open-export',
                        label: 'Exp',
                        command: 'export-template',
                        context: 'export-template',
                    },
                    {
                        id: 'show-json',
                        className: 'btn-show-json',
                        label: 'JSON',
                        context: 'show-json',
                        command(editor) {
                            editor.Modal.setTitle('Components JSON')
                                .setContent(`
                                <textarea style="width:100%; height: 250px;">
                                    ${JSON.stringify(editor.getComponents())}
                                </textarea>`)
                                .open();
                        },
                    }
                ],
            });
            editorRef.current = editor;
        } else {
            editorRef.current.setComponents(`<h1>Test Component</h1>`);
        }
    }, []);

    // Component returns the JSX that represents the layout of the editor which includes a grid layout with 5 columns 
    // and 3 rows. The grid layout contains the panels and blocks for the editor and the editor itself.
    return (
        <main className='grid grid-flow-col grid-cols-5 h-screen max-w-[94%]'>
            {/* <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css" /> */}
            <div className='col-span-4 grid grid-rows-3'>
                <div class="panel__top">
                    <div class="panel__basic-actions"></div>
                </div>
                <div className='row-span-3' id="gjs">
                    <h1>Test Component</h1>
                </div>
            </div>
            <div>
                <div class="panel__right">
                    <div class="layers-container"></div>
                    <div className='w-full self-end' id="blocks" ></div>
                </div>
            </div>
        </main>
    );
};

// export for use
export default GrapesJS