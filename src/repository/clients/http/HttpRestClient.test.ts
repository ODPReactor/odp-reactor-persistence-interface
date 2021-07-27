const nock = require("nock")
import {HttpRestClient} from "./HttpRestClient"



describe("HttpRestClient get data", ()=> {

    const client = new HttpRestClient()

    test("HttpRestClient GET without params", async ()=>{

        const exampleInterceptor = nock("https://example.com")
            .get("/")
            .reply(200)

        const res = await client.get({
            route: "https://example.com/"
        })

        expect(res).toBeDefined()
        expect(res.status).toBe(200)

    })

    test("HttpRestClient GET with query params", async () => {


        const exampleInterceptor = nock("https://example.com")
            .get("/")
            .query({
                name: "John",
                surname: "Doe"
            })
            .reply(200, { results: [{ id: 'jd054321' }]})

        const res = await client.get({
            route: "https://example.com/",
            queryParams: {
                name: "John",
                surname: "Doe"
            }
        })



        expect(res).toBeDefined()
        expect(res.status).toBe(200)
        expect(res.data.results[0].id).toBe("jd054321")

    })
})