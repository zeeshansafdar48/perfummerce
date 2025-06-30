import { ProductGallery } from '@/components/products/product-gallery'
import { ProductInfo } from '@/components/products/product-info'
import { ProductReviews } from '@/components/products/product-reviews'
import { ProductCard } from '@/components/ui/product-card'
import { notFound } from 'next/navigation'
// import dbConnect from '@/lib/mongodb' // Commented out for dummy data

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const categories = [
    { id: 'cat1', name: 'Floral', slug: 'floral' },
    { id: 'cat2', name: 'Woody', slug: 'woody' },
    { id: 'cat3', name: 'Citrus', slug: 'citrus' },
  ];
  const brands = [
    { id: 'brand1', name: 'Chanel', slug: 'chanel' },
    { id: 'brand2', name: 'Dior', slug: 'dior' },
    { id: 'brand3', name: 'Gucci', slug: 'gucci' },
  ];
  const products = [
    {
      id: 'prod1',
      name: 'Chanel No. 5',
      slug: 'chanel-no-5',
      description: 'Classic floral fragrance.',
      price: 120,
      images: ['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'],
      category: categories[0],
      brand: brands[0],
      gender: 'WOMEN',
      inStock: true,
      stock: 10,
      featured: true,
      createdAt: new Date(),
      reviews: [],
    },
    {
      id: 'prod2',
      name: 'Dior Sauvage',
      slug: 'dior-sauvage',
      description: 'Woody aromatic fragrance.',
      price: 110,
      images: ['https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg'],
      category: categories[1],
      brand: brands[1],
      gender: 'MEN',
      inStock: true,
      stock: 8,
      featured: true,
      createdAt: new Date(),
      reviews: [],
    },
    {
      id: 'prod3',
      name: 'Gucci Bloom',
      slug: 'gucci-bloom',
      description: 'Rich white floral fragrance.',
      price: 105,
      images: ['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'],
      category: categories[0],
      brand: brands[2],
      gender: 'WOMEN',
      inStock: true,
      stock: 5,
      featured: false,
      createdAt: new Date(),
      reviews: [],
    },
  ];
  const product = products.find(p => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }
  return {
    title: `${product.name} - ${product.brand.name} | Parfum`,
    description: product.description,
    keywords: `${product.name}, ${product.brand.name}, ${product.category.name}, perfume, fragrance`,
  }
}

const categories = [
  { id: 'cat1', name: 'Floral', slug: 'floral' },
  { id: 'cat2', name: 'Woody', slug: 'woody' },
  { id: 'cat3', name: 'Citrus', slug: 'citrus' },
];
const brands = [
  { id: 'brand1', name: 'Chanel', slug: 'chanel' },
  { id: 'brand2', name: 'Dior', slug: 'dior' },
  { id: 'brand3', name: 'Gucci', slug: 'gucci' },
];
const products = [
  {
    id: 'prod1',
    name: 'Chanel No. 5',
    slug: 'chanel-no-5',
    description: 'Classic floral fragrance.',
    price: 120,
    images: ['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'],
    category: categories[0],
    brand: brands[0],
    gender: 'WOMEN',
    inStock: true,
    stock: 10,
    featured: true,
    createdAt: new Date(),
    reviews: [],
  },
  {
    id: 'prod2',
    name: 'Dior Sauvage',
    slug: 'dior-sauvage',
    description: 'Woody aromatic fragrance.',
    price: 110,
    images: ['https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg'],
    category: categories[1],
    brand: brands[1],
    gender: 'MEN',
    inStock: true,
    stock: 8,
    featured: true,
    createdAt: new Date(),
    reviews: [],
  },
  {
    id: 'prod3',
    name: 'Gucci Bloom',
    slug: 'gucci-bloom',
    description: 'Rich white floral fragrance.',
    price: 105,
    images: ['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'],
    category: categories[0],
    brand: brands[2],
    gender: 'WOMEN',
    inStock: true,
    stock: 5,
    featured: false,
    createdAt: new Date(),
    reviews: [],
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) {
    notFound();
  }
  // Get related products
  const relatedProducts = products.filter(p => p.id !== product.id && (p.brand.id === product.brand.id || p.category.id === product.category.id));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Gallery */}
        <ProductGallery images={product.images} productName={product.name} />
        {/* Product Info */}
        <ProductInfo product={product} />
      </div>
      {/* Product Reviews */}
      <ProductReviews product={product} />
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export function generateStaticParams() {
  const products = [
    { slug: 'chanel-no-5' },
    { slug: 'dior-sauvage' },
    { slug: 'gucci-bloom' },
  ];
  return products.map(product => ({ slug: product.slug }));
}