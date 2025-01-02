"use client";

import { useGetAllProductsQuery } from "@/redux/services/product/productApi";
import ProductCard from "../Home/Products/ProductCard";

const AllOffers = () => {
  const { data: productData } = useGetAllProductsQuery();

  const filteredProducts = productData?.results?.filter(
    (item) => item?.status !== "Inactive" && item?.offerPrice > 0
  );

  return (
    <section className="my-container relative border p-2 rounded-xl mt-10">
      <h2 className="my-10 text-xl lg:text-3xl font-medium text-center">
        Offer Products
      </h2>
      {filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-start gap-5 mt-5">
          {filteredProducts?.map((product) => (
            <div key={product?._id}>
              <ProductCard item={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-semibold my-10">
          No offer products found.
        </div>
      )}
    </section>
  );
};

export default AllOffers;
