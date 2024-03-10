import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosAuth from "../api/api.js";
import Navbar from "../components/Navbar.jsx";

export default function Session() {
  const [mediaSource, setMediaSource] = useState("");
  const [video, setVideo] = useState(null);
  const [mediaSources, setMediaSources] = useState([]);
  const [error, setError] = useState("");

  const axios = axiosAuth();
  const navigate = useNavigate();

  async function getMediaSources() {
    try {
      if (
        !window.navigator.mediaDevices ||
        !window.navigator.mediaDevices.enumerateDevices
      ) {
        setError("Error accessing video sources");
        return [];
      }
      const sources = await navigator.mediaDevices.enumerateDevices();
      console.log(sources.filter((source) => source.kind === "videoinput"));
      setMediaSources(sources.filter((source) => source.kind === "videoinput"));
      setError("");
    } catch (err) {
      setError("Error accessing video sources");
      return [];
    }
  }

  function startSession(e) {
    e.preventDefault();
    axios
      .post("/gameSessions/")
      .then((res) => {
        let data = res.data;
        navigate(`/session/${data.id}?deviceID=${mediaSource}`);
      })
      .catch((err) => setError("Error starting session"));
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
    <>
      <Navbar />
      <section className="bg-base-100">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 gap-4">
          <div className="mr-auto place-self-center lg:col-span-7 flex items-center justify-center w-full">
            {video ? (
              <video
                className="rounded-lg"
                ref={(videoRef) => {
                  if (videoRef) {
                    videoRef.srcObject = video;
                  }
                }}
                autoPlay
              ></video>
            ) : (
              <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-lg">
                <p className="text-2xl font-semibold text-gray-600">
                  No video source selected
                </p>
              </div>
            )}
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex">
            <form
              onSubmit={startSession}
              className="flex flex-col items-center justify-center w-full gap-5"
            >
              <h4 className="text-xl font-semibold">Ready to start ?</h4>
              <select
                value={mediaSource}
                onChange={(e) => setMediaSource(e.target.value)}
                className="select select-bordered w-4/5"
              >
                <option value="">Select a video source</option>
                {mediaSources.length &&
                  mediaSources.map((source, index) => (
                    <option key={source.deviceId} value={source.deviceId}>
                      {source.label ? source.label : "Camera " + index}
                    </option>
                  ))}
              </select>
              <button type="submit" className="btn btn-accent">
                Start Session
              </button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
