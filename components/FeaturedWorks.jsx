import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import Link from "next/link"; // Import Link from next/link

export default function FeaturedWorks() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/work")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data.works)) {
          setWorks(data.works);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      id="works"
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-4 scroll-margin-top-24">
        Featured Works
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-6 max-w-2xl mx-auto">
        {works.length > 0 ? (
          works.map((work, index) => (
            <motion.div
              className="w-[300px]"
              key={work._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <Card>
                <CardContent className="p-4">
                  <Link href={`/work/${work._id}`} className="block">
                    <h3 className="font-semibold">{work.title}</h3>
                    <p className="text-sm mt-1">{work.description}</p>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p>Work not found</p>
        )}
      </div>
    </motion.section>
  );
}
  