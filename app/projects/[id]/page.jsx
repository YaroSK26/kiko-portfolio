"use client";

import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import HeaderId from "../../../components/HeaderId";
import Footer from "../../../components/Footer";

export default function ProjectDetail() {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("ID is not available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        if (data.project) {
          setProject(data.project);
        } else {
          setError("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]); 

  if (loading) return (
    <p className="flex justify-center items-center h-[95vh]">Loading...</p>
  );

  if (error) return <p>{error}</p>;

  if (!project) return <p>Project not found</p>;

  return (
    <div className=" min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <HeaderId />
      <div className="max-w-2xl mx-auto p-4  min-h-[75vh] flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <Footer />
    </div>
  );
}
