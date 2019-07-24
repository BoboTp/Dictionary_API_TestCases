const request = require('supertest')
const authenticationID = process.env.AUTH;


describe('This test Deletes a Dictionary', () => {


	/////////////////////////
	//					   //
	//    TEST-CASE --13   //
	//					   //
	/////////////////////////

	//Delete a EXISTING dictionary WITH valid Authorization, Content-type = application/json
    test('Delete Existing ID', async () =>{
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
        // Once ID is verfied to be proper
        // We try to delete it
        dictID = response.body.id;
        const deleteResponse = await request("https://dictionary.iachieved.it")
                                        .delete("/dictionary/"+dictID)
                                        //Passing the correct Authorization and Content-type to delete it
                                        .set("Authorization", authenticationID)
                                        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response code to be 204 after deleting it successfully 
        expect(deleteResponse.statusCode).toBe(204);
        expect(deleteResponse.body).not.toBe(null);
        expect(deleteResponse.body).toEqual(expect.objectContaining({}))
        //Looks good... But if its really deleted ?
        //Re-running the deletion process again to check if the dictionary is deleted
        const deleteResponse2 = await request("https://dictionary.iachieved.it")
                                        .delete("/dictionary/"+dictID)
                                        .set("Authorization", authenticationID)
                                        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response-code should be 404 if tried to delete the dictionary second time
        expect(deleteResponse2.statusCode).toBe(404);
        expect(deleteResponse2.body).not.toBe(null);
        expect(deleteResponse2.body).toEqual(expect.objectContaining({}))
    })


	/////////////////////////
	//					   //
	//    TEST-CASE --14   //
	//					   //
	/////////////////////////

	//Delete a NON-EXISTING dictionary with valid Authorization, Content-type = application/json
    test('DELETE NON - EXISTING ID', async () => {
        const deleteResponse = await request("https://dictionary.iachieved.it")
                                        //Passing the correct Authorization and Content-type with WRONG ID
                                        .delete("/dictionary/"+"thisistpraghul")
                                        .set("Authorization", authenticationID)
                                        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response-code should be 404, since the ID does not exist
        expect(deleteResponse.statusCode).toBe(404);
        expect(deleteResponse.body).not.toBe(null);
        expect(deleteResponse.body).toEqual(expect.objectContaining({}))
    })

	/////////////////////////
	//					   //
	//    TEST-CASE --15   //
	//					   //
	/////////////////////////

	//Delete a dictionary WITH WRONG Authorization, Content-type = application/json
    test('DELETE A DICTIONARY WITH WRONG AUTHORIZATION', async () =>{
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
        // Once ID is verfied to be proper
        // We try to delete it
        dictID = response.body.id;
        const deleteResponse = await request("https://dictionary.iachieved.it")
                                        .delete("/dictionary/"+dictID)
                                        //Passing the WRONG Authorization and Content-type to delete it
                                        .set("Authorization", "Basic randomWRONGAUTH")
                                        .set("Content-Type", "application/x-www-form-urlencoded")
        //Response-code should be 401, since it is a wrong Authorization
        expect(deleteResponse.statusCode).toBe(401);
        expect(deleteResponse.body).not.toBe(null);
        expect(deleteResponse.body).toEqual(expect.objectContaining({}))
    })
})

