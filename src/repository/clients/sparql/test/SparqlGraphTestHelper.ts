/** 
 * Class allows creation of new graphs
 * and to test them
 * 
 * This class should be used inside jest test as calls methods
 * from jest library
 */

import { GraphRepository } from "../../../repositories/GraphRepository";
import {nanoid} from "nanoid"

/**
 * @description Class to help create testing environment for sparql
 *              It can generate graphId, create and delete graph on a provided endpoint, insert triples
 * @author Christian Colonna
 * @date 25-06-2021
 * @export
 * @class SparqlGraphTestHelper
 */
export class SparqlGraphTestHelper {
    graphRepository: GraphRepository;

    constructor(graphRepository? : GraphRepository) {
        this.graphRepository = graphRepository || new GraphRepository()
    }

    setTestSparqlEndpoint(sparqlEndpoint : string) : void {
        this.graphRepository.setEndpoint(sparqlEndpoint)
    }

    getUniqueGraphId() : string {
        return "http://example.com/graphs/" + nanoid()
    }
   
    async checkGraph(graph : string) : Promise<void> {
        const hasGraph = await this.graphRepository.exists(graph)
        expect(hasGraph).toBeTruthy()
    }
    
    async createGraph(testGraph : string) : Promise<void> {
        await this.graphRepository.delete(testGraph)
        await this.graphRepository.create(testGraph)
    }
    async cleanGraph(graph : string) : Promise<void> {
        await this.graphRepository.delete(graph)
    }
    async insertTriples(testGraph : string, triples : string[])  {
        for(var i=0; i<triples.length; i++){
            await this.graphRepository.insertTriple(testGraph, triples[i]);
        }
        await this.checkGraph(testGraph)
    }

}