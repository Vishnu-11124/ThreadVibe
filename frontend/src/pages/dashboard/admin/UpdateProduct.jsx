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

  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductMutation();

  // ✅ Initialize data
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

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Sizes & Colors handlers
  const handleArrayChange = (index, value, field) => {
    const updated = [...formData[field]];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const addField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (index, field) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  // ✅ Image upload
  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  // ✅ Compare changes
  const getUpdatedFields = () => {
    const updated = {};

    Object.keys(formData).forEach((key) => {
      if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) {
        updated[key] = formData[key];
      }
    });

    return updated;
  };

  // ✅ Submit
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
        updatedFields[key].forEach((item) =>
          formPayload.append(key, item)
        );
      } else {
        formPayload.append(key, updatedFields[key]);
      }
    });

    // images (same as add product)
    newImages.forEach((img) => {
      formPayload.append("images", img);
    });

    // ✅ CRITICAL FIX HERE
    const res = await updateProduct({
      id,
      data: formPayload,
    }).unwrap();

    console.log(res);

    alert("Updated successfully");
    navigate("/dashboard/admin");
  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};


  if (isLoading) return <h1 className="text-center mt-20">Loading...</h1>;
  if (isError) return <h1 className="text-center text-red-500">Error</h1>;

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Update Product</h2>
        <p className="text-sm text-gray-500 mt-1">
          Modify product details and save changes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block">
            Product Name
          </label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm h-24 resize-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Brand + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase mb-1.5 block">
              Brand
            </label>
            <input
              name="brand"
              value={formData.brand || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase mb-1.5 block">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">
            Sizes
          </label>

          {formData.sizes?.map((size, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={size}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, "sizes")
                }
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeField(i, "sizes")}
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addField("sizes")}
            className="text-sm text-blue-600 font-medium"
          >
            + Add Size
          </button>
        </div>

        {/* Colors */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">
            Colors
          </label>

          {formData.colors?.map((color, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={color}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, "colors")
                }
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => removeField(i, "colors")}
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addField("colors")}
            className="text-sm text-blue-600 font-medium"
          >
            + Add Color
          </button>
        </div>

        {/* Existing Images */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">
            Existing Images
          </label>

          <div className="flex gap-3 flex-wrap">
            {formData.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="product"
                className="w-20 h-20 object-cover rounded-xl border shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase mb-1.5 block">
            Upload New Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full text-sm file:bg-black file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 hover:file:bg-gray-800"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>

      </form>
    </div>
  </div>
);

};

export default UpdateProduct;
