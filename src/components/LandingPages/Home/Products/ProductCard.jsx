import { Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import QuickViewHover from "../../Products/QuickViewHover";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { formatImagePath } from "@/utilities/lib/formatImagePath";
import { usePathname } from "next/navigation";
import LinkButton from "@/components/Shared/LinkButton";

const ProductCard = ({ item }) => {
  const { data: globalData } = useGetAllGlobalSettingQuery();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="rounded-xl relative group lg:w-[220px] mx-auto lg:h-[550px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl">
        {item?.video && isHovered ? (
          <video
            src={formatImagePath(item?.video)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            autoPlay
            muted
            controls={false}
            className="w-full h-[160px] lg:h-[380px] rounded-xl object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={
              pathname === "/products"
                ? item?.mainImage
                : formatImagePath(item?.mainImage)
            }
            alt={item?.name}
            width={220}
            height={260}
            className="rounded-xl lg:h-[380px] group-hover:scale-110 duration-500 object-cover"
          />
        )}

        <div className="hidden lg:block absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 duration-500 z-10">
          <QuickViewHover item={item} />
        </div>
        <div className="lg:hidden">
          <QuickViewHover item={item} />
        </div>
      </div>

      <div className="lg:p-3 text-center lg:text-start">
        <LinkButton href={`/products/${item?.slug}`}>
          <Tooltip placement="top" title={item?.name}>
            <h2 className="text-sm text-center lg:text-start md:text-base font-medium mt-2 mb-4">
              {item?.name.length > 35
                ? item.name.slice(0, 35).concat("...")
                : item.name}
            </h2>
          </Tooltip>
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            {item?.offerPrice && (
              <p className="text-sm lg:text-base font-bold line-through text-black/60">
                {globalData?.results?.currency + " " + item?.sellingPrice}
              </p>
            )}
            {item?.offerPrice ? (
              <p className="text-black text-sm lg:text-xl font-bold">
                {globalData?.results?.currency + " " + item?.offerPrice}
              </p>
            ) : (
              <p className="text-black text-sm lg:text-xl font-semibold">
                {globalData?.results?.currency + " " + item?.sellingPrice}
              </p>
            )}
          </div>
        </LinkButton>
        {!item?.stock > 0 ? (
          <div className=" text-red-500">(Out Of Stock)</div>
        ) : (
          <div className=" text-green-500">(In Stock)</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
