// import dbConnect from '@/lib/mongodb' // Commented out for dummy data
import { ProductCard } from '@/components/ui/product-card'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductSort } from '@/components/products/product-sort'

interface SearchParams {
  category?: string
  brand?: string
  gender?: string
  search?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // await dbConnect() // Commented out for dummy data

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

  // Filtering, sorting, and search on dummy data
  let filtered = products.slice();
  const { category, brand, gender, search, sort = 'name', minPrice, maxPrice } = searchParams;
  if (category) filtered = filtered.filter(p => p.category.slug === category);
  if (brand) filtered = filtered.filter(p => p.brand.slug === brand);
  if (gender && gender !== 'ALL') filtered = filtered.filter(p => p.gender === gender);
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalCount = filtered.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {search ? `Search Results for "${search}"` : 'All Products'}
        </h1>
        <p className="text-gray-600">
          {totalCount} {totalCount === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters categories={categories} brands={brands} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing {filtered.length} of {totalCount} products
            </p>
            <ProductSort />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}