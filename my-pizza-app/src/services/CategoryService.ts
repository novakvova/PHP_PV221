import { apiUrl } from "../helpers/constants";
import http_common from "../http_common.ts";
import {ICategoryItem} from "../components/categories/list/types.ts";
import {ICategoryCreate} from "../components/categories/create/types.ts";

const formHeader = {headers: {
        'Content-type': 'multipart/form-data'
    }}

interface CategorySearchResult {
    current_page: number;
    data: ICategoryItem[];
    total: number
};

export const categoryService = {
    getAll:()=> http_common.get<CategorySearchResult>(apiUrl + 'categories'),
    create:(category:ICategoryCreate) => http_common.post(apiUrl+'categories',category,formHeader),
    delete:(categoryId:number) => http_common.delete(apiUrl + `categories/${categoryId}`),
    update:(category:ICategoryCreate,id:number) => http_common.post<FormData>(apiUrl + `categories/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(apiUrl + `categories/${categoryId}`),
}