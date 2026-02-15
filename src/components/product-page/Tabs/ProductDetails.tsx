"use client";

export type ProductDetailsProps = {
  specs: Record<string, string>;
};

const ProductDetails = ({ specs }: ProductDetailsProps) => {
  if (!specs) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
      {Object.entries(specs).map(([label, value], i) => (
        <div key={i} className="flex justify-between border-b py-3 lg:py-4">
          <p className="text-sm text-neutral-500 pr-4">{label}</p>
          <p className="text-sm text-neutral-800 font-medium text-right">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
