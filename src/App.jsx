import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NoteFoundPage from "./pages/NoteFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";

const App = () => {
  // Function to handle adding a new job
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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="*" element={<NoteFoundPage />} />
            <Route path="/job/:id" element={<JobPage />} />
            <Route
              path="/add-job"
              element={<AddJobPage addJobSubmit={addJob} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
