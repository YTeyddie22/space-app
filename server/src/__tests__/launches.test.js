// Using describe function
// Testing intergration.
const request = require("supertest");
const app = require("../app");

//Testing for get launches endpoint
describe("Test GET /launches", () => {
	test("It should respond with 200 success", async () => {
		const response = await request(app)
			.get("/launches")
			.expect("Content-type", /json/)
			.expect(200);
	});
});

// Test for POST launches
describe("Test POST /launches", () => {
	const completeLaunch = {
		mission: "Uss Enerprise",
		rocket: "NCC 1234",
		target: "Kepler ttyl34",
		launchDate: "September 22, 2023",
		destination: "Maruila",
	};

	const launchWithoutDestination = {
		mission: "Uss Enerprise",
		rocket: "NCC 1234",
		target: "Kepler ttyl34",
	};

	const launchInvaliDate = {
		mission: "Uss Enerprise",
		rocket: "NCC 1234",
		target: "Kepler ttyl34",
		launchDate: "Ted",
		destination: "Maruila",
	};
	test("It should respond with 201 created", async () => {
		const response = await request(app)
			.post("/launches")
			.send(completeLaunch)
			.expect("Content-type", /json/)
			.expect(201);

		const requestDate = new Date(completeLaunch.launchDate).valueOf();
		const responseDate = new Date(response.body.launchDate).valueOf();

		expect(responseDate).toBe(requestDate);
		expect(response.body).toMatchObject(launchWithoutDestination);
	});

	test("It should catch missing required properties", async () => {
		const response = await request(app)
			.post("/launches")
			.send(launchWithoutDestination)
			.expect("Content-type", /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: "Missing required field",
		});
	});
	test("It should catch invalid dates", async () => {
		const response = await request(app)
			.post("/launches")
			.send(launchInvaliDate)
			.expect("Content-type", /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: "Invalid date for launching",
		});
	});
});
