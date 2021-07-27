import {BaseEntity} from "./BaseEntity"

export interface IDataMapper<D,E extends BaseEntity> {
    toEntity(d: D, ...rest: any): E
    toDto(e: E): D
}
