import { apiUrl } from "../helpers/constants";
import http_common from "../http_common.ts";
import {ICategoryItem, ICategorySearch} from "../components/categories/list/types.ts";
import {ICategoryCreate} from "../components/categories/create/types.ts";
import qs from "qs";

const formHeader = {headers: {
        'Content-type': 'multipart/form-data'
    }}

interface CategorySearchResult {
    current_page: number;
    data: ICategoryItem[];
    total: number
};

export const categoryService = {
    getAll:(search: ICategorySearch)=> {
        const params = qs.stringify(search);
        console.log("params get", params);
        return http_common.get<CategorySearchResult>(apiUrl + 'categories?'+params);
    },
    create:(category:ICategoryCreate) => http_common.post(apiUrl+'categories',category,formHeader),
    delete:(categoryId:number) => http_common.delete(apiUrl + `categories/${categoryId}`),
    update:(category:ICategoryCreate,id:number) => http_common.post<FormData>(apiUrl + `categories/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(apiUrl + `categories/${categoryId}`),
}