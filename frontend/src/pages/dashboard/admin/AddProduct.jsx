import React, { useState } from "react";
import { useSelector } from "react-redux";

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
  const { user } = useSelector((state) => state.auth);

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

  // input states for sizes & colors
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  // handle normal fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // add size
  const addSize = () => {
    if (sizeInput.trim() && !product.sizes.includes(sizeInput)) {
      setProduct({
        ...product,
        sizes: [...product.sizes, sizeInput],
      });
      setSizeInput("");
    }
  };

  // remove size
  const removeSize = (size) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((s) => s !== size),
    });
  };

  // add color
  const addColor = () => {
    if (colorInput.trim() && !product.colors.includes(colorInput)) {
      setProduct({
        ...product,
        colors: [...product.colors, colorInput],
      });
      setColorInput("");
    }
  };

  // remove color
  const removeColor = (color) => {
    setProduct({
      ...product,
      colors: product.colors.filter((c) => c !== color),
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", product);
  };

  return (
    <div>
        <div>

      <h2>Add New Product</h2>
      <hr />
        </div>
        <div>
            <h3>Product Details</h3>
             <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {/* Brand */}
        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Enter brand"
            value={product.brand}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label>Type</label>
          <select
            name="type"
            value={product.type}
            onChange={handleChange}
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        {/* Sizes */}
        <div>
          <label>Sizes</label>
          <input
            type="text"
            placeholder="e.g. S, M, L"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
          />
          <button type="button" onClick={addSize}>
            Add
          </button>

          <div>
            {product.sizes.map((size, index) => (
              <span key={index} style={{ marginRight: "10px" }}>
                {size}
                <button type="button" onClick={() => removeSize(size)}>
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label>Colors</label>
          <input
            type="text"
            placeholder="e.g. Red, Blue"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <button type="button" onClick={addColor}>
            Add
          </button>

          <div>
            {product.colors.map((color, index) => (
              <span key={index} style={{ marginRight: "10px" }}>
                {color}
                <button type="button" onClick={() => removeColor(color)}>
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
            />

        </div>

        {/* Buttons */}
        <div>
          <button
            type="button"
            onClick={() =>
              setProduct({
                name: "",
                description: "",
                brand: "",
                category: "",
                type: "",
                price: "",
                sizes: [],
                colors: [],
              })
            }
          >
            Clear
          </button>

          <button type="submit">Add Product</button>
        </div>
      </form>
        </div>

     
    </div>
  );
};

export default AddProduct;
