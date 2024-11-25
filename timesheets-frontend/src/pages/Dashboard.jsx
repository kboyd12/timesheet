import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "../components/ProjectForm";
import "../styles/Dashboard.css"

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCustomer, setExpandedCustomer] = useState(null); // Tracks which customer's projects are shown
    const [projects, setProjects] = useState({}); // Stores projects for each customer

    useEffect(() => {
        // Fetch customers from the backend
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/customers");
                setCustomers(response.data);
            } catch (err) {
                setError("Failed to load customers");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const toggleCustomerProjects = async (customerId) => {
        if (expandedCustomer === customerId) {
            setExpandedCustomer(null); // Collapse dropdown
        } else {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/projects/${customerId}`
                );
                setProjects((prev) => ({ ...prev, [customerId]: response.data }));
                setExpandedCustomer(customerId); // Expand dropdown
            } catch (err) {
                setError("Failed to load projects for this customer");
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="customers-list">
                <h2>Customers</h2>
                {customers.length > 0 ? (
                    <ul>
                        {customers.map((customer) => (
                            <li key={customer.id}>
                                <div>
                                    <strong>{customer.name}</strong>
                                    <button
                                        onClick={() => toggleCustomerProjects(customer.id)}
                                    >
                                        {expandedCustomer === customer.id
                                            ? "Hide Projects"
                                            : "Show Projects"}
                                    </button>
                                </div>
                                {expandedCustomer === customer.id && (
                                    <div className="projects-dropdown">
                                        <h3>Projects</h3>
                                        {projects[customer.id]?.length > 0 ? (
                                            <ul>
                                                {projects[customer.id].map((project) => (
                                                    <li key={project.id}>
                                                        {project.name} ({project.project_type})
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No projects found.</p>
                                        )}
                                        <ProjectForm
                                            customerId={customer.id}
                                            onProjectAdded={(newProject) =>
                                                setProjects((prev) => ({
                                                    ...prev,
                                                    [customer.id]: [
                                                        ...(prev[customer.id] || []),
                                                        newProject,
                                                    ],
                                                }))
                                            }
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No customers found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

