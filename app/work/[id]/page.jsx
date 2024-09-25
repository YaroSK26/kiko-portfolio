"use client";

import { useParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import HeaderId from "../../../components/HeaderId";
import Footer from "../../../components/Footer";

export default function WorkDetail() {
  const { id } = useParams(); 
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      if (!id) {
        setError("ID is not available");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/work/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch work");
        }
        const data = await response.json();
        if (data.work) {
          setWork(data.work);
        } else {
          setError("Work not found");
        }
      } catch (error) {
        console.error("Error fetching work:", error);
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [id]); 

  if (loading) return <p className="flex justify-center items-center h-[95vh]">Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!work) return <p>Work not found</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <HeaderId />
      <div className="max-w-2xl mx-auto p-4  min-h-[75vh] flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
        <p>{work.description}</p>
      </div>
      <Footer />
    </div>
  );
}
