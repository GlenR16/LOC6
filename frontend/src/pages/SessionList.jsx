import { useEffect, useState } from "react";
import useAxiosAuth from "../api/api";
import { NavLink } from "react-router-dom";

export default function SessionList() {
    const axios = useAxiosAuth();
    const [sessionList, setSessionList] = useState([]);

    useEffect(() => {
        axios.get("/gameSessions/").then((response) => {
            setSessionList(response.data);
        });
    },[]);

	return (
		<section className="bg-base-100">
			<div className="p-4 mx-auto lg:py-16">
				<div className="w-3/4 mx-auto">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>Created At</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
                            {
                                sessionList.length == 0?
                                <tr>
                                    <td colSpan="3" className="text-center">No Sessions</td>
                                </tr>
                                :
                                sessionList.map((session, index) => (
                                    <tr key={index}>
                                        <th>{index+1}</th>
                                        <th>{session.created_at}</th>
                                        <td>
                                            <NavLink to={`/history/${session.id}`}>View</NavLink>
                                        </td>
                                    </tr>
                                ))
                            }
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
