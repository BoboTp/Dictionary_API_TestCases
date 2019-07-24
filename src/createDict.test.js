const request = require('supertest')
const authenticationID = process.env.AUTH;

describe('This Test creates a dictionary',  () => {

	/////////////////////////
	//					   //
	//    TEST-CASE -- 1   //
	//					   //
	/////////////////////////

	//Create dictionary WITH valid Authorization, Content-type = application/json
    test('CREATE DICTIONARY WITH PROPER SETTINGS ', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
        //Correct Authorization and correct content-type
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response code to be 201 and the body returned should not be null
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toBe(null);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
        //Check the id generated using regex pattern
        expect(response.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
    })


	/////////////////////////
	//					   //
	//    TEST-CASE -- 2   //
	//					   //
	/////////////////////////

	//Create dictionary WITH valid Authorization, Content-type = random
    test('CREATE DICTIONARY WITH WRONG CONTENT TYPE ', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
        .set("Authorization", authenticationID)
        //Correct Authorization and random content-type       
        .set("Content-Type", "random")
        //Response code is 201 and the body returned should not be null
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toBe(null);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
        expect(response.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
    })


	/////////////////////////
	//					   //
	//    TEST-CASE -- 3   //
	//					   //
	/////////////////////////

	//Create dictionary WITHOUT passing Authorization, Content-type = application/json
    test('CREATE DICTIONARY WITH NO AUTHORIZATION ', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
        //Authoriztion parameter not given, just the content-type
        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response code to be 410 since no Authorization
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual(expect.objectContaining({}));
    })

	/////////////////////////
	//					   //
	//    TEST-CASE -- 4   //
	//					   //
	/////////////////////////

	//Create dictionary WITH WRONG Authorization, Content-type = application/json
    test('CREATE DICTIONARY WITH WRONG AUTHORIZATION ', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
        //Wrong Authorization and correct content-type
        .set("Authorization", "Basic wrongAuthorization")
        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response code to be 410 since wrong Authorization
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual(expect.objectContaining({}));
    })


	/////////////////////////
	//					   //
	//    TEST-CASE -- 5   //
	//					   //
	/////////////////////////

	//Create dictionary with valid Authorization, Content-type = application/json and passing a random POST Data
    test('CREATE DICTIONARY WITH RANDOM POST DATA - IT SHOULDNT CARE ', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
        //Correct Authorization , correct content-type along with random data in the body
        .send({id: "skdfjdl"})
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response code is 201 and the body returned should not be null
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toBe(null);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
        expect(response.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
    })
    
    
})

