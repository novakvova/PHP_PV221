import React, { ChangeEvent,  useEffect,  useState } from 'react'
import { categoryService } from '../../../services/CategoryService';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { imageUrl } from '../../../helpers/constants';
import PageHeader from "../../common/page-header";
import {ICategoryCreate} from "./types.ts";


const CategoriesCreatePage: React.FC = () => {
    const id:number = Number(useParams().id);
    const navigate = useNavigate();
    const [preview, setPreview] = useState<string>('');
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    useEffect(()=>{
        (async()=>{
            if(id !== 0){
                const result = await categoryService.getById(id);
                if(result.status === 200){
                    setPreview(imageUrl + '600_'+ result.data.image);
                    setValue('name',result.data.name);
                }
            }
        })()

    },[]);

    const onSubmit = async (data: FieldValues) => {

        const model: ICategoryCreate = {
            name: data.name,
            image: data.image[0]
        };

        let result;

        if(id===0){
            result = await categoryService.create(model);
        }
        else{
            result = await categoryService.update(model,id);
        }

        if (result?.status === 201 || result?.status === 200) {
            navigate(-1);
        }
    }

    return (
        <>
            <PageHeader title={id===0?'Нова категорія':'Редагування'} />
            <form onSubmit={handleSubmit(onSubmit)} className="container max-w-sm w-auto mx-auto items-center py-8" encType="multipart/form-data" noValidate >
                <div className="sm:col-span-2 mb-5">
                    <label htmlFor="name" className="block text-lg mb-5 font-medium leading-4 text-gray-400">
                        Назва категорії
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="name"
                            className="  block w-full rounded-md px-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('name', {
                                required: 'Ведіть назву категорії',
                                minLength: {
                                    value: 3,
                                    message: 'Назва категорії не може бути менша як 3 символи',
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-lg italic text-red-500">{errors.name?.message?.toString()}</p>
                        )}
                    </div>
                </div>
                <div id="img-uploader" className=" mx-auto">
                    <label htmlFor="img-uploader" className="block text-lg mb-5 font-medium leading-4 text-gray-400">
                        Фото для категорії
                    </label>
                    <div className="px-4 py-6 bg-white rounded-lg shadow-md overflow-hidden items-center">
                        <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                            <label htmlFor="image" className="cursor-pointer">
                                {preview ?
                                    <>
                                        <img src={preview} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                                    </>
                                    : <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Завантажте зображення</h5>
                                        <p className="font-normal text-sm text-gray-400 md:px-6">Оберіть фото для категорії</p>
                                        <p className="font-normal text-sm text-gray-400 md:px-6"><b className="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                                    </>}
                            </label>
                            <input
                                id="image"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                {...register('image', {
                                    onChange:(e)=>{onImageChange(e)},
                                    validate: () => {
                                        if (!preview) return 'Завантажте зображення категорії';
                                    },
                                })}
                            />

                        </div>
                    </div>
                    {(errors.image && !preview) && (
                        <p className="text-lg italic text-red-500">{errors.image?.message?.toString()}</p>
                    )}
                </div>
                <button type="submit"
                        className="rounded-md bg-indigo-600 mt-5 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Зберегти</button>
            </form>
        </>
    )
}

export default CategoriesCreatePage;