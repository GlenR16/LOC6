export default function SessionList() {
	return (
		<section className="bg-base-100">
			<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
				<div className="overflow-x-auto">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>Created At</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
                            
							<tr>
								<th>1</th>
								<td>Cy Ganderton</td>
								<td>Quality Control Specialist</td>
								<td>Blue</td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
