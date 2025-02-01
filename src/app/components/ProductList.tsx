"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/types/products";
import { urlFor } from "@/sanity/lib/image";

const ProductList = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this number to show more/less per page

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <p>{product.title}</p>
            {product.productImage && (
              <Image
                src={urlFor(product.productImage).url()}
                alt={product.title}
                width={200}
                height={200}
              />
            )}
            <p>Price: ${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => router.push(`/shop/product/${product._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
