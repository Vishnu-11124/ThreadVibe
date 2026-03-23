import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

// ─── Mock product matching the mongoose schema ───────────────────────────────
const mockProduct = {
  _id: '1',
  name: 'Classic Urban Hoodie',
  description:
    'A premium cotton-blend hoodie built for everyday comfort. Soft-brushed interior, reinforced stitching, and a relaxed fit that pairs effortlessly with any look.',
  brand: 'UrbanThreads',
  category: 'Hoodies',
  type: 'printed',
  price: 79,
  oldPrice: 100,
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['#1a1a2e', '#16213e', '#228b22', '#8b0000'],
  ratings: 4.5,
  inStock: true,
  images: [
    'https://dummyimage.com/600x700/228b22/fff&text=Front',
    'https://dummyimage.com/600x700/1a1a2e/fff&text=Back',
    'https://dummyimage.com/600x700/8b0000/fff&text=Detail',
  ],
  createdAt: new Date().toISOString(),
}

// ─── Star Rating Component ────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => {
      const filled = rating >= star
      const half = !filled && rating >= star - 0.5
      return (
        <svg key={star} className="w-4 h-4" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-${star}`}>
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            fill={filled ? '#f59e0b' : half ? `url(#half-${star})` : '#e5e7eb'}
          />
        </svg>
      )
    })}
    <span className="text-xs text-gray-400 ml-1">({rating})</span>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const SingleProduct = () => {
  const { id } = useParams()

  // In production: fetch product by id. Using mock for now.
  const product = mockProduct

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

  const discount =
    product.oldPrice > 0
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Please select a size.')
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Product Detail ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="flex flex-col lg:flex-row">

            {/* ── Image Gallery ── */}
            <div className="lg:w-[42%] p-5 flex gap-3">

              {/* Vertical thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-2 justify-start">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        selectedImage === i
                          ? 'border-violet-400 shadow-md shadow-violet-100 scale-105'
                          : 'border-gray-100 opacity-60 hover:opacity-100 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image — compact */}
              <div className="relative flex-1 overflow-hidden rounded-2xl bg-gray-50 group" style={{ maxHeight: '360px' }}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ maxHeight: '360px' }}
                />
                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-2xl" />

                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <span className="text-gray-700 text-sm font-bold tracking-[0.2em] uppercase border border-gray-300 px-4 py-2 rounded-full bg-white shadow-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md shadow-rose-200">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* ── Product Info ── */}
            <div className="lg:w-[58%] p-8 flex flex-col justify-between border-l border-gray-50">
              <div>
                {/* Brand & category */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400 capitalize">{product.category}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400 capitalize">{product.type}</span>
                </div>

                {/* Name */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating + stock */}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <StarRating rating={product.ratings} />
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      product.inStock
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-red-50 text-red-500 border-red-100'
                    }`}
                  >
                    {product.inStock ? '● In Stock' : '○ Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm mb-6 border-l-2 border-gray-100 pl-3">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-end gap-3 mb-7">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">
                    ${product.price}
                  </span>
                  {product.oldPrice > 0 && (
                    <span className="text-lg text-gray-300 line-through mb-1">
                      ${product.oldPrice}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full mb-1">
                      Save ${product.oldPrice - product.price}
                    </span>
                  )}
                </div>

                {/* Colors */}
                {product.colors?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      Color{' '}
                      {selectedColor && (
                        <span className="text-gray-300 normal-case tracking-normal font-normal">{selectedColor}</span>
                      )}
                    </p>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          style={{ backgroundColor: color }}
                          className={`w-8 h-8 rounded-full transition-all duration-200 shadow-sm ${
                            selectedColor === color
                              ? 'ring-2 ring-violet-400 ring-offset-2 ring-offset-white scale-110 shadow-md'
                              : 'opacity-70 hover:opacity-100 hover:scale-105'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes?.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      Size{' '}
                      {selectedSize && (
                        <span className="text-violet-500 normal-case tracking-normal font-semibold">{selectedSize}</span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[40px] h-10 px-3 rounded-xl border text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                            selectedSize === size
                              ? 'border-violet-400 bg-violet-50 text-violet-600 shadow-sm shadow-violet-100'
                              : 'border-gray-200 text-gray-500 hover:border-violet-200 hover:text-violet-500 hover:bg-violet-50/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 ${
                  product.inStock
                    ? addedToCart
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:from-violet-500 hover:to-cyan-400 shadow-lg shadow-violet-100 hover:shadow-xl hover:shadow-violet-200 hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {product.inStock ? 'Add To Cart' : 'Out of Stock'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      <div className="max-w-6xl mx-auto px-4 py-10 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1 h-5 bg-gradient-to-b from-violet-500 to-cyan-400 rounded-full" />
          Related Products
        </h3>
        <p className="text-gray-300 text-sm">Related products will appear here.</p>
      </div>

      {/* ── Reviews ── */}
      <section className="max-w-6xl mx-auto px-4 py-10 mb-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full" />
            Customer Reviews
          </h3>
          <p className="text-gray-300 text-sm">No reviews yet. Be the first to review this product.</p>
        </div>
      </section>
    </div>
  )
}

export default SingleProduct