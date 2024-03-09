import {Outlet} from "react-router-dom"
import {useEffect, useState} from "react"
import cv from "@techstark/opencv-js";

export const GamesLayout = () => {
    useEffect(() => {
        // window.navigator.mediaDevices.getUserMedia({video: true})
        //     .then((stream) => {


        cv.onRuntimeInitialized = () => {
            console.log("OpenCV.js is ready");
        };
    }, []);
    return (
        <div>
        <Outlet/>
        </div>
    );
    }