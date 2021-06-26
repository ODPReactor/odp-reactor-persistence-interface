import { SparqlEndpointFetcher } from 'fetch-sparql-endpoint';

/**
 * IClient interface implemented by
 * objects that can communicate with endpoint,
 * database, file system in an asynchronous manner.
 */
interface IClient {
    sendRequest(requestInput: any): Promise<any>;
}

interface IDataMapper {
    toEntity<D, E>(d: D, ...rest: any): E;
    toDto<E, D>(e: E): D;
}

/**
 * Object implementing this interface
 * returns queries for databases
 */
interface IQueryBuilder {
}

interface IRepository {
    dbClient?: IClient;
    dataMapper?: IDataMapper;
    queryBuilder?: IQueryBuilder;
}

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

declare class SparqlEndpointClient implements IClient {
    dbName: any;
    graph: any;
    options: any;
    updateQueryingEngine: SparqlEndpointFetcher;
    sparqlQueryingEngine: any;
    constructor(dbName?: string, graph?: string, options?: any);
    setSparqlEndpoint(sparqlEndpoint: string): void;
    sendRequest(requestInput: any): Promise<any>;
    executeQuery(query: string): Promise<any>;
    updateQuery(query: string): Promise<void>;
    askQuery(query: string): Promise<boolean>;
}

declare class GraphRepository implements IRepository {
    dbClient: SparqlEndpointClient;
    queryBuilder: any;
    constructor(dbClient?: SparqlEndpointClient, queryBuilder?: any);
    setEndpoint(sparqlEndpoint: string): void;
    create(uri: string): Promise<void>;
    delete(uri: string): Promise<void>;
    insertTriple(graph: string, triple: string): Promise<void>;
    exists(graph: string): Promise<boolean>;
    getAllTriples(graph: string): Promise<any>;
}

/**
 * Class allows creation of new graphs
 * and to test them
 *
 * This class should be used inside jest test as calls methods
 * from jest library
 */

/**
 * @description Class to help create testing environment for sparql
 *              It can generate graphId, create and delete graph on a provided endpoint, insert triples
 * @author Christian Colonna
 * @date 25-06-2021
 * @export
 * @class SparqlGraphTestHelper
 */
declare class SparqlGraphTestHelper {
    graphRepository: GraphRepository;
    constructor(graphRepository?: GraphRepository);
    setTestSparqlEndpoint(sparqlEndpoint: string): void;
    getUniqueGraphId(): string;
    checkGraph(graph: string): Promise<void>;
    createGraph(testGraph: string): Promise<void>;
    cleanGraph(graph: string): Promise<void>;
    insertTriples(testGraph: string, triples: string[]): Promise<void>;
}

declare type CreateSparqlClientInput = {
    sparqlEndpoint: string | undefined;
    graph?: string;
};
declare type RequestInput = {
    query: string;
};
/**
 * @description A client to send requests to SPARQL endpoints
 * @author Christian Colonna
 * @date 25-06-2021
 * @export
 * @class SparqlClient
 * @implements {IClient}
 */
declare class SparqlClient implements IClient {
    sparqlEndpoint?: string;
    graph?: string;
    sparqlQueryingEngine: any;
    constructor(sparqlEndpoint?: string, graph?: string);
    setGraph(graph: string): void;
    setSparqlEndpoint(sparqlEndpoint: string): void;
    static create({ sparqlEndpoint, graph }: CreateSparqlClientInput): SparqlClient | undefined;
    sendRequest(requestInput: RequestInput): Promise<any>;
}

/**
 * @description Converts sparql bindings to JSON objects
 * @author Christian Colonna
 * @date 25-06-2021
 * @export
 * @class SparqlDataMapper
 * @implements {IDataMapper}
 */
declare class SparqlDataMapper implements IDataMapper {
    toEntity(d: any): any;
    toDto(e: any): any;
    parseBindings(comunicaBindings: any): Promise<any>;
}

export { IClient, IDataMapper, IQueryBuilder, IRepository, SparqlClient, SparqlDataMapper, SparqlGraphTestHelper };
