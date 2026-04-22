import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/features/products/productApi";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data?.product;

  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [newImages, setNewImages] = useState([]);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      const initial = {
        name: product.name || "",
        description: product.description || "",
        brand: product.brand || "",
        category: product.category || "",
        type: product.type || "",
        price: product.price || "",
        sizes: product.sizes || [],
        colors: product.colors || [],
        images: product.images || [],
      };
      setFormData(initial);
      setOriginalData(initial);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeField = (index, field) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const getUpdatedFields = () => {
    const updated = {};
    Object.keys(formData).forEach((key) => {
      if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) {
        updated[key] = formData[key];
      }
    });
    return updated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = getUpdatedFields();

    if (Object.keys(updatedFields).length === 0 && newImages.length === 0) {
      alert("No changes made");
      return;
    }

    try {
      const formPayload = new FormData();
      Object.keys(updatedFields).forEach((key) => {
        if (Array.isArray(updatedFields[key])) {
          formPayload.append(key, JSON.stringify(updatedFields[key]));
        } else {
          formPayload.append(key, updatedFields[key]);
        }
      });
      newImages.forEach((img) => formPayload.append("images", img));

      const res = await updateProduct({ id, data: formPayload }).unwrap();
      console.log("Response:", res);
      alert("Updated successfully");
      setTimeout(() => navigate("/dashboard/admin"), 500);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">
          Loading product…
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-red-400 text-sm tracking-widest uppercase">
          Failed to load product
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 font-serif">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-1">
            Admin / Products
          </p>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">
            Update Product
          </h1>
          <div className="mt-3 h-px bg-stone-200 w-full" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Section: Basic Info ── */}
          <section>
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-4">
              Basic Information
            </h2>
            <div className="space-y-5">

              {/* Product Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-stone-700"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="e.g. Classic Oxford Shoe"
                  className="w-full border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-stone-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a detailed product description…"
                  className="w-full border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition resize-none"
                />
              </div>

              {/* Brand + Price — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="brand"
                    className="text-sm font-medium text-stone-700"
                  >
                    Brand
                  </label>
                  <input
                    id="brand"
                    name="brand"
                    value={formData.brand || ""}
                    onChange={handleChange}
                    placeholder="e.g. Nike"
                    className="w-full border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-stone-700"
                  >
                    Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm select-none">
                      ₹
                    </span>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border border-stone-200 bg-white rounded-lg pl-7 pr-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Category + Type — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-stone-700"
                  >
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    placeholder="e.g. Footwear"
                    className="w-full border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="type"
                    className="text-sm font-medium text-stone-700"
                  >
                    Type
                  </label>
                  <input
                    id="type"
                    name="type"
                    value={formData.type || ""}
                    onChange={handleChange}
                    placeholder="e.g. Formal"
                    className="w-full border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                  />
                </div>
              </div>

            </div>
          </section>

          <div className="h-px bg-stone-200" />

          {/* ── Section: Variants ── */}
          <section>
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-4">
              Variants
            </h2>
            <div className="space-y-6">

              {/* Sizes */}
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-2">
                  Sizes
                </label>
                <div className="space-y-2">
                  {formData.sizes?.map((size, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={size}
                        onChange={(e) =>
                          handleArrayChange(i, e.target.value, "sizes")
                        }
                        placeholder={`Size ${i + 1}`}
                        className="flex-1 border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => removeField(i, "sizes")}
                        className="px-3 py-2 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 transition text-sm"
                        aria-label="Remove size"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addField("sizes")}
                  className="mt-2 text-xs text-stone-500 hover:text-stone-800 font-medium tracking-wide border border-dashed border-stone-300 rounded-lg px-4 py-2 w-full hover:border-stone-400 transition"
                >
                  + Add Size
                </button>
              </div>

              {/* Colors */}
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-2">
                  Colors
                </label>
                <div className="space-y-2">
                  {formData.colors?.map((color, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      {/* Color swatch preview */}
                      <span
                        className="w-7 h-7 rounded-md border border-stone-200 flex-shrink-0"
                        style={{ backgroundColor: color || "#e7e5e4" }}
                      />
                      <input
                        value={color}
                        onChange={(e) =>
                          handleArrayChange(i, e.target.value, "colors")
                        }
                        placeholder={`e.g. #1a1a1a or "Navy Blue"`}
                        className="flex-1 border border-stone-200 bg-white rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => removeField(i, "colors")}
                        className="px-3 py-2 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 transition text-sm"
                        aria-label="Remove color"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addField("colors")}
                  className="mt-2 text-xs text-stone-500 hover:text-stone-800 font-medium tracking-wide border border-dashed border-stone-300 rounded-lg px-4 py-2 w-full hover:border-stone-400 transition"
                >
                  + Add Color
                </button>
              </div>

            </div>
          </section>

          <div className="h-px bg-stone-200" />

          {/* ── Section: Images ── */}
          <section>
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-4">
              Product Images
            </h2>

            {/* Existing Images */}
            {formData.images?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-stone-700 mb-2">
                  Current Images
                </p>
                <div className="flex flex-wrap gap-3">
                  {formData.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Product image ${i + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-stone-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="images"
                className="text-sm font-medium text-stone-700"
              >
                Upload New Images
              </label>
              <label
                htmlFor="images"
                className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl py-8 px-4 hover:border-stone-400 hover:bg-stone-100 transition text-center"
              >
                <span className="text-2xl mb-1">🖼️</span>
                <span className="text-sm text-stone-500">
                  Click to select images
                </span>
                <span className="text-xs text-stone-400 mt-0.5">
                  PNG, JPG, WEBP supported
                </span>
                <input
                  id="images"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {newImages.length > 0 && (
                <p className="text-xs text-stone-500 mt-1">
                  {newImages.length} file{newImages.length > 1 ? "s" : ""}{" "}
                  selected
                </p>
              )}
            </div>
          </section>

          <div className="h-px bg-stone-200" />

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin")}
              className="text-sm text-stone-400 hover:text-stone-700 transition"
            >
              ← Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-stone-800 hover:bg-stone-900 disabled:bg-stone-300 text-white text-sm font-semibold tracking-wide px-8 py-3 rounded-lg transition-all duration-150 shadow-sm disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving…
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;