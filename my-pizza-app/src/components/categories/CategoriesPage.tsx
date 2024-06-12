import React, {useState} from "react";
import {ICategoryItem} from "./types.ts";

const CategoriesPage: React.FC = () => {
    const [list, setList] = useState<ICategoryItem[]>(
        [
            {
                id: 1,
                name: "Піца",
                image: "https://i0.wp.com/menu.tereveni.com.ua/wp-content/uploads/2023/05/picza-balakucha-teshha3.jpg?resize=500%2C500&ssl=1",
            },
            {
                id: 2,
                name: "Десерти",
                image: "https://i0.wp.com/menu.tereveni.com.ua/wp-content/uploads/2023/05/brauni3.jpg?resize=500%2C500&ssl=1"
            },
            {
                id: 3,
                name: "Закуски",
                image: "https://i0.wp.com/menu.tereveni.com.ua/wp-content/uploads/2023/05/brauni3.jpg?resize=500%2C500&ssl=1"
            },
            {
                id: 4,
                name: "Закуски",
                image: "https://i0.wp.com/menu.tereveni.com.ua/wp-content/uploads/2023/05/brauni3.jpg?resize=500%2C500&ssl=1"
            },
            {
                id: 5,
                name: "Закуски",
                image: "https://i0.wp.com/menu.tereveni.com.ua/wp-content/uploads/2023/05/brauni3.jpg?resize=500%2C500&ssl=1"
            }

        ]
    );

    return (
        <div className={"md:container mx-auto"}>
            <h1 className={"text-center my-[20px] text-3xl sm:text-3xl text-slate-900 tracking-tight dark:text-slate-200"}>Меню</h1>

            <div className={"grid  place-items-center grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"}>
                {list.map(item => (
                    <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full"
                             src={item.image}
                             alt="Sunset in the mountains"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default CategoriesPage;