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
import React, { useEffect, useState, useRef } from 'react';
import grapesjs from 'grapesjs';
import thePlugin from 'grapesjs-plugin-export';


const GrapesJS = () => {
    // Use hooks 'useRef' and 'useEffect' to create the editor instance and manage the state of the component.
    const editorRef = useRef(null);

    const url = window.location.href;
    const parts = url.split('/');
    const projectId = parts[parts.length - 1];

    // Sets up the editor instance when the component is first rendered and sets up the layout, blocks, and 
    // panels for the editor. The editor instance is stored in a ref so that it can be used across multiple renders.
    useEffect(() => {
        if (!editorRef.current) {
            const editor = grapesjs.init({
                // Indicate where to init the editor. You can also pass an HTMLElement
                container: '#gjs',
                // Get the content for the canvas directly from the element
                // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
                pageManager: {
                    appendTo: '#gjs',
                    
                    // Enable the possibility to load and store on the server
                    // `storeOnChange` - store data automatically when the canvas is changed
                    // `storeAfterLoad` - store data automatically after loading the page
                    // `autoload` - load stored data automatically on init
                    storeOnChange: true,
                    storeAfterLoad: true,
                    autoload: true,
                    // `type` - the name of the property of the model
                    // `urlStore` - url for storing the model
                    // `urlLoad` - url for loading the model
                    type: 'remote',
                    stepsBeforeSave: 1,
                    options: {
                        remote: {
                            urlStore: `http://localhost:3000/api/update-project/${projectId}`,
                            urlLoad: `http://localhost:3000/api/fetch-project/${projectId}`,
                        }
                    }
                },
                plugins: [
                    editor => thePlugin(editor, { btnLabel: 'export-zip' }),
                  ],
                // Size of the editor
                height: '100%',
                width: 'auto',
                // Disable the storage manager for the moment
                storageManager: {
                    type: 'remote',
                    stepsBeforeSave: 1,
                    options: {
                        remote: {
                            urlStore: `http://localhost:3000/api/update-project/${projectId}`,
                            urlLoad: `http://localhost:3000/api/fetch-project/${projectId}`,
                        }
                    }
                },
                // Avoid any default panel
                layerManager: {
                    appendTo: '.layers-container'
                },
                deviceManager: {
                    devices: [{
                        name: 'Desktop',
                        width: '', // default size
                    }, {
                        name: 'Mobile',
                        width: '320px', // this value will be used on canvas width
                        widthMedia: '480px', // this value will be used in CSS @media
                    }]
                },
                panels: { defaults: [{
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
                    }, {
                        id: 'panel-switcher',
                        el: '.panel__switcher',
                        buttons: [{
                            id: 'show-layers',
                            active: true,
                            label: 'Layers',
                            command: 'show-layers',
                            // Once activated disable the possibility to turn it off
                            togglable: false,
                        }, {
                            id: 'show-style',
                            active: true,
                            label: 'Styles',
                            command: 'show-styles',
                            togglable: false,
                        }, {
                            id: 'show-traits',
                            active: true,
                            label: 'Traits',
                            command: 'show-traits',
                            togglable: false,
                        }],
                    }, {
                        id: 'panel-devices',
                        el: '.panel__devices',
                        buttons: [{
                            id: 'device-desktop',
                            label: 'D',
                            command: 'set-device-desktop',
                            active: true,
                            togglable: false,
                        }, {
                            id: 'device-mobile',
                            label: 'M',
                            command: 'set-device-mobile',
                            togglable: false,
                        }],
                    }] },
                    selectorManager: {
                        appendTo: '.styles-container'
                    },
                    blockManager: {
                    appendTo: '#blocks',
                    blocks: [
                        {
                        id: 'section', // id is mandatory
                        label: '<b>Section</b>', // You can use HTML/SVG inside labels
                        // category: 'Basic',
                        attributes: { class:'fa fa-square-o' },
                        content: `
                        <section>
                            <h1>This is a simple title</h1>
                            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                        </section>`,
                        }, {
                        id: 'text',
                        label: 'Text',
                        // category: 'Basic',
                        attributes: { class:'fa fa-font' },
                        content: '<div data-gjs-type="text">Insert your text here</div>',
                        }, {
                        id: 'image',
                        label: 'Image',
                        attributes: { class:'fa fa-picture-o' },
                        // category: 'Basic',
                        // Select the component once it's dropped
                        select: true,
                        // You can pass components as a JSON instead of a simple HTML string,
                        // in this case we also use a defined component type `image`
                        content: { type: 'image' },
                        // This triggers `active` event on dropped components and the `image`
                        // reacts by opening the AssetManager
                        activate: true,
                        }, {
                            id: 'div',
                            label: 'div',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: { type: 'div' },
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        }, {
                            id: 'title',
                            label: 'Title',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: { type: 'title' },
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        }
                    ]
                },
                styleManager: {
                    appendTo: '.styles-container',
                    sectors: [{
                        name: 'Dimension',
                        open: false,
                        // Use built-in properties
                        buildProps: ['width', 'min-height', 'padding'],
                        // Use `properties` to define/override single property
                        properties: [
                        {
                            // Type of the input,
                            // options: integer | radio | select | color | slider | file | composite | stack
                            type: 'integer',
                            name: 'The width', // Label for the property
                            property: 'width', // CSS property (if buildProps contains it will be extended)
                            units: ['px', '%'], // Units, available only for 'integer' types
                            defaults: 'auto', // Default value
                            min: 0, // Min value, available only for 'integer' types
                        }
                        ]
                    }, {
                        name: 'Extra',
                        open: false,
                        buildProps: ['background-color', 'box-shadow'],
                        property: 'href'
                    },
                    {
                        name: 'Typography',
                        open: false,
                        buildProps: ['Font-size', 'font-family' ],
                        properties: [
                            'font-weight',
                            'letter-spacing',
                            'line-height',
                            'color',
                            {
                                extend: 'text-align',
                                options: [
                                  { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                                  { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                                  { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                                  { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                                ],
                            },
                            {
                                id: 'Font-size',
                                type: 'number',
                                label: 'Font size',
                                property: 'font-size',
                                default: '8px',
                                units: ['px', '%'],
                                min: 8,
                            },
                            {
                                property: 'text-decoration',
                                type: 'radio',
                                default: 'none',
                                options: [
                                  { id: 'none', label: 'None', className: 'fa fa-times'},
                                  { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                                  { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                                ],
                            },
                        ]
                    }]
                },
                traitManager: {
                    appendTo: '.traits-container',
                    property: 'link'
                },
            });
            
            //Allows user to add link
            editor.BlockManager.add('link', {
                id: 'link',
                label: 'Link',
                content: '<a href="#"><span data-gjs-editable="true">Link text</span></a>',
                attributes: { class:'fa fa-link' },
                // category: 'Basic',
                onRender: function() {
                  var $block = this.getEl();
                  var $saveBtn = $block.querySelector('.gjs-block-btn-save');
                  var $input = $block.querySelector('[name="href"]');
                  $saveBtn.addEventListener('click', function() {
                    var href = $input.value;
                    if (href) {
                      $block.innerHTML = '<a href="' + href + '"><span data-gjs-editable="true">' + $block.textContent + '</span></a>';
                    }
                  });
                }
            });
              

            // Define commands
            editor.Commands.add('show-layers', {
                getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
                getLayersEl(row) { return row.querySelector('.layers-container') },
            
                run(editor, sender) {
                const lmEl = this.getLayersEl(this.getRowEl(editor));
                lmEl.style.display = '';
                },
                stop(editor, sender) {
                const lmEl = this.getLayersEl(this.getRowEl(editor));
                lmEl.style.display = 'none';
                },
            });
            editor.Commands.add('show-styles', {
                getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
                getStyleEl(row) { return row.querySelector('.styles-container') },
            
                run(editor, sender) {
                const smEl = this.getStyleEl(this.getRowEl(editor));
                smEl.style.display = '';
                },
                stop(editor, sender) {
                const smEl = this.getStyleEl(this.getRowEl(editor));
                smEl.style.display = 'none';
                },
            });
            editor.Commands.add('show-traits', {
                getTraitsEl(editor) {
                const row = editor.getContainer().closest('.editor-row');
                return row.querySelector('.traits-container');
                },
                run(editor, sender) {
                this.getTraitsEl(editor).style.display = '';
                },
                stop(editor, sender) {
                this.getTraitsEl(editor).style.display = 'none';
                },
            });
            editor.Commands.add('set-device-desktop', {
                run: editor => editor.setDevice('Desktop')
            });
            editor.Commands.add('set-device-mobile', {
                run: editor => editor.setDevice('Mobile')
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
                active: true, // active by default
                className: 'btn-toggle-borders',
                label: '<u>B</u>',
                command: 'sw-visibility', // Built-in command
                }, 
                {
                id: 'export',
                className: 'btn-open-export',
                label: 'Exp',
                command: 'export-template',
                context: 'export-template', // For grouping context of buttons from the same panel
                }, {
                id: 'show-json',
                className: 'btn-show-json',
                label: 'JSON',
                context: 'show-json',
                command(editor) {
                        editor.Modal.setTitle('Components JSON')
                        .setContent(`<textarea style="width:100%; height: 250px;">
                            ${JSON.stringify(editor.getComponents())}
                        </textarea>`)
                        .open();
                    },
                }
            ],
            });

            console.log('Editor created');
            editorRef.current = editor;
        }
    }, []);

    return (
        <div id="gjs">
            <h1>Hello World Component!</h1>,
        </div>
    );
};

// export for use
export default GrapesJS