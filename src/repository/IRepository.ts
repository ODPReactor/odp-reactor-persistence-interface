import { IClient } from "./IClient";
import { IDataMapper } from "./IDataMapper";
import { IQueryBuilder } from "./IQueryBuilder";

export type RepositoryInput = {
    dbClient? : IClient
    dataMapper? : IDataMapper<any,any>
    queryBuilder? : IQueryBuilder
}

export interface IRepository {

    dbClient?: IClient
    dataMapper?: IDataMapper<any,any>
    queryBuilder?: IQueryBuilder
}