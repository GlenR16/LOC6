import AttentivenessChart from "../components/AttentivenessChart";
import GameDistributionChart from "../components/GameDistributionChart";
import { useParams } from "react-router-dom";
import useAxiosAuth from "../api/api";
import { useEffect, useState } from "react";

export default function SessionDetail() {
    const {sessionID} = useParams();
    const [data, setData] = useState([]);
    const api = useAxiosAuth();

    useEffect(() => {
        api.get(`/sessionDataPoints/${sessionID}/`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return (
        <section className="bg-base-100">
			<div className="p-4 mx-auto lg:py-16">
				<div className="w-3/4 mx-auto">
                    <AttentivenessChart data={data} />
                    <GameDistributionChart data={data} />
				</div>
			</div>
		</section>
    );
}
