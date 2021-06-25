import { GraphQueryBuilder } from '../querybuilders/GraphQueryBuilder'
import { IRepository } from '../IRepository'
import SparqlEndpointClient from './SparqlEndpointClient'

export class GraphRepository implements IRepository {
    dbClient: SparqlEndpointClient
    queryBuilder: any

    constructor(dbClient? : SparqlEndpointClient, queryBuilder? : any) {
        this.dbClient = dbClient || new SparqlEndpointClient()
        this.queryBuilder = queryBuilder || new GraphQueryBuilder()   
    }

    setEndpoint(sparqlEndpoint : string) : void {
        this.dbClient.setSparqlEndpoint(sparqlEndpoint)
    }

    async create(uri : string) {
        return this.dbClient.updateQuery(this.queryBuilder.create(uri))
    }
    async delete(uri : string) {
        return this.dbClient.updateQuery(this.queryBuilder.delete(uri))        
    }
    async insertTriple(graph : string, triple : string) {
        return this.dbClient.updateQuery(this.queryBuilder.insert(graph, triple))
    }
    async exists(graph : string) {
        return this.dbClient.askQuery(this.queryBuilder.askGraphHasTriple(graph))
    }
    async getAllTriples(graph : string) {
        return this.dbClient.executeQuery(this.queryBuilder.getAllTriples(graph))
    }
}