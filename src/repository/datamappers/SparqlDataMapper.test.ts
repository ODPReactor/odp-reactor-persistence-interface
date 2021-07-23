import { SparqlClient } from "../clients/sparql/SparqlClient"
import {SparqlGraphTestHelper} from "../clients/sparql/test/SparqlGraphTestHelper"
import {SparqlDataMapper} from "./SparqlDataMapper"

const graphTester = new SparqlGraphTestHelper()
if (!process.env.TEST_SPARQL_ENDPOINT_URI) {
    throw new Error("No sparql endpoint for thest found")
}
graphTester.setTestSparqlEndpoint(process.env.TEST_SPARQL_ENDPOINT_URI)

const graph1 = graphTester.getUniqueGraphId()

const resource1 = "ex:subject_1"
const resource2 = "ex:object_1"
const p1 = "ex:predicate_1"


const graph1Triples = [
    `<${resource1}> <${p1}> <${resource2}>` 
]

describe("SparqlDataMapper transform sparql bindings into JSON objects", ()=> {
    test("It should transform received bindings into JSON, where bound variable is key and result is value", async () => {
        const sparqlClient = SparqlClient.create({sparqlEndpoint : process.env.TEST_SPARQL_ENDPOINT_URI})
        
        const query1 = `SELECT *
                            WHERE { GRAPH ?graph
                            { ?s ?p ?o }
                            }`

        await graphTester.createGraph(graph1)
        sparqlClient?.setGraph(graph1)
        await graphTester.insertTriples(graph1, graph1Triples)


        const bindings = await sparqlClient?.sendRequest({
            query: query1
        })

        expect(bindings).toHaveLength(1)

        const sparqlDataMapper = new SparqlDataMapper()

        const results = await sparqlDataMapper.parseBindings(bindings)

        expect(results).toHaveLength(1)

        const result1 = results[0]

        expect(result1.s).toBe(resource1)
        expect(result1.p).toBe(p1)
        expect(result1.o).toBe(resource2)

        graphTester.cleanGraph(graph1)

    })
})