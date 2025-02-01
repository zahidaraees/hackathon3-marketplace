"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/products";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";

const ProductList = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductClick = (id: string) => {
    if (id) {
      router.push(`/shop/product/${id}`);
    } else {
      console.error("Product ID is missing!");
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const productToAdd = {
      ...product,
      productImage: product.productImage ? urlFor(product.productImage).url() : null,
    };

    localStorage.setItem("cartItems", JSON.stringify([...cartItems, productToAdd]));
    router.push("/cart");
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Shop</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
          const imageUrl = product.productImage
            ? urlFor(product.productImage).url()
            : null;

          return (
            <div
              key={product._id}
              className="product-card border p-4 rounded-lg hover:shadow-lg"
            >
              <p>Title: {product.title}</p>

              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`Image of ${product.title}`}
                  width={200}
                  height={200}
                />
              ) : (
                <p>No image available</p>
              )}
              <p>Price: ${product.price}</p>
              <p>Discount: {product.dicountPercentage || "N/A"}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-yellow-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600"
                  onClick={() => handleProductClick(product._id)}
                >
                  Details
                </button>
                <button
                  className="bg-red-900 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
