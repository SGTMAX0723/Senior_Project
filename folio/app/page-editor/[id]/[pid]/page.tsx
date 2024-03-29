'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import  { pb } from 'components/UserAuthentication';
import GrapesJS_Init from '../../../../components/GrapesJS_Init.js';

const Editor = () => {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        // This forces a rerender, so the page is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    if (isLoggedIn) {
        return (
            <html>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>GrapesJS</title>
                <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css" />
                <script src="//unpkg.com/grapesjs"></script>
                <style>
                    {`
                        .panel__top {
                            padding: 0;
                            width: 100%;
                            display: flex;
                            position: initial;
                            justify-content: center;
                            justify-content: space-between;
                        }
                        .panel__basic-actions {
                            position: initial;
                        }                      
                        #gjs {
                            border: none;
                        }
                        /* Reset some default styling */
                        .gjs-cv-canvas {
                            top: 0;
                            width: 100%;
                            height: 100%;
                        }
                        .gjs-block {
                            width: auto;
                            height: auto;
                            min-height: auto;
                        }
                        .editor-row {
                            display: flex;
                            justify-content: flex-start;
                            align-items: stretch;
                            flex-wrap: nowrap;
                            height: calc(100% - 40px);
                        }
                        .editor-canvas {
                            flex-grow: 1;
                        }
                        .panel__right {
                            flex-basis: 230px;
                            position: relative;
                            overflow-y: auto;
                            height: 100%;
                        } 
                        .panel__devices {
                            position: initial;
                        }       
                        .panel__switcher {
                            position: initial;
                        }    
                        /* Primary color for the background */
                        .gjs-one-bg {
                            background-color: #141015;
                        }

                        /* Secondary color for the text color */
                        .gjs-two-color {
                            color: rgba(255, 255, 255, 0.7);
                        }

                        /* Tertiary color for the background */
                        .gjs-three-bg {
                            background-color: #ec5896;
                            color: white;
                        }

                        /* Quaternary color for the text color */
                        .gjs-four-color,
                        .gjs-four-color-h:hover {
                            color: #c495cb;
                        }                                                                                            
                    `}
                </style>
            </head>
            <body className='h-screen'>
                <div className="panel__top">
                    <div className="panel__basic-actions"></div>
                    <div className="panel__devices"></div>
                    <div className="panel__switcher"></div>
                </div>
                <div className="editor-row">
                    <div className="editor-canvas overflow-auto">
                        <GrapesJS_Init />
                    </div>
                    <div className="panel__right">
                        <div className="layers-container"></div>
                        <div className="styles-container"></div>
                        <div className="traits-container"></div>
                        <div id="blocks"></div>
                    </div>
                </div>
            </body>
        </html>
        );
    } else {
        router.push('/login')
    }
};

export default Editor;