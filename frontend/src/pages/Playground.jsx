import cv from "@techstark/opencv-js"
import useAxiosAuth from "../api/api.js";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Playground() {
    const [deviceID, setDeviceID] = useState("");
    const [video, setVideo] = useState(null);
    const api = useAxiosAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const params = new URLSearchParams(url);
        const id = params.get("id");
        if(id) setDeviceID(id);
        else navigate("/dashboard");


        
    }, []);

    useEffect(() => {
        

    return (
        <div>
        <h1>Playground</h1>
        <p>Feel free to play around with the code in this file.</p>
        </div>
    );
    }