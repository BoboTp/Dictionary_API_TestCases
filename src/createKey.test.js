const request = require('supertest')
const authenticationID = process.env.AUTH;

describe('This test Creates Key values to a Dictionary', () => {

	/////////////////////////
	//					   //
	//    TEST-CASE -- 6   //
	//					   //
	/////////////////////////

	//Create a KEY-VALUE with valid details
    test('CREATE A KEY', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
		//Create dictionary WITH valid Authorization, Content-type = application/json        	
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toBe(null);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
        expect(response.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        // WE get a Dictionary !
        // Now that we are going to try creating a key
        const dictID = response.body.id;
        const raghulKeyResp = await request("https://dictionary.iachieved.it")
        //Passing a valid KEY-VALUE pair
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: "thimma"
        })
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        //Response-code should be 200 
        expect(raghulKeyResp.statusCode).toBe(200);
        expect(raghulKeyResp.body).toBe("")

        //To check if key really exists, using GET KEYS
        const getKey = await request("https://dictionary.iachieved.it")
        .get("/dictionary/"+dictID+"/keys")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")

        expect(getKey.statusCode).toBe(200)
        expect(getKey.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            raghul: expect.any(String)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary
        expect(getKey.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey.body.raghul).toMatch("thimma")

    })


	/////////////////////////
	//					   //
	//    TEST-CASE -- 7   //
	//					   //
	/////////////////////////

	//Create a Key without passing value
    test('CREATE A KEY WITHOUT VALUE', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
		//Create dictionary WITH valid Authorization, Content-type = application/json        	        
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toBe(null);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
        expect(response.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        // WE get a Dictionary !
        // Now that we are going to try creating a key
        const dictID = response.body.id;
        const raghulKeyResp = await request("https://dictionary.iachieved.it")
        //Passing a valid KEY WITHOUT any VALUE         
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
        })
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        expect(raghulKeyResp.statusCode).toBe(200);
        expect(raghulKeyResp.body).toBe("")

        //To check if key really exists 
        const getKey = await request("https://dictionary.iachieved.it")
        .get("/dictionary/"+dictID+"/keys")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")

        expect(getKey.statusCode).toBe(200)
        expect(getKey.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            raghul: null
        }))
        //Checking the two Key-Value pairs that is present in the dictionary , the key we created must be NULL since we did not pass any value      
        expect(getKey.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey.body.raghul).toBe(null)

    })


	/////////////////////////
	//					   //
	//    TEST-CASE -- 8   //
	//					   //
	/////////////////////////

	//Create a Key withoyt passing body
    test('CREATE A KEY WITHOUT PASSING BODY', async () => {
        const response = await request("https://dictionary.iachieved.it")
        .post("/dictionary")
		//Create dictionary WITH valid Authorization, Content-type = application/json        	        
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toBe(null);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
        expect(response.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        // WE get a Dictionary !
        // Now that we are going to try creating a key
        const dictID = response.body.id;
        const raghulKeyResp = await request("https://dictionary.iachieved.it")
        //Passing a valid KEY WITHOUT any Content in the BODY         ]
        .post("/dictionary/"+dictID+"/keys/raghul")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        console.log(dictID)
        expect(raghulKeyResp.statusCode).toBe(200);
        //The value returned must be error as no parameter is entered in the BODY 
        expect(raghulKeyResp.body).toEqual(expect.objectContaining({
            error: "error"
        }))
        //To check if key really exists 

    })
})