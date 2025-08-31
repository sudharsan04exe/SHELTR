import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { createListing } from "../../services/ListingService";

const ListingForm = ({ initialData = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    location: initialData.location || "",
    imageUrl: initialData.imageUrl || ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.title || !formData.price || !formData.location) {
      setError("Title, price, and location are required.");
      return;
    }
    setLoading(true);
    try {
      await createListing(formData);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || "Failed to save listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <Input
        label="Title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 font-semibold text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a detailed description"
        />
      </div>
      <Input
        label="Price (per night)"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <Input
        label="Location"
        name="location"
        type="text"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <Input
        label="Image URL"
        name="imageUrl"
        type="url"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Link to an image of the property"
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Listing"}
      </Button>
    </form>
  );
};

export default ListingForm;
