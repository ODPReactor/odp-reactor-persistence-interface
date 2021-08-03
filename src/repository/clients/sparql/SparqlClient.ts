import { IClient } from "../../IClient";
import { newEngine } from "@comunica/actor-init-sparql";
import { Bindings } from '@comunica/bus-query-operation';
import { DataFactory } from 'rdf-data-factory';
import { SparqlEndpointFetcher } from "fetch-sparql-endpoint";

const factory = new DataFactory();

export type CreateSparqlClientInput = {
    sparqlEndpoint: string | undefined
    graph?: string
}

export type RequestInput = {
    query : string
}

/**
 * @description A client to send requests to SPARQL endpoints
 * @author Christian Colonna
 * @date 25-06-2021
 * @export
 * @class SparqlClient
 * @implements {IClient}
 */
export class SparqlClient implements IClient  {
    sparqlEndpoint?: string;
    graph?: string;
    sparqlQueryingEngine: any;
    updateQueryingEngine: SparqlEndpointFetcher;

    constructor(sparqlEndpoint? : string, graph? : string) {
        this.sparqlEndpoint = sparqlEndpoint || undefined;
        this.graph = graph || undefined;
        this.sparqlQueryingEngine = newEngine();
        this.updateQueryingEngine = new SparqlEndpointFetcher()
    }

    setGraph(graph: string) {
        this.graph = graph
    }

    setSparqlEndpoint(sparqlEndpoint: string) {
        this.sparqlEndpoint = sparqlEndpoint
    }

    static create({ sparqlEndpoint , graph } : CreateSparqlClientInput) {
        if (!sparqlEndpoint) return undefined;
        return new SparqlClient(sparqlEndpoint, graph ? graph : "default");
    }

    async sendRequest(requestInput: RequestInput): Promise<any> {
        const query = requestInput.query
        let bindings;
        try {
            let comunicaParams = {
                sources: [{ type: "sparql", value: this.sparqlEndpoint }],
                // bind ?graph variable if not default graph
                ...((this.graph && this.graph !== "default") && {initialBindings: Bindings({
                    '?graph' : factory.namedNode(this.graph)
                })})
            }
            const result = await this.sparqlQueryingEngine.query(query, comunicaParams);
            bindings = await result.bindings();
        } catch (e) {
            console.log("[!] DbClient.executeQuery error:", e);
            bindings = undefined;
        }
        return bindings;    
    }

    async sendUpdateRequest(requestInput: RequestInput) : Promise<any> {
        if (!this.sparqlEndpoint) {
            throw Error("No sparql endpoint to query")
        }
        return this.updateQueryingEngine.fetchUpdate(this.sparqlEndpoint, this.bindGraph(requestInput.query));
    }

    private bindGraph(query : string) {
        return this.graph ? query.replace("?graph", `<${this.graph}>`) : query
    }
}