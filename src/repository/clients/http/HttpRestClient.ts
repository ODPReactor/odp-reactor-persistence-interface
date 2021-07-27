import { AxiosResponse } from "axios";

const axios = require('axios');

type QueryParams = any
type Headers = any
type HttpGetInput = {
    route : string
    queryParams?: QueryParams
    headers?: Headers
}

export class HttpRestClient {
    async get(input: HttpGetInput) : Promise<AxiosResponse<any>> {
        return axios.get(input.route, {
            params: input.queryParams ? input.queryParams : undefined,
            headers: input.headers ? input.headers : undefined
        })
    }
    async post(){}
    async put(){}
    async delete(){}
}