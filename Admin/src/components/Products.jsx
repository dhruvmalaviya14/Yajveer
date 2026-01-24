import React, { useState } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-hot-toast";
import "../CSS/Products.css";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";
import Allproduct from "./Allproduct";
import { useDispatch } from "react-redux";
import { Fectchdata } from "../Redux/CartSlice.js";

const Products = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    photos: [],
    productName: "",
    description: "",
    discount: 0,
    ingredients: [""],
    benefits: [""],
    actualPrice: "",
    files: [],
    type: "box", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInput = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validate total number of photos
    if (files.length + formData.photos.length > 7) {
      toast.error("You can only upload up to 7 photos in total");
      return;
    }

    // Validate file types and sizes
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 5MB

    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      toast.error(
        "Please only upload images (JPG, PNG, WEBP) less than 5MB in size"
      );
      return;
    }

    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
      files: [...prev.files, ...files],
    }));
  };

  const validateForm = () => {
    if (formData.files.length === 0) {
      toast.error("At least one product photo is required");
      return false;
    }

    if (!formData.productName.trim()) {
      toast.error("Product name is required");
      return false;
    }

    if (
      !formData.description.trim() ||
      formData.description.trim().length < 10
    ) {
      toast.error(
        "Description is required and should be at least 10 characters long"
      );
      return false;
    }

    if (!formData.actualPrice || formData.actualPrice <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    if (formData.discount < 0 || formData.discount > 100) {
      toast.error("Discount must be between 0 and 100");
      return false;
    }

    if (!formData.type) {
      toast.error("Please select a packaging type");
      return false;
    }

    const filledIngredients = formData.ingredients.filter((ing) => ing.trim());
    if (filledIngredients.length === 0) {
      toast.error("At least one ingredient is required");
      return false;
    }

    const filledBenefits = formData.benefits.filter((ben) => ben.trim());
    if (filledBenefits.length === 0) {
      toast.error("At least one benefit is required");
      return false;
    }

    return true;
  };

  // Cleanup function for URL objects
  React.useEffect(() => {
    return () => {
      // Cleanup URLs when component unmounts
      formData.photos.forEach((photoUrl) => {
        if (photoUrl.startsWith("blob:")) {
          URL.revokeObjectURL(photoUrl);
        }
      });
    };
  }, [formData.photos]);

  const resetForm = () => {
    // Cleanup URLs when form is reset
    formData.photos.forEach((photoUrl) => {
      if (photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    });

    setFormData({
      photos: [],
      productName: "",
      description: "",
      discount: 0,
      ingredients: [""],
      benefits: [""],
      actualPrice: "",
      files: [],
      type: "box", // Reset to default value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("actualPrice", formData.actualPrice);
      formDataToSend.append("type", formData.type);

      // Filter out empty entries before sending
      const filteredIngredients = formData.ingredients.filter((ing) =>
        ing.trim()
      );
      const filteredBenefits = formData.benefits.filter((ben) => ben.trim());

      formDataToSend.append("ingredients", JSON.stringify(filteredIngredients));
      formDataToSend.append("benefits", JSON.stringify(filteredBenefits));

      // Append photos
      formData.files.forEach((file) => {
        formDataToSend.append("photos", file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/products/admin/addproducts`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.statusCode === 201) {
        toast.success("Product successfully added!");
        setShowForm(false);
        resetForm();
        dispatch(Fectchdata());
      } else {
        toast.error(response.data?.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(
        "Error adding product: " +
          (error.response?.data?.message ||
            error.message ||
            "Unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    // Cleanup URLs when form is closed
    formData.photos.forEach((photoUrl) => {
      if (photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    });
    setShowForm(false);
    resetForm();
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="products-container">
          <div className="products-header">
            <h1>Products</h1>
            <button
              className="add-product-btn"
              onClick={() => setShowForm(true)}
            >
              <FiPlus /> Add Product
            </button>
          </div>

          <Allproduct />

          {showForm && (
            <div
              className="modal-overlay"
              onClick={(e) => {
                if (e.target.className === "modal-overlay") {
                  handleCloseForm();
                }
              }}
            >
              <div className="modal-content">
                <button className="modal-close-btn" onClick={handleCloseForm}>
                  <FiX />
                </button>
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="image-upload-section">
                    <label className="upload-label">
                      <AiOutlineCloudUpload className="upload-icon" />
                      <span>Upload Photos (Max 7)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <div className="image-preview">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="preview-image">
                          <img src={photo} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                photos: prev.photos.filter(
                                  (_, i) => i !== index
                                ),
                                files: prev.files.filter((_, i) => i !== index),
                              }));
                            }}
                            className="remove-image"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Actual Price (₹)</label>
                      <input
                        type="number"
                        name="actualPrice"
                        value={formData.actualPrice}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Packaging Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="packaging-select"
                      >
                        <option value="box">Box</option>
                        <option value="pouch">Pouch</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Ingredients</label>
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) =>
                            handleArrayInput(
                              index,
                              e.target.value,
                              "ingredients"
                            )
                          }
                          placeholder="Enter ingredient"
                        />
                        {formData.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField(index, "ingredients")
                            }
                            className="remove-btn"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("ingredients")}
                      className="add-array-btn"
                    >
                      <FiPlus /> Add Ingredient
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Benefits</label>
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) =>
                            handleArrayInput(index, e.target.value, "benefits")
                          }
                          placeholder="Enter benefit"
                        />
                        {formData.benefits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, "benefits")}
                            className="remove-btn"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("benefits")}
                      className="add-array-btn"
                    >
                      <FiPlus /> Add Benefit
                    </button>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
