"use client";

import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { useGetAllCategoriesQuery } from "@/redux/services/category/categoryApi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/services/device/deviceSlice";

const TopProducts = () => {
  const dispatch = useDispatch();

  const { data: productData } = useGetAllProductsQuery();
  const { data: categories } = useGetAllCategoriesQuery();

  const activeProducts = productData?.results
    ?.filter((item) => item?.status !== "Inactive")
    ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));

  const activeCategories = categories?.results?.filter(
    (item) => item?.status !== "Inactive"
  );

  const categoryProductMap = activeCategories
    ?.map((category) => {
      const productsInCategory = activeProducts?.filter(
        (product) => product?.category?._id === category?._id
      );
      return {
        category,
        products: productsInCategory,
        count: productsInCategory?.length || 0,
      };
    })
    ?.filter((category) => category.count > 0);

  const sortedCategories = categoryProductMap?.sort(
    (a, b) => b.count - a.count
  );

  const itemClickHandler = (item) => {
    dispatch(setFilter(item));
  };

  return (
    <section className="my-container mt-10">
      {sortedCategories?.length > 0
        ? sortedCategories?.slice(0, 7)?.map(({ category, products }) => (
            <div key={category?._id} className="py-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg lg:text-3xl font-medium text-center lg:text-start">
                  {category?.name}
                </h2>
                <Link
                  href={`/products`}
                  className="text-primary border-b border-primary font-semibold"
                >
                  <p onClick={() => itemClickHandler(category?.name)}>
                    Show All
                  </p>
                </Link>
              </div>
              {products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-5">
                  {products.map((product) => (
                    <div key={product?._id}>
                      <ProductCard item={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-gray-500">
                  No products available in this category.
                </p>
              )}
            </div>
          ))
        : null}
    </section>
  );
};

export default TopProducts;
