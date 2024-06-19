import { apiUrl } from "../helpers/constants";
import http_common from "../http_common.ts";

const formHeader = {headers: {
        'Content-type': 'multipart/form-data'
    }}

export const categoryService  ={
    getAll:()=> http_common.get(apiUrl + 'getall'),
    create:(category:FormData) => http_common.post(apiUrl+'create',category,formHeader),
    delete:(categoryId:number) => http_common.delete(apiUrl + `delete/${categoryId}`),
    update:(category:FormData,id:number) => http_common.post<FormData>(apiUrl + `update/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(apiUrl + `get/${categoryId}`),
}