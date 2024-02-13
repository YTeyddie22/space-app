// Using describe function
// Testing intergration.
const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoDisconnect } = require("../utils/mongo");

describe("Launches API", () => {
	//Runs once before all the tests are performed
	beforeAll(async () => {
		await mongoConnect();
	});

	afterAll(async () => {
		await mongoDisconnect();
	});
	//Testing for get launches endpoint
	describe("Test GET /v1/launches", () => {
		test("It should respond with 200 success", async () => {
			const response = await request(app)
				.get("/v1/launches")
				.expect("Content-type", /json/)
				.expect(200);
		});
	});
	// Test for POST launches
	describe("Test POST /v1/launches", () => {
		const completeLaunch = {
			mission: "Uss Enerprise",
			rocket: "NCC 1234",
			target: "Kepler-62 f",
			launchDate: "2023-09-21T21:00:00.000Z",
			destination: "Maruila",
		};

		const launchWithoutDestination = {
			mission: "Uss Enerprise",
			rocket: "NCC 1234",
			target: "Kepler-62 f",
		};

		const launchInvaliDate = {
			mission: "Uss Enerprise",
			rocket: "NCC 1234",
			target: "Kepler-62 f",
			launchDate: "Ted",
			destination: "Maruila",
		};
		test("It should respond with 201 created", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(completeLaunch)
				.expect("Content-type", /json/)
				.expect(201);

			const requestDate = new Date(completeLaunch.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();

			expect(responseDate).toBe(requestDate);
			expect(response.body).toMatchObject(completeLaunch);
		});

		test("It should catch missing required properties", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(launchWithoutDestination)
				.expect("Content-type", /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: "Missing required field",
			});
		});
		test("It should catch invalid dates", async () => {
			const response = await request(app)
				.post("/v1/launches")
				.send(launchInvaliDate)
				.expect("Content-type", /json/)
				.expect(400);

			expect(response.body).toStrictEqual({
				error: "Invalid date for launching",
			});
		});
	});
});
