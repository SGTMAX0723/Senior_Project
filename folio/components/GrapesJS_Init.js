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
                plugins: [
                    editor => thePlugin(editor, { btnLabel: 'export-zip' }),
                ],
                // Size of the editor
                // height: '100%',
                // width: 'auto',
                storageManager: {
                    type: "local" && "remote",
                    options: {
                        local: {
                            stepsBeforeSave: 1,
                            autosave: true,
                            autoload: true,
                            autoloadCallback: (data) => {
                                Object.assign(localData, data);
                            },
                        },
                        remote: {
                            stepsBeforeSave: 1000000000,
                            urlStore: `http://localhost:3000/api/update-project/${projectId}`,
                            urlLoad: `http://localhost:3000/api/fetch-project/${projectId}`,
                        },
                    },
                },
                pageManager: {
                    appendTo: '#gjs',
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
                            label: '<i class="fa fa-desktop"></i>',
                            command: 'set-device-desktop',
                            active: true,
                            togglable: false,
                        }, {
                            id: 'device-mobile',
                            label: '<i class="fa fa-mobile" style="font-size: 1.25em;"></i>',
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
                                id: 'body',
                                label: 'Body',
                                category: 'Layout',
                                attributes: { class:'fa fa-square' },
                                content: `
                                    <body>
                                        <header style="height: 50px; background-color: #ddd;"></header>
                                        <main style="height: calc(100vh - 100px);"></main>
                                        <footer style="height: 50px; background-color: #ddd;"></footer>
                                    </body>
                                `,
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    margin: 0,
                                    padding: 0
                                }
                            },
                            {
                                id: 'section',
                                label: 'Section',
                                category: 'Layout',
                                attributes: { class: 'fa fa-square-o' },
                                content: `
                                    <section style="padding: 60px 0; background-color: #f8f9fa;">
                                        <div class="container">
                                            <div class="row justify-content-center">
                                                <div class="col-md-8">
                                                    <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 30px; text-align: center;">Section Title</h2>
                                                    <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                `,
                            },   
                            {
                                id: 'one-column',
                                label: '1 Column',
                                category: 'Layout',
                                attributes: { class:'fa fa-square' },
                                content: `
                                    <section style="padding: 50px;">
                                        <div style="display: flex; flex-direction: row;">
                                            <div class="col-md-4" style="padding: 20px;">
                                                <h3>Column 1</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mi et ex feugiat faucibus.</p>
                                            </div>
                                        </div>
                                    </section>
                                `
                            },
                            {
                                id: 'two-column',
                                label: '2 Column',
                                category: 'Layout',
                                attributes: { class:'fa fa-columns' },
                                content: `
                                    <section style="padding: 50px;">
                                        <div style="display: flex; flex-direction: row;">
                                            <div class="col-md-4" style="padding: 20px;">
                                                <h3>Column 1</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mi et ex feugiat faucibus.</p>
                                            </div>
                                            <div class="col-md-4" style="padding: 20px;">
                                                <h3>Column 2</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mi et ex feugiat faucibus.</p>
                                            </div>
                                        </div>
                                    </section>
                                `
                            },
                            {
                                id: 'three-column',
                                label: '3 Column',
                                category: 'Layout',
                                attributes: { class:'fa fa-th-large' },
                                content: `
                                    <section style="padding: 50px;">
                                        <div style="display: flex; flex-direction: row;">
                                            <div class="col-md-4" style="padding: 20px;">
                                                <h3>Column 1</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mi et ex feugiat faucibus.</p>
                                            </div>
                                            <div class="col-md-4" style="padding: 20px;">
                                                <h3>Column 2</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mi et ex feugiat faucibus.</p>
                                            </div>
                                            <div class="col-md-4" style="padding: 20px;">
                                                <h3>Column 3</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut mi et ex feugiat faucibus.</p>
                                            </div>
                                        </div>
                                    </section>
                                `
                            },                                                                                                               
                            {
                                id: 'image',
                                label: 'Image',
                                attributes: { class:'fa fa-picture-o' },
                                // Use `image` component
                                content: { type: 'image' },
                                // The component `image` is activatable (shows the Asset Manager).
                                // We want to activate it once dropped in the canvas.
                                activate: true,
                                // select: true, // Default with `activate: true`
                            },
                            {
                                id: 'video',
                                label: 'Video',
                                attributes: { class:'fa fa-video-camera' },
                                // Use `image` component
                                content: { type: 'video' },
                                // The component `image` is activatable (shows the Asset Manager).
                                // We want to activate it once dropped in the canvas.
                                activate: true,
                                // select: true, // Default with `activate: true`
                            },                                                                                                                                                                                             
                            {
                                id: 'text',
                                label: 'Text',
                                category: 'Basic',
                                attributes: { class:'fa fa-font' },
                                content: `
                                    <div style="max-width: 800px; margin: 0 auto;">
                                        <h2 style="text-align: center; font-size: 30px; margin-bottom: 50px;">Title goes here</h2>
                                        <p style="font-size: 18px; line-height: 1.5;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at turpis malesuada, posuere risus quis, congue magna. Nunc id odio quis tellus bibendum varius sit amet quis nisi. Duis a dui vel nisl fermentum elementum. Integer non tellus vel tellus posuere sollicitudin sit amet sed metus. Aenean eget risus vitae tortor laoreet ullamcorper. Sed non dolor non quam venenatis bibendum. Donec nec interdum quam. Aliquam erat volutpat. Morbi in cursus libero. Donec nec justo odio. Ut ut mi sed ipsum faucibus feugiat sit amet eu enim. </p>
                                    </div>
                                `
                            },   
                            {
                                id: 'button',
                                    label: 'Button',
                                    category: 'Basic',
                                    attributes: { class: 'fa fa-toggle-on' },
                                    content: '<a href="#" class="btn btn-primary" style="background-color: #c495cb; border: none; border-radius: 4px; color: #fff; font-size: 16px; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; cursor: pointer; transition-duration: 0.4s; box-shadow: 0px 8px 16px rgba(0,0,0,0.2)">Click me</a>',
                                    hoverStyle: {
                                        'background-color': '#b27cbb',
                                        'box-shadow': '0px 8px 16px rgba(0,0,0,0.4)'
                                    }
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
                    id: 'back-button',
                    className: 'btn-back',
                    label: '<i class="fa fa-arrow-left"></i>',
                    command(editor) {
                      window.history.back();
                    }
                  },
                {
                id: 'visibility',
                active: true, // active by default
                className: 'btn-toggle-borders',
                label: '<i class="fa fa-eye"></i>',
                command: 'sw-visibility', // Built-in command
                }, 
                {
                id: 'export',
                className: 'btn-open-export',
                label: '<i class="fa fa-download"></i>',
                command: 'export-template',
                context: 'export-template', // For grouping context of buttons from the same panel
                }, {
                id: 'show-json',
                className: 'btn-show-json',
                label: '<i class="fa fa-code"></i>',
                context: 'show-json',
                command(editor) {
                        editor.Modal.setTitle('Components JSON')
                        .setContent(`<textarea style="width:100%; height: 250px; background-color: #322e2f;">
                            ${JSON.stringify(editor.getComponents())}
                        </textarea>`)
                        .open();
                    },
                }, {}, // Separator
                {
                    id: 'save-project',
                    className: 'btn-save-project',
                    label: 'Save',
                    context: 'save-project',
                    command(editor) {
                        editor.store();
                    },
                },
            ],
            });

            console.log('Editor created');
            editorRef.current = editor;
        }
    });

    return (
        <div id="gjs">
            <h1>Hello World Component!</h1>,
        </div>
    );
};

// export for use
export default GrapesJS