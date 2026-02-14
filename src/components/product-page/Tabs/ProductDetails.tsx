import React from "react";

export type SpecItem = {
  label: string;
  value: string;
};

const specsData: SpecItem[] = [
  {
    label: "Blade Shape",
    value: "Taiwan Tuna",
  },
  {
    label: "Steel Type",
    value: "Carbon Steel ex Carl Schlieper Wooden Saw",
  },
  {
    label: "Blade Length",
    value: "170mm",
  },
  {
    label: "Blade Height",
    value: "90mm",
  },
  {
    label: "Spine Thickness",
    value: "2.5mm",
  },
  {
    label: "Handle Length",
    value: "130mm",
  },
  {
    label: "Handle Type",
    value: "Wa Handle",
  },
  {
    label: "Handle Materials",
    value: "Teakwood",
  },
];

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
