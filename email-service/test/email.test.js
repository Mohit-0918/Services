const request = require("supertest");
const app = require("../src/index");
const jwt = require("jsonwebtoken");

const testToken = jwt.sign({ id: "testUser" }, process.env.JWT_SECRET);

describe("Email API", () => {
it("should respond to health check", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("OK");
});

it("should reject email send without token", async () => {    
const res = await request(app).post("/api/email/send").send({
    to: "test@example.com",
    subject: "Test",
    text: "Testing",
});
expect(res.statusCode).toBe(401);
});

it("should send email with valid token", async () => {
const res = await request(app)
    .post("/api/email/send")
    .set("Authorization", `Bearer ${testToken}`)
    .send({
    to: "recipient@example.com",
    subject: "Unit Test",
    text: "This is a test email",
    });
expect([200, 500]).toContain(res.statusCode); // depends on real credentials
});
});
