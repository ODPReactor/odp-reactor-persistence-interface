import {BaseDTO} from "./BaseDTO"
import {BaseEntity} from "./BaseEntity"

export interface IDataMapper<D extends BaseDTO,E extends BaseEntity> {
    toEntity<D, E>(d: D, ...rest: any): E
    toDto<E, D>(e: E): D
}
