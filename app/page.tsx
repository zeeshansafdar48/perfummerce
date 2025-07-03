// import dbConnect from '@/lib/mongodb' // Commented out for dummy data
// import Product from '@/models/Product'
// import Category from '@/models/Category'
// await dbConnect() // Commented out for dummy data
import { ProductCard } from '@/components/ui/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  // Dummy data for demo/testing only
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
    },
  ];
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"
            alt="Luxury perfume bottles"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Your
            <span className="block text-rose-400">Perfect Perfume</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Explore our curated collection of premium fragrances from the world's finest brands
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              <Link href="/products" className="flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link href="/products?featured=true">
                Featured Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Truck className="h-8 w-8 text-rose-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $100</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Shield className="h-8 w-8 text-rose-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">100% genuine fragrances guaranteed</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Headphones className="h-8 w-8 text-rose-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Expert customer service anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From eau de parfum to cologne, discover the perfect fragrance intensity for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-square bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
                    <div className="text-4xl font-bold text-rose-600">
                      {category.name[0]}
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium fragrances from the world's most prestigious brands
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "The quality is exceptional and the delivery was super fast. Found my signature scent here!",
                rating: 5
              },
              {
                name: "Michael Chen",
                text: "Great selection of authentic fragrances. Customer service was very helpful in choosing the right one.",
                rating: 5
              },
              {
                name: "Emma Davis",
                text: "Love the packaging and the products are exactly as described. Will definitely order again!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}