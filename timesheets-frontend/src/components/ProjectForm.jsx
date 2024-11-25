import React, { useState } from "react";
import axios from "axios";

const ProjectForm = ({ customerId, onProjectAdded }) => {
    const [name, setName] = useState("");
    const [projectType, setProjectType] = useState("TIME_AND_MATERIALS");
    const [budget, setBudget] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        console.log(customerId, name, projectType, budget, hourlyRate)

        try {
            const response = await axios.post("http://localhost:8000/api/projects", {
                customer_id: customerId,
                name,
                project_type: projectType,
                budget: projectType === "FIXED_PRICE" ? parseFloat(budget) : null,
                hourly_rate: projectType === "TIME_AND_MATERIALS" ? parseFloat(hourlyRate) : null,
            });
            onProjectAdded(response.data);
            setName("");
            setBudget("");
            setHourlyRate("");
        } catch (err) {
            setError("Failed to add project");
        }
    };

    return (
        <div className="project-form">
            <h2>Add Project</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                >
                    <option value="TIME_AND_MATERIALS">Time and Materials</option>
                    <option value="FIXED_PRICE">Fixed Price</option>
                </select>
                {projectType === "FIXED_PRICE" && (
                    <input
                        type="number"
                        placeholder="Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                )}
                {projectType === "TIME_AND_MATERIALS" && (
                    <input
                        type="number"
                        placeholder="Hourly Rate"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        required
                    />
                )}
                <button type="submit">Add Project</button>
            </form>
        </div>
    );
};

// TODO fix form submission to merry with backend pydantic

export default ProjectForm;

