import cv, { log } from "@techstark/opencv-js";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PlayCard from "../components/PlayCard.jsx";
import Hangman from "../games/Hangman.jsx";
import useAxiosAuth from "../api/api.js";
import MemoryGame from "../games/CardGame.jsx";

export default function Playground() {
	const [queryparams, setQueryParams] = useSearchParams();
	const [games, setGames] = useState([]);
	const [currentGame, setCurrentGame] = useState(null);
	const [timerout, setTimerout] = useState(null);
	const [gameAnalytics, setGameAnalytics] = useState({
		active_time: 0,
		game: null,
	});

	const api = useAxiosAuth();
	const navigate = useNavigate();
	const { sessionID } = useParams();

	// const [test, setTest] = useState(null);

	const dummyGames = [
		{
			id: 6,
			object: <Hangman />,
		},
		{
			id: 8,
			object: <MemoryGame />,
		},
	];

	const videoRef = useRef();

	function createFileFromUrlAsync(path, url) {
		console.log("Loading file: ", path);
		return new Promise((resolve, reject) => {
			console.log("Loading file: ", path);
			fetch(url)
				.then((res) => res.arrayBuffer())
				.then((data) => {
					cv.FS_createDataFile("/", path, new Uint8Array(data), true, false, false);
					console.log("file loaded: ", path);
					resolve();
				})
				.catch((err) => {
					console.error("Failed to load " + url + " status: " + err);
					reject();
				});
		});
	}

	function handleSessionClose() {
		if (document.fullscreenElement) document.exitFullscreen();
		api.post("/sessionDataPoints/", {
			game: currentGame,
			active_time: gameAnalytics.active_time,
		});
		api.delete(`/gameSessions/active/`)
			.then((res) => {
				navigate("/dashboard");
			})
			.catch((err) => console.error(err));
	}

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

	useEffect(() => {
		const id = queryparams.get("deviceID");
		if (id == "") navigate("/dashboard");
		api.get("/gameSessions/active/")
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
							console.log("Stream: ", stream);
							// setTest(stream);
							document.documentElement.requestFullscreen();
						})
						.catch((error) => console.error("Error accessing camera:", error));
				}
			})
			.catch(() => navigate("/dashboard"));
	}, []);

	useEffect(() => {
		api.get("/user/games/")
			.then((res) => {
				setGames(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	async function processVideo() {
		if (!window.faceClassifier) {
			window.faceClassifier = new cv.CascadeClassifier();
			await createFileFromUrlAsync("haarcascade_frontalface_default.xml", "http://localhost:5173/models/haarcascade_frontalface_default.xml");
			window.faceClassifier.load("haarcascade_frontalface_default.xml");
		}
		if (videoRef.current && window.faceClassifier) {
			const [WIDTH, HEIGHT] = [640, 480];
			let capture = new cv.VideoCapture(videoRef.current);
			let src = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC4);
			capture.read(src);
			let gray = new cv.Mat(HEIGHT, WIDTH, cv.CV_8UC1);
			cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
			let faces = [];
			let size;
			let faceVect = new cv.RectVector();
			let eyeVect = new cv.RectVector();
			let faceMat = new cv.Mat();
			let eyeMat = new cv.Mat();
			cv.pyrDown(gray, faceMat);
			cv.pyrDown(faceMat, faceMat);

			size = faceMat.size();
			faceClassifier.detectMultiScale(faceMat, faceVect);
			for (let i = 0; i < faceVect.size(); i++) {
				let face = faceVect.get(i);
				faces.push(new cv.Rect(face.x, face.y, face.width, face.height));
			}
			if (faceVect.size() > 0) {
				setGameAnalytics((prev) => {
					return {
						...prev,
						active_time: prev.active_time + 1,
					};
				});
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
		if (videoRef.current) processVideo();
	}, [videoRef.current]);

	useEffect(() => {
		if (timerout) {
			setTimerout((timerout) => {
				clearInterval(timerout);
				return null;
			});
		}
		if (currentGame) {
			setTimerout(
				setInterval(() => {
					api.post("/sessionDataPoints/", {
						game: currentGame,
						active_time: gameAnalytics.active_time,
					});
				}, 30000)
			);
		}
	}, [currentGame]);

	return (
		<div className="m-5">
			<video
				ref={videoRef}
				id="liveVideo"
				className="hidden"
				width={640}
				height={480}
				autoPlay
				onChange={(e) => {
					console.log(e);
				}}></video>
			<div className="flex flex-col items-center">
				<h3 className="w-full flex flex-row justify-between my-2">
					<div className="flex flex-row gap-2">
						<button type="button" onClick={handleSessionClose} className="btn btn-accent">
							Exit
						</button>
						{currentGame ? (
							<button type="button" onClick={() => setCurrentGame(null)} className="btn btn-accent">
								Back
							</button>
						) : (
							""
						)}
					</div>
					<div className="text-3xl font-semibold">Playground</div>
				</h3>
				<div className="p-2 flex flex-wrap gap-10 ">
					{currentGame ? (
						<div id="gameContainer">
							{dummyGames.map((game) => {
								if (game.id == currentGame) return game.object;
							})}
						</div>
					) : games.length == 0 ? (
						<div className="fs-5 text-center w-full">No games added yet!</div>
					) : (
						games.map((game) => <PlayCard key={game.id} title={game.name} setCurrentGame={setCurrentGame} categories={game.tags} id={game.id} imageUrl={game?.image} />)
					)}
				</div>
			</div>
		</div>
	);
}
