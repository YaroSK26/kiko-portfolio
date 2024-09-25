import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import toast from "react-hot-toast";
import { Edit, Trash } from "lucide-react";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("featured");
  const [featuredWorks, setFeaturedWorks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch("/api/work")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.works)) {
          setFeaturedWorks(data.works);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error(error));

    fetch("/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, description };
    const endpoint = section === "featured" ? "/api/work" : "/api/projects";
    const method = editItem ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPost, id: editItem?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (section === "featured") {
          if (editItem) {
            setFeaturedWorks((prevWorks) =>
              prevWorks.map((work) =>
                work._id === data._id ? { ...work, ...newPost } : work
              )
            );
          } else {
            setFeaturedWorks((prevWorks) => [...prevWorks, data]);
          }
        } else {
          if (editItem) {
            setProjects((prevProjects) =>
              prevProjects.map((project) =>
                project._id === data._id ? { ...project, ...newPost } : project
              )
            );
          } else {
            setProjects((prevProjects) => [...prevProjects, data]);
          }
        }
        toast.success("Post processed successfully!");
        setTitle("");
        setDescription("");
        setSection("featured");
        setEditItem(null);
          window.location.reload();
      })
      .catch((error) => {
        console.error("Failed to process post:", error);
        toast.error("Failed to process post");
      });
  };

  const handleDelete = (section, id) => {
    let url;

    if (section === "featured") {
      url = `/api/work?id=${id}`;
    } else {
      url = `/api/projects?id=${id}`;
    }

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        if (section === "featured") {
          setFeaturedWorks((prevWorks) =>
            prevWorks.filter((work) => work._id !== id)
          );
        } else {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project._id !== id)
          );
        }
        toast.success("Item deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
        toast.error("Failed to delete item");
      });
  };

  const handleEdit = (item, section) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditItem(item);
    setSection(section);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Post description"
          required
        />
        <Select value={section} onValueChange={setSection}>
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured Works</SelectItem>
            <SelectItem value="projects">Projects</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">{editItem ? "Update Post" : "Add Post"}</Button>
      </form>

      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="text-2xl mt-10">Featured Works</h2>
        {featuredWorks.map((work) => (
          <div key={work._id}>
            <Card>
              <CardContent className="p-4 flex flex-col  items-center justify-between">
                <div>
                  <h3 className="font-semibold">{work.title}</h3>
                  <p className="text-sm mt-1">{work.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(work, "featured")}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete("featured", work._id)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <br />
      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="text-2xl">Projects</h2>
        {projects.map((project) => (
          <div key={project._id}>
            <Card>
              <CardContent className="p-4 flex flex-col  items-center justify-center">
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm mt-1">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project, "projects")}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete("projects", project._id)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
