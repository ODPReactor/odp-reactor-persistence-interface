/**
 * To avoid circular dependency we use an independent client to create graphs
 * to be tested.
 * 
 * You will see duplicate code with SparqlClient.ts
 * 
 * 
 * This class declared here is supposed to be used 
 * just to populate test graphs 
 */


import { newEngine } from '@comunica/actor-init-sparql';
import {SparqlEndpointFetcher} from 'fetch-sparql-endpoint';
import { IClient } from '../IClient';

export default class SparqlEndpointClient implements IClient{
    dbName: any;
    graph: any;
    options: any;
    updateQueryingEngine: SparqlEndpointFetcher;
    sparqlQueryingEngine: any;
    //db is SPARQL Endpoint in this case
    constructor(dbName? : string, graph? : string, options? : any) {
        this.dbName = dbName;
        this.graph = graph
        this.options = options;
        this.sparqlQueryingEngine = newEngine();
        this.updateQueryingEngine = new SparqlEndpointFetcher()
    }

    setSparqlEndpoint(sparqlEndpoint : string) : void {
        this.dbName = sparqlEndpoint
    }

    sendRequest(requestInput: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async executeQuery(query : string) {
        let bindings;
        try {
            const result = await this.sparqlQueryingEngine.query(query, {
                sources: [{ type: 'sparql', value: this.dbName }]
            });
            bindings = await result.bindings();
        } catch (e) {
            console.log('[!] DbContext.executeQuery error:', e);
            bindings = undefined;
        }
        return bindings;
    }
    // this is needed as comunica doesn't support update yet
    async updateQuery(query : string) {
        // console.log('[*] Sparql endpoint: ', this.dbName)
        // console.log('[*] Update query: ', query)
        return this.updateQueryingEngine.fetchUpdate(this.dbName, query);
    }
    async askQuery(query : string) {
        return this.updateQueryingEngine.fetchAsk(this.dbName, query)
    }
}
