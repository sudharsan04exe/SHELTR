import React, { useState } from "react";
import Button from "../commons/Button";
import Input from "../commons/Input";
import { createBooking } from "../../services/bookingService";

const BookingForm = ({ listingId, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    notes: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.startDate || !formData.endDate) {
      setError("Start date and end date are required.");
      return;
    }
    setLoading(true);
    try {
      await createBooking({ listingId, ...formData });
      onBookingSuccess();
    } catch (err) {
      setError(err.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <Input
        label="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <Input
        label="End Date"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <Input
        label="Notes"
        name="notes"
        type="text"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Additional information (optional)"
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </Button>
    </form>
  );
};

export default BookingForm;
