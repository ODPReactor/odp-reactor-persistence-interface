import { IDataMapper } from "../IDataMapper";

/**
 * @description Converts sparql bindings to JSON objects
 * @author Christian Colonna
 * @date 25-06-2021
 * @export
 * @class SparqlDataMapper
 * @implements {IDataMapper}
 */
export class SparqlDataMapper implements IDataMapper<any,any> {

    toEntity(d: any): any {
        const binding = d
        const jsonResource : any = {};
        const variables : string[] = Array.from(binding.keys());
        variables.forEach((v) => {
            const result = binding.get(v);
            jsonResource[stripeQuestionMark(v)] = result.value; // value convert from rdf object NamedNode, Literal giving just the value
        });
        return jsonResource;
    }
    toDto(e: any): any {
        throw new Error("Method not implemented.");
    }

    async parseBindings(comunicaBindings : any) {
        /*
        {
            uri:
            label:
            otherProp:
        }
        */
        let bindings = await comunicaBindings;
        const resources = bindings.map((binding : any) => {
            return this.toEntity(binding)
        });
        return resources;
    }
}

const stripeQuestionMark = (sparqlVariable : string) : string => {
    return sparqlVariable.replace("?", "");
};
