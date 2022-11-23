import React, { useState } from "react";
import axios from "axios";
const AdminHomepage = () => {
  const [file, setFile] = useState();
  const uploadFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/post-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      });
  };
  console.log(file);
  return (
    <div>
      <form onSubmit={uploadFile}>
        <input
          type="file"
          name="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdminHomepage;
