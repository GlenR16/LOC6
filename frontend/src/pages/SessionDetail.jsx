import { useParams } from "react-router-dom";
import useAxiosAuth from "../api/api";
import { useEffect, useState } from "react";

export default function SessionDetail() {
    const {sessionID} = useParams();
    const axios = useAxiosAuth();
    const [sessionDataPoints, setSessionDataPoints] = useState([]); 
    const [session, setSession] = useState({});

    useEffect(() => {
        axios.get(`/sessionDataPoints/${sessionID}/`).then((response) => {
            setSessionDataPoints(response.data);
        });
        axios.get(`/gameSessions/${sessionID}/`).then((response) => {
            setSession(response.data);
        });
    }
    ,[]);

    return (
        <section className="bg-base-100">
			<div className="p-4 mx-auto lg:py-16">
				<div className="w-3/4 mx-auto">
					{JSON.stringify(session)}
                    {JSON.stringify(sessionDataPoints)}
				</div>
			</div>
		</section>
    );
}
