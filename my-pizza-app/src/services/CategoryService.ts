import { apiUrl } from "../helpers/constants";
import http_common from "../http_common.ts";
import {ICategoryItem} from "../components/categories/list/types.ts";

const formHeader = {headers: {
        'Content-type': 'multipart/form-data'
    }}

export const categoryService  ={
    getAll:()=> http_common.get<ICategoryItem[]>(apiUrl + 'categories'),
    create:(category:FormData) => http_common.post(apiUrl+'categories',category,formHeader),
    delete:(categoryId:number) => http_common.delete(apiUrl + `categories/${categoryId}`),
    update:(category:FormData,id:number) => http_common.post<FormData>(apiUrl + `categories/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(apiUrl + `categories/${categoryId}`),
}