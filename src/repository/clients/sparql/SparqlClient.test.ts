/**
 * Test that currectly GET data 
 * Test that currectly GET data from a singleGraph if graph is specified
 */

import { SparqlClient } from "./SparqlClient"
import {SparqlGraphTestHelper} from "./test/SparqlGraphTestHelper"

const graphTester = new SparqlGraphTestHelper()
if (!process.env.TEST_SPARQL_ENDPOINT_URI) {
    throw new Error("No sparql endpoint for thest found")
}
graphTester.setTestSparqlEndpoint(process.env.TEST_SPARQL_ENDPOINT_URI)




const graph1 = graphTester.getUniqueGraphId()
const graph2 = graphTester.getUniqueGraphId()
const graph3 = graphTester.getUniqueGraphId()

const resource1 = "ex:subject_1"
const resource2 = "ex:object_1"
const p1 = "ex:predicate_1"


const graph1Triples = [
    `<${resource1}> <${p1}> <${resource2}>` 
]


describe("SparqlClient get data", () => {
    
    test("It should get data from sparql endpoint", async ()=> {
        
        const sparqlClient = SparqlClient.create({sparqlEndpoint : process.env.TEST_SPARQL_ENDPOINT_URI})
        
        const query1 = `SELECT *
                            WHERE { GRAPH ?graph
                            { ?s ?p ?o }
                            }`

        await graphTester.createGraph(graph1)

        sparqlClient?.setGraph(graph1)


        const results = await sparqlClient?.sendRequest({
            query: query1
        })

        expect(results).toHaveLength(0)

        await graphTester.insertTriples(graph1, graph1Triples)


        const newResults = await sparqlClient?.sendRequest({
            query: query1
        })

        expect(newResults).toHaveLength(1)
        expect(JSON.stringify(newResults)).toBe(`[{"?s":{"termType":"NamedNode","value":"ex:subject_1"},"?p":{"termType":"NamedNode","value":"ex:predicate_1"},"?o":{"termType":"NamedNode","value":"ex:object_1"}}]`)

        await graphTester.cleanGraph(graph1)
      
    })

    test("Inserting same triple in two different graph, it should get data just from queried graph", async () => {

        const sparqlClient = SparqlClient.create({sparqlEndpoint: process.env.TEST_SPARQL_ENDPOINT_URI})

        // create empty graph 2
        await graphTester.createGraph(graph2)
        sparqlClient?.setGraph(graph2)

        // verify it has no triples
        const query1 = `SELECT *
        WHERE { GRAPH ?graph
        { ?s ?p ?o }
        }`
        const results = await sparqlClient?.sendRequest({
            query: query1
        })

        expect(results).toHaveLength(0)

        // insert triples in graph 2
        await graphTester.insertTriples(graph2, graph1Triples)

        // create empty graph 3
        await graphTester.createGraph(graph3)
        sparqlClient?.setGraph(graph3)

        // verify it has no triples
        const results2 = await sparqlClient?.sendRequest({
            query: query1
        })
        expect(results2).toHaveLength(0)

        // insert triples in graph 3

        await graphTester.insertTriples(graph3, graph1Triples)

        // query graph1 
        sparqlClient?.setGraph(graph2)
        const newResults = await sparqlClient?.sendRequest({
            query: query1
        })

        // it should have just inserted triples

        expect(newResults).toHaveLength(1)
        expect(JSON.stringify(newResults)).toBe(`[{"?s":{"termType":"NamedNode","value":"ex:subject_1"},"?p":{"termType":"NamedNode","value":"ex:predicate_1"},"?o":{"termType":"NamedNode","value":"ex:object_1"}}]`)

        // clean graphs
        await graphTester.cleanGraph(graph2)
        await graphTester.cleanGraph(graph3)

    })

})