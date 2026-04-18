import React, { useState, useEffect } from "react";
import { useCreateProductMutation } from "../../../redux/features/products/productApi";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
];

const types = [
  { label: "Select Type", value: "" },
  { label: "Oversize", value: "oversize" },
  { label: "Printed", value: "printed" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Crop-Top", value: "crop-top" },
  { label: "Polo", value: "polo" },
  { label: "Full-Sleeve", value: "full-sleeve" },
];

const AddProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    type: "",
    price: "",
    sizes: [],
    colors: [],
  });

  const [images, setImages] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addSize = () => {
    if (sizeInput.trim() && !product.sizes.includes(sizeInput)) {
      setProduct((prev) => ({ ...prev, sizes: [...prev.sizes, sizeInput] }));
      setSizeInput("");
    }
  };

  const removeSize = (size) => {
    setProduct((prev) => ({ ...prev, sizes: prev.sizes.filter((s) => s !== size) }));
  };

  const addColor = () => {
    if (colorInput.trim() && !product.colors.includes(colorInput)) {
      setProduct((prev) => ({ ...prev, colors: [...prev.colors, colorInput] }));
      setColorInput("");
    }
  };

  const removeColor = (color) => {
    setProduct((prev) => ({ ...prev, colors: prev.colors.filter((c) => c !== color) }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("Max 3 images allowed");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.category) {
      alert("Please fill required fields");
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        if (Array.isArray(product[key])) {
          product[key].forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, product[key]);
        }
      });
      images.forEach((img) => formData.append("images", img));
      const res = await createProduct(formData).unwrap();
      console.log("Success:", res);
      setProduct({ name: "", description: "", brand: "", category: "", type: "", price: "", sizes: [], colors: [] });
      setImages([]);
      setSizeInput("");
      setColorInput("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white";
  const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block";

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Add New Product</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details to create a product
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className={labelClass}>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className={inputClass} />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className={`${inputClass} h-24 resize-none`} />
        </div>

        {/* Brand */}
        <div>
          <label className={labelClass}>Brand</label>
          <input type="text" name="brand" value={product.brand} onChange={handleChange} className={inputClass} />
        </div>

        {/* Category + Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select name="category" value={product.category} onChange={handleChange} className={inputClass}>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Type</label>
            <select name="type" value={product.type} onChange={handleChange} className={inputClass}>
              {types.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className={labelClass}>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className={inputClass} />
        </div>

        {/* Sizes */}
        <div>
          <label className={labelClass}>Sizes</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
              className={`${inputClass} flex-1`}
            />
            <button type="button" onClick={addSize} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full flex items-center gap-2">
                {s}
                <button onClick={() => removeSize(s)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className={labelClass}>Colors</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
              className={`${inputClass} flex-1`}
            />
            <button type="button" onClick={addColor} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {product.colors.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full flex items-center gap-2">
                {c}
                <button onClick={() => removeColor(c)}>✕</button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className={labelClass}>Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full text-sm file:bg-black file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 hover:file:bg-gray-800"
          />

          <div className="flex gap-3 mt-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  </div>
);

};

export default AddProduct;