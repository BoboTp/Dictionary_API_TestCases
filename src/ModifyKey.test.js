const request = require('supertest')
const authenticationID = process.env.AUTH;


describe('This test Modifies Key values to a Dictionary', () => {


	/////////////////////////
	//					   //
	//    TEST-CASE -- 9   //
	//					   //
	/////////////////////////

	//Create a KEY-VALUE and modify the VALUE to be a NUMBERIC, SPECIAL CHARACTER and BLANK(null)
    test('Modify A KEY', async () => {
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
            raghul: expect.any(String)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary        
        expect(getKey.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey.body.raghul).toMatch("thimma")




        //Modify the dictionary by passing a numberic value 500
        var raghulKeyResp2 = await request("https://dictionary.iachieved.it")
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: 500
        })
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        expect(raghulKeyResp2.statusCode).toBe(200);
        expect(raghulKeyResp2.body).toBe("")

        var getKey2 = await request("https://dictionary.iachieved.it")
        .get("/dictionary/"+dictID+"/keys")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")

        expect(getKey2.statusCode).toBe(200)
        expect(getKey2.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            raghul: expect.any(Number)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary is modified and changed to 500               
        expect(getKey2.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey2.body.raghul).toBe(500)




        //Modify the dictionary by passing Special Characters
        var raghulKeyResp2 = await request("https://dictionary.iachieved.it")
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: "@##%$###$^#$^"
        })
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        expect(raghulKeyResp2.statusCode).toBe(200);
        expect(raghulKeyResp2.body).toBe("")

        var getKey2 = await request("https://dictionary.iachieved.it")
        .get("/dictionary/"+dictID+"/keys")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")

        expect(getKey2.statusCode).toBe(200)
        expect(getKey2.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            raghul: expect.any(String)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary is modified and changed to special character            
        expect(getKey2.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey2.body.raghul).toMatch("@##%$###$^#$^")




        //Modify the dictionary by passing a blank space(null)
        var raghulKeyResp2 = await request("https://dictionary.iachieved.it")
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: null
        })
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        expect(raghulKeyResp2.statusCode).toBe(200);
        expect(raghulKeyResp2.body).toBe("")

        var getKey2 = await request("https://dictionary.iachieved.it")
        .get("/dictionary/"+dictID+"/keys")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")

        expect(getKey2.statusCode).toBe(200)
        expect(getKey2.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            raghul: null
        }))
        //Checking the two Key-Value pairs that is present in the dictionary is modified and changed to null
        expect(getKey2.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey2.body.raghul).toBe(null)
    })



	/////////////////////////
	//					   //
	//    TEST-CASE --10   //
	//					   //
	/////////////////////////

	//Create a KEY-VALUE and modify the VALUE WITHOUT passing any VALUE parameter
    test('Modify A KEY WITHOUT PASSING VALUE', async () => {
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
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: "thimma"
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
            raghul: expect.any(String)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary        
        expect(getKey.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey.body.raghul).toMatch("thimma")


        var raghulKeyResp2 = await request("https://dictionary.iachieved.it")
        .post("/dictionary/"+dictID+"/keys/raghul")
        //Modifiying the Key without sending any parameters for VALUE
        .send({
        })
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        expect(raghulKeyResp2.statusCode).toBe(200);
        expect(raghulKeyResp2.body).toBe("")

        var getKey2 = await request("https://dictionary.iachieved.it")
        .get("/dictionary/"+dictID+"/keys")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")

        expect(getKey2.statusCode).toBe(200)
        expect(getKey2.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            raghul: null
        }))
        //Checking the two Key-Value pairs that is present in the dictionary, the modified should be null as we did not pass any VALUE
        expect(getKey2.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey2.body.raghul).toBe(null)
        
    })


	/////////////////////////
	//					   //
	//    TEST-CASE --11   //
	//					   //
	/////////////////////////

	//Create a KEY-VALUE and modify the VALUE WITHOUT passing any content in BODY
    test('Modify A KEY WITHOUT BODY VALUE', async () => {
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
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: "thimma"
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
            raghul: expect.any(String)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary              
        expect(getKey.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey.body.raghul).toMatch("thimma")

        var raghulKeyResp2 = await request("https://dictionary.iachieved.it")
        .post("/dictionary/"+dictID+"/keys/raghul")
        .set("Authorization", authenticationID)
        .set("Content-Type", "application/json")
        //The value returned must be error as no parameter is entered in the BODY 
        expect(raghulKeyResp2.statusCode).toBe(200);
        expect(raghulKeyResp2.body).toEqual(expect.objectContaining({
            error: "error"
        }))
    })


	/////////////////////////
	//					   //
	//    TEST-CASE --12   //
	//					   //
	/////////////////////////

	//Create a KEY-VALUE and modify the VALUE by passing WRONG authorization
    test('Modify A KEY WITHOUT AUTH', async () => {
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
        .post("/dictionary/"+dictID+"/keys/raghul")
        .send({
            value: "thimma"
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
            raghul: expect.any(String)
        }))
        //Checking the two Key-Value pairs that is present in the dictionary              
        expect(getKey.body.id).toMatch(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/)
        expect(getKey.body.raghul).toMatch("thimma")

        var raghulKeyResp2 = await request("https://dictionary.iachieved.it")
        .post("/dictionary/"+dictID+"/keys/raghul")
        .set("Authorization", "Basic wrongAuth")
        .set("Content-Type", "application/json")
   		//Response code to be 410, due to wrong Authorization
        expect(raghulKeyResp2.statusCode).toBe(401);
        expect(raghulKeyResp2.body).toEqual(expect.objectContaining({}))
    })
   
})