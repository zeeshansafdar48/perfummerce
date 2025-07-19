// Component imports
import { ProductCard } from '@/components/ui/product-card'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductSort } from '@/components/products/product-sort'

// Helper imports
import { fetchProducts } from '@/lib/supabase/products'
import { fetchCategories } from '@/lib/supabase/categories'
import { fetchBrands } from '@/lib/supabase/brands'

// Types
interface SearchParams {
  category?: string
  brand?: string
  gender?: string
  search?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
}

/**
 * ProductsPage displays a list of products with filters and sorting.
 * @param {Object} props
 * @param {SearchParams} props.searchParams - Search/filter params from URL
 */
export default async function ProductsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  // Data fetching
  const products = await fetchProducts();
  const categories = await fetchCategories();
  const brands = await fetchBrands();

  // Filtering
  let filteredProducts = products.slice();
  const { category, brand, gender, search, minPrice, maxPrice, sort = 'name' } = await searchParams;
  if (category) filteredProducts = filteredProducts.filter(p => p.category_id === category);
  if (brand) filteredProducts = filteredProducts.filter(p => p?.brand?.name === brand);
  if (gender && gender !== 'ALL') filteredProducts = filteredProducts.filter(p => p.gender === gender);
  if (search) filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
  if (minPrice) filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));

  // Map brand/category names for each product
  const getBrandName = (brand_id: string) => brands.find(b => b.id === brand_id)?.name || '';
  const getCategoryName = (category_id: string) => categories.find(c => c.id === category_id)?.name || '';

  // Sorting
  switch (sort) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
    default:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalCount = filteredProducts.length;

  // Render
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
            <p className="text-sm text-gray-600" aria-live="polite">
              Showing {filteredProducts.length} of {totalCount} products
            </p>
            <ProductSort />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  brandName={getBrandName(product.brand_id)}
                  categoryName={getCategoryName(product.category_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}