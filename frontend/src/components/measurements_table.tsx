import { FaArrowDown, FaArrowUp, FaEquals, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";

export default function MeasurementsTable({
	measurements,
	onEdit,
	onDelete,
}: {
	measurements: { weight: string; timestamp: string }[];
	onEdit: (index: number) => void;
	onDelete: (index: number) => void;
}) {
	const [showMenuIndex, setShowMenuIndex] = useState<number | null>(null);

	const calculateDaysDifference = (date1: string, date2: string) => {
		const diffTime = Math.abs(
			new Date(date1).getTime() - new Date(date2).getTime()
		);
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	return (
		<div className="w-full p-2 m-2 overflow-y-scroll border border-yellow-600 rounded-lg">
			<table className="w-full table-auto h-fit">
				<thead className="bg-stone-700 text-stone-50">
					<tr>
						<th className="p-2 border-b border-yellow-600">Weight</th>
						<th className="p-2 border-b border-yellow-600">Days</th>
						<th className="p-2 border-b border-yellow-600">Date</th>
						<th className="p-2 border-b border-yellow-600">Trend</th>
						<th className="p-2 border-b border-yellow-600">Actions</th>
					</tr>
				</thead>
				<tbody>
					{measurements.map(({ weight, timestamp }, index) => {
						const prevWeight =
							index > 0 ? parseFloat(measurements[index - 1].weight) : null;
						const currentWeight = parseFloat(weight);
						const weightDifference =
							prevWeight !== null ? currentWeight - prevWeight : null;

						const trendIcon =
							prevWeight === null ? (
								<div className="flex items-center gap-2">
									<FaEquals className="text-blue-500" />
									<span className="text-sm text-gray-400">N/A</span>
								</div>
							) : currentWeight > prevWeight ? (
								<div className="flex items-center gap-2">
									<FaArrowUp className="text-red-500" />
									<span className="text-sm text-red-400">
										+{weightDifference} kg
									</span>
								</div>
							) : currentWeight < prevWeight ? (
								<div className="flex items-center gap-2">
									<FaArrowDown className="text-green-500" />
									<span className="text-sm text-green-400">
										{weightDifference} kg
									</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<FaEquals className="text-blue-500" />
									<span className="text-sm text-blue-400">0 kg</span>
								</div>
							);

						const daysDifference =
							index > 0
								? calculateDaysDifference(
										timestamp,
										measurements[index - 1].timestamp
								  )
								: "-";

						return (
							<tr key={index} className="text-stone-50">
								<td className="p-2 text-center ">{weight} kg</td>
								<td className="p-2 text-center ">{daysDifference}</td>
								<td className="p-2 text-center ">
									{new Date(timestamp).toLocaleDateString("en-GB")}
								</td>
								<td className="flex justify-center p-2 ">{trendIcon}</td>
								<td className="relative p-2 text-center">
									<button
										className="text-gray-300"
										onClick={() =>
											setShowMenuIndex(showMenuIndex === index ? null : index)
										}
									>
										<FaEllipsisV />
									</button>
									{showMenuIndex === index && (
										<div
											className="fixed z-10 border border-yellow-600 rounded shadow-md bg-stone-800"
											style={{
												top: `${
													document
														.querySelectorAll("tr")
														[index]?.getBoundingClientRect()?.bottom
												}px`,
												right: `${
													document
														.querySelectorAll("tr")
														[index]?.getBoundingClientRect()?.left
												}px`,
											}}
										>
											<button
												className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-stone-700"
												onClick={() => {
													setShowMenuIndex(null);
													onEdit(index);
												}}
											>
												Edit
											</button>
											<button
												className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-stone-700"
												onClick={() => {
													setShowMenuIndex(null);
													onDelete(index);
												}}
											>
												Delete
											</button>
										</div>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
