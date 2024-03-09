import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axiosAuth from "../api/api.js";

export default function Session() {
	const [mediaSource, setMediaSource] = useState("");
	const [video, setVideo] = useState(null);
    const [mediaSources, setMediaSources] = useState([]);
	const [error, setError] = useState("");


	const axios = axiosAuth();
	const navigate = useNavigate();

	async function getMediaSources() {
		try {
			if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.enumerateDevices) 
            {setError("Error accessing video sources");
            return [];}
            const sources = await navigator.mediaDevices.enumerateDevices();
            console.log(sources.filter(source => source.kind === "videoinput"));
            setMediaSources(sources.filter(source => source.kind === "videoinput"));
            setError("");
		} catch (err) {
			setError("Error accessing video sources");
			return [];
		}
	}

	function startSession(e) {
		e.preventDefault();
		 axios.post("/gameSessions/")
		 .then(res=>{
			let data = res.data;
			navigate(`/session/${data.id}?deviceID=${mediaSource}`);
		 })
		 .catch(err=>setError("Error starting session"));
	}


    useEffect(() => {
        getMediaSources();
    }, []);

	useEffect(() => {
		if (mediaSource) {
			(async () => {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: {
							deviceId: mediaSource,
						},
					});
					setVideo(stream);

	// setVideo("");
						console.log(stream);
				} catch (err) {
					setError("Error accessing video source");
				}
			})();
		}
		
	}, [mediaSource]);


	return (
		<div className="lg-flex ">
			<video 
			ref={(videoRef) => {
            if (videoRef) {
              videoRef.srcObject = video;
            }
        }}
		   autoPlay></video>
			<form onSubmit={startSession}>
				<select value={mediaSource} onChange={(e) => setMediaSource(e.target.value)}>
					<option value="">Select a video source</option>
					{mediaSources.length && mediaSources.map((source) => (
                        <option key={source.deviceId} value={source.deviceId}>
                            {source.label}
                        </option>
                    ))}
				</select>
				<button type="submit">Start Session</button>
				{error && <div>{error}</div>}
			</form>
		</div>
	);
}
