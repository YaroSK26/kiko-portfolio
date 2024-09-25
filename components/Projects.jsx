"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import Link from "next/link"; // Import Link from next/link

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, []);

  const nextProject = () => {
    if (projects.length > 0) {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      id="projects"
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>

      <div className="flex justify-center items-center flex-wrap gap-6 max-w-2xl mx-auto">
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div className="w-[300px]"
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href={`/projects/${project._id}`} className="block">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm mt-1">{project.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center">Project not found</p>
        )}
      </div>
    </motion.section>
  );
}
