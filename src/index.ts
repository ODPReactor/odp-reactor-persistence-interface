import {SparqlGraphTestHelper} from "./repository/clients/sparql/test/SparqlGraphTestHelper"

// interfaces
import {IClient} from "./repository/IClient"
import {IDataMapper} from "./repository/IDataMapper"
import {IQueryBuilder} from "./repository/IQueryBuilder"
import {IRepository} from "./repository/IRepository"

// abstract classes
import {BaseDTO} from "./repository/BaseDTO"
import {BaseEntity} from "./repository/BaseEntity"

// implementations
import {SparqlClient} from "./repository/clients/sparql/SparqlClient"
import {SparqlDataMapper} from "./repository/datamappers/SparqlDataMapper"
import {HttpRestClient} from "./repository/clients/http/HttpRestClient"

// export public interfaces
export {IClient, IDataMapper, IQueryBuilder, IRepository}

// export abstract classes
export {BaseDTO, BaseEntity}

// export public implementation
export {SparqlGraphTestHelper}
export {SparqlClient, SparqlDataMapper}
export {HttpRestClient}