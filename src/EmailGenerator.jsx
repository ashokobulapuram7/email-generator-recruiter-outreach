import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const EmailGenerator = () => {
    const [recruiter, setRecruiter] = useState({
        name: "",
        email: "",
        company: "",
        jobRole: "",
        roleDescription: "",
        resume: null,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setRecruiter({ ...recruiter, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setRecruiter({ ...recruiter, resume: file });
    };

    const sendEmail = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", recruiter.name);
        formData.append("email", recruiter.email);
        formData.append("company", recruiter.company);
        formData.append("jobRole", recruiter.jobRole);
        formData.append("roleDescription", recruiter.roleDescription);
        if (recruiter.resume) {
            formData.append("resume", recruiter.resume);
        }

        try {
            await axios.post("https://your-lambda-api-url/send-email", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Email Sent Successfully!");
        } catch (error) {
            console.error("Error sending email", error);
            alert("Failed to send email");
        }
        setLoading(false);
    };

    return (
        <div className="form-container">
            <h2>Send Recruiter Email</h2>
            <input
                type="text"
                name="name"
                placeholder="Recruiter's Name"
                value={recruiter.name}
                onChange={handleChange}
                className="input-field"
            />
            <input
                type="email"
                name="email"
                placeholder="Recruiter's Email"
                value={recruiter.email}
                onChange={handleChange}
                className="input-field"
            />
            <input
                type="text"
                name="company"
                placeholder="Company"
                value={recruiter.company}
                onChange={handleChange}
                className="input-field"
            />
            <input
                type="text"
                name="jobRole"
                placeholder="Job Role"
                value={recruiter.jobRole}
                onChange={handleChange}
                className="input-field"
            />
            <textarea
                name="roleDescription"
                placeholder="Role Description"
                value={recruiter.roleDescription}
                onChange={handleChange}
                className="input-field"
                rows="4"
            />
            <label htmlFor="resume-upload" className="file-label">
                Upload Resume:
            </label>
            <input
                id="resume-upload"
                type="file"
                onChange={handleFileChange}
                className="file-input"
            />
            <button
                onClick={sendEmail}
                disabled={loading}
                className="button send-button"
            >
                {loading ? "Sending..." : "Send Email"}
            </button>
        </div>
    );
};

export default EmailGenerator;
