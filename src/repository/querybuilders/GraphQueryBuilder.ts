import { IQueryBuilder } from "../IQueryBuilder"

export class GraphQueryBuilder implements IQueryBuilder {
    create(graphUri : string) {
        return `
            CREATE SILENT GRAPH <${graphUri}>
        `
    }   
    delete(graphUri : string) {
        return `
            CLEAR SILENT GRAPH <${graphUri}>
        `
    }
    insert(graphUri : string, triple : string) {
        return `
            INSERT DATA {
                GRAPH <${graphUri}> {
                    ${triple}
                }
            }
        `
    }
    askGraphHasTriple(graphUri : string) {
        return `ASK WHERE { GRAPH <${graphUri}> { ?s ?p ?o } }`
    }
    getAllTriples(graphUri : string) {
        return `
            SELECT ?s ?p ?o WHERE {
                GRAPH <${graphUri}> {
                    ?s ?p ?o .
                }
            }
        `
    }
}