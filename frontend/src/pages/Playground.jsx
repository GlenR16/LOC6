import cv, { log } from "@techstark/opencv-js";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useAxiosAuth from "../api/api.js";

export default function Playground() {
  const [queryparams, setQueryParams] = useSearchParams();

  const api = useAxiosAuth();
  const navigate = useNavigate();
  const { sessionID } = useParams();

  const [test, setTest] = useState(null);

  const videoRef = useRef();
  const canvasRef = useRef();

  function createFileFromUrl(path, url, callback) {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function (ev) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let data = new Uint8Array(request.response);
          cv.FS_createDataFile("/", path, data, true, false, false);
          callback();
        } else {
          console.error("Failed to load " + url + " status: " + request.status);
        }
      }
    };
    request.send();
  }

  function createFileFromUrlAsync(path, url) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onload = function (ev) {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = new Uint8Array(request.response);
            cv.FS_createDataFile("/", path, data, true, false, false);
            resolve();
          } else {
            console.error(
              "Failed to load " + url + " status: " + request.status
            );
            reject();
          }
        }
      };
      request.send();
    });
  }

  useEffect(() => {
    const id = queryparams.get("deviceID");
    if (id == "") navigate("/dashboard");
    cv.onRuntimeInitialized = () => {
      api
        .get("/gameSessions/active")
        .then((res) => {
          const data = res.data;
          if (data?.id != sessionID) navigate("/dashboard");
          else {
            navigator.mediaDevices
              .getUserMedia({
                video: { deviceId: data.id },
              })
              .then((stream) => {
                videoRef.current.srcObject = stream;
                setTest(stream);
            })
              .catch((error) =>
                console.error("Error accessing camera:", error)
              );
          }
        })
        .catch(() => navigate("/dashboard"));
    };
  }, []);

  async function processVideo() {
    console.log("Processing Video");
    if(!window.faceClassifier){
        window.faceClassifier = new cv.CascadeClassifier();
        // await createFileFromUrlAsync(
        //   "haarcascade_frontalface_default.xml",
        //   "http://localhost:5173/models/haarcascade_frontalface_default.xml"
        // );
        // window.faceClassifier.load("haarcascade_frontalface_default.xml");
        // await createFileFromUrlAsync(
        //   "haarcascade_eye.xml",
        //     "http://localhost:5173/models/haarcascade_eye.xml"
        // );
        // window.faceClassifier.load("haarcascade_eye.xml");
        await createFileFromUrlAsync(
            "haarcascade_profileface.xml",
            "http://localhost:5173/models/haarcascade_profileface.xml"
        );
        window.faceClassifier.load("haarcascade_profileface.xml");
    }
        if(videoRef.current) {
            const [WIDTH, HEIGHT] = [640, 480];
            console.log("Video Ref Exists");
            console.log("Width: ", WIDTH, "Height: ", HEIGHT)
            let capture = new cv.VideoCapture(videoRef.current);
            console.log("Capture: ", capture)
            let src = new cv.Mat(
              HEIGHT,
              WIDTH,
              cv.CV_8UC4
            );
            console.log(videoRef.current.srcObject);
            console.log(src.rowRange(0, src.rows))
            capture.read(src);
            let gray = new cv.Mat(
              HEIGHT,
              WIDTH,
              cv.CV_8UC1
            );
            console.log("Src: ", src.size(), "Gray: ", gray.size())
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
            cv.imshow("canvasOutput", gray);
            let faces = [];
            let eyes = [];
            let size;
            let faceVect = new cv.RectVector();
            let eyeVect = new cv.RectVector();
            let faceMat = new cv.Mat();
            let eyeMat = new cv.Mat();
            cv.pyrDown(gray, faceMat);
            cv.pyrDown(faceMat, faceMat);
            console.log("Src: ", src.size(), "Gray: ", gray.size())
            // console.log("FaceMat Size:", faceMat.size());
            size = faceMat.size();
            window.faceClassifier.detectMultiScale(faceMat, faceVect);
            for (let i = 0; i < faceVect.size(); i++) {
              let face = faceVect.get(i);
              faces.push(new cv.Rect(face.x, face.y, face.width, face.height));
            }
            console.log(faces);
            if (faceVect.size() > 0) {
              console.log("Face Detected");
            } else {
              console.log("No Face Detected");
            }
            faceMat.delete();
            faceVect.delete();
            eyeMat.delete();
            eyeVect.delete();
            src.delete();
            gray.delete();

            await new Promise((resolve) => setTimeout(resolve, 1000));
            requestAnimationFrame(processVideo);
        }
  }

  useEffect(() => {
      processVideo();
  }, []);

//   useEffect(() => {
//     let faceClassifier = new cv.CascadeClassifier();
//     createFileFromUrl(
//       "haarcascade_frontalface_default.xml",
//       "http://localhost:5173/models/haarcascade_frontalface_default.xml",
//       () => {
//         faceClassifier.load("haarcascade_frontalface_default.xml");
//         if (videoRef.current) processVideo();
//       }
//     );
//   }, []);

  return (
    <div>
      <video
        ref={videoRef}
        id="liveVideo"
        width={640}
        height={480}
        autoPlay
        onChange={(e) => {
          console.log(e);
        }}
      ></video>
        <canvas ref={canvasRef} id="canvasOutput" width={640} height={480}></canvas>
      <h1>Playground</h1>
      <p>Feel free to play around with the code in this file.</p>
    </div>
  );
}
