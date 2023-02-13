"use client"
import { useEffect } from 'react'
import React from 'react'

const useDarkMode=()=>{
    useEffect(()=>{
        const root = window.document.documentElement;

        root.classList.add('dark');
    },[])
}

export default useDarkMode;