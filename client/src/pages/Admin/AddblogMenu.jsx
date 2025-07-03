import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "../../context/AppContext.jsx";

export function SelectDemo({ category, setCategory }) {
  return (
    <Select value={category} onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="Startup">Startup</SelectItem>
          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
          <SelectItem value="Finance">Finance</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function AddblogMenu() {
  const editorRef = useRef();
  const quillRef = useRef();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const { axios } = useAppContext();

  const submitHabndler = async (e) => {
    e.preventDefault();

    //Debug logs
    console.log("Submit Handler Triggered");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subTitle", subTitle);
      formData.append("category", category);
      formData.append("isPublished", isPublished);
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setImage(null);
        setTitle("");
        setDescription("");
        setSubTitle("");
        setCategory("");
        setIsPublished(false);
      }
    } catch (err) {
      console.log("[submitHabndler] error when submitting the blog: ", err);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
        placeholder: "Write your blog content here...",
      });

      //Listen to text change event
      quillRef.current.on("text-change", () => {
        const editorContext = quillRef.current.root.innerHTML;
        setDescription(editorContext);
      });
    }
  }, []);

  return (
    <form
      onSubmit={submitHabndler}
      className="flex-1 h-full bg-yellow-50/30 text-gray-600 overflow-scroll"
    >
      <div className="w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded bg-white">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : "/upload_area.svg"}
            alt="uplaod-area"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog Title</p>
        <input
          required
          value={title}
          type="text"
          placeholder="Enter the title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />
        <p className="mt-4">Sub Title</p>
        <input
          required
          value={subTitle}
          type="text"
          placeholder="Enter the sub title"
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 py-1.5 px-4 rounded cursor-pointer hover:underline"
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4 mb-4">Blog Category</p>
        <SelectDemo category={category} setCategory={setCategory} />

        <div className="flex gap-4 mt-5">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="hover:scale-125 cursor-pointer transition-all duration-200"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-4 py-1.5 mt-5 rounded text-white cursor-pointer hover:scale-105 transition-all duration-200"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
}

export default AddblogMenu;
