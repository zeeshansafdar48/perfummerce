import { ProductGallery } from '@/components/products/product-gallery'
import { ProductInfo } from '@/components/products/product-info'
import { ProductReviews } from '@/components/products/product-reviews'
import { ProductCard } from '@/components/ui/product-card'
import { fetchProducts } from '@/lib/supabase/products'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const products = await fetchProducts();
  const product = products.find(p => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }
  return {
    title: `${product?.name} - ${product?.brand?.name} | Parfum`,
    description: product?.description,
    keywords: `${product?.name}, ${product?.brand?.name}, ${product?.category?.name}, perfume, fragrance`,
  }
}


export default async function ProductPage({ params }: ProductPageProps) {
  const products = await fetchProducts();
  const product = products.find(p => p.slug === params?.slug);
  if (!product) {
    notFound();
  }
  // Get related products
  const relatedProducts = products.filter(p => p.id !== product?.id && (p?.brand?.id === product?.brand?.id || p?.category?.id === product?.category?.id));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Gallery */}
        <ProductGallery images={product.images} productName={product.name} />
        {/* Product Info */}
        <ProductInfo product={product} />
      </div>
      {/* Product Reviews */}
      {/* <ProductReviews product={product} /> */}
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct?.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}