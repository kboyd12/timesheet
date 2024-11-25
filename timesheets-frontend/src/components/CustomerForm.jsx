import React, { useState } from "react";
import axios from "axios";

const CustomerForm = ({ onCustomerAdded }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:8000/api/customers", {
                name,
                description,
                company_id: 1, // Example company ID, replace as needed
            });
            onCustomerAdded(response.data);
            setName("");
            setDescription("");
        } catch (err) {
            setError("Failed to add customer");
        }
    };

    return (
        <div className="customer-form">
            <h2>Add Customer</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Customer</button>
            </form>
        </div>
    );
};

export default CustomerForm;

