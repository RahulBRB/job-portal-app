import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NoteFoundPage from "./pages/NoteFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    if (!res.ok) {
      throw new Error("Failed to delete job");
    }
    return res.json();
  };

  // Update job
  const updateJob = async (updatedJob) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    if (!res.ok) {
      throw new Error("Failed to update job");
    }
    return res.json();
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="*" element={<NoteFoundPage />} />
            <Route
              path="/job/:id"
              element={<JobPage deleteJob={deleteJob} />}
            />
            <Route
              path="/add-job"
              element={<AddJobPage addJobSubmit={addJob} />}
            />
            <Route
              path="/edit-job/:id"
              element={<EditJobPage updateJobSubmit={updateJob} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
