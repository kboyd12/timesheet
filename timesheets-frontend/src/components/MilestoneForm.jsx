import React, { useState } from "react";
import axios from "axios";

const MilestoneForm = ({ projectId, onMilestoneAdded }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("/api/milestones", {
                project_id: projectId,
                name,
                description,
                amount: parseFloat(amount),
                due_date: dueDate,
            });
            onMilestoneAdded(response.data);
            setName("");
            setDescription("");
            setAmount("");
            setDueDate("");
        } catch (err) {
            setError("Failed to add milestone");
        }
    };

    return (
        <div className="milestone-form">
            <h2>Add Milestone</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Milestone Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">Add Milestone</button>
            </form>
        </div>
    );
};

export default MilestoneForm;

