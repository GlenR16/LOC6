import {useEffect} from "react"
import cv from "@techstark/opencv-js";

export const GamesLayout = () => {
    useEffect(() => {
        cv.onRuntimeInitialized = () => {
            console.log("OpenCV.js is ready");
        };
    }, []);
    return (
        <div>
        <h1>Games</h1>
        </div>
    );
    }