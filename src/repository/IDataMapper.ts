export interface IDataMapper<D,E> {
    toEntity<D, E>(d: D, ...rest: any): E
    toDto<E, D>(e: E): D
}
