export interface Post {
    title: string;
    slug: string;
    description: string;
    date: string;
    tags: string[];
    image?: string;
    published: boolean;
}

export interface Log {
    title: string;
    slug: string;
    date: string;
    tags: string[];
    published: boolean;
}

export interface Project {
    title: string;
    slug: string;
    description: string;
    date: string;
    tags: string[];
    image: string;
    published: boolean;
    github?: string;
    demo?: string;
}

export interface Product {
    title: string;
    slug: string;
    description: string;
    price: number;
    salePrice?: number;
    currency?: string;
    date: string;
    tags: string[];
    image: string;
    published: boolean;
    inStock: boolean;
    buyLink: string;
    features?: string[];
} 