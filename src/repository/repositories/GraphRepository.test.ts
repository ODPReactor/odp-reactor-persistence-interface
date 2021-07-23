import { SparqlGraphTestHelper } from '../clients/sparql/test/SparqlGraphTestHelper'
import { GraphRepository} from './GraphRepository'

describe('GraphRepository create and drops graphs', () => {

    const graphTester = new SparqlGraphTestHelper()
    const testEndpoint = process.env.TEST_SPARQL_ENDPOINT_URI
    if (!testEndpoint) {
        throw new Error("Cannot execute test, no TEST_SPARQL_ENDPOINT_URI variable found in .env")
    }
    graphTester.setTestSparqlEndpoint(testEndpoint)

    console.log("[!] (WARN) Be sure test sparql endpoint has update value to true")
    const graphRepo = new GraphRepository()
    graphRepo.setEndpoint(testEndpoint)


    test('it should not have graph to be created', async ()=> {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        const hasGraph = await graphRepo.exists(graph)
        expect(hasGraph).toBeFalsy()
        await graphRepo.delete(graph)
    })
    test('it should create a new graph', async ()=> {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        await graphRepo.create(graph)
        await graphRepo.delete(graph)
    })
    test('it should insert triple in a graph', async () => {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        await graphRepo.create(graph)
        await graphRepo.insertTriple(graph, '<ex:s> <ex:p> <ex:o>')
        const hasGraph = await graphRepo.exists(graph)
        expect(hasGraph).toBeTruthy()
        await graphRepo.delete(graph)
    })
    test('it should drop an existing graph', async () => {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        await graphRepo.create(graph)
        await graphRepo.delete(graph)
    })
    test('it should silently drop a non existing graph', async () => {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        await graphRepo.delete(graph)
    })
    test('it should not have graph after deletion', async ()=> {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        const hasGraph = await graphRepo.exists(graph)
        expect(hasGraph).toBeFalsy()
        await graphRepo.delete(graph)
    })
    test('it should silently ignore creating two times the same graph', async ()=> {
        const graph  = graphTester.getUniqueGraphId()
        await graphRepo.delete(graph)
        await graphRepo.create(graph)
        await graphRepo.create(graph)
        await graphRepo.delete(graph)
    })
})

