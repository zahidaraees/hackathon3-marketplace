// Sanity query file (e.g., queries.ts)
import { groq } from "next-sanity";
import { client } from "./client";

export const catelouge = async () => {
  try {
    const query = groq`*[_type == "product"]`;
    console.log("Fetching products...");  // Debugging log

    const products = await client.fetch(query);
    console.log("Fetched products:", products);  // Debugging log
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
