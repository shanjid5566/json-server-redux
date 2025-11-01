import React, { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus("success");
      setTitle("");
      setBody("");
      console.log("Created post:", data);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Adding..." : "Add Post"}
          </button>
        </div>
      </form>

      {status === "success" && (
        <p className="mt-3 text-green-600">Post created successfully.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-600">Failed to create post.</p>
      )}
    </div>
  );
};

export default AddPost;
