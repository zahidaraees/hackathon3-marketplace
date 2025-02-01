import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/products";
import HeroSection2 from "@/app/components/Herosection2";
import Image from "next/image";

interface Params {
    params: {
        id: string;
    };
}

const ProductDetails = async ({ params }: Params) => {
    const { id } = params;

    if (!id) {
        console.error("Product ID is undefined!");
        return <div>Product ID not found</div>;
    }

    // Fetch the product by ID
    const product: Product | null = await client.fetch(
        `*[_type == "product" && _id == $id][0]`,
        { id }
    );

    if (!product) {
        return <div>Product not found</div>;
    }

    const imageUrl = product.productImage ? urlFor(product.productImage).url() : null;

    return (
        <>
            {/* Render Hero Section */}
            <HeroSection2 title="Product Detail" breadcrumb="Home > Shop > Product" />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={`Image of ${product.title}`}
                            width={400}
                            height={400}
                            className="rounded-lg"
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                    <div>
                        <p><strong>Description:</strong> {product.description.toString()}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Discount:</strong> {product.dicountPercentage || "N/A"}</p>
                        <p><strong>New:</strong> {product.isNew ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
