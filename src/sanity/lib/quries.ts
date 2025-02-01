// queries.ts
import { groq } from '@sanity/groq-store'

// Query to fetch all products at once
export const allProducts = groq`*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    price,
    image,
    slug
}`;

// Query to fetch paginated products
export const allProductsPaginated = groq`*[_type == "product"] | order(_createdAt desc) [ $start...$start + $limit ] {
    _id,
    title,
    price,
    image,
    slug
}`;
