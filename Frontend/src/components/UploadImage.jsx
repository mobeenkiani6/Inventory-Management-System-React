import React, { useState } from "react";

function UploadImage({ uploadImage }) {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    setFileName(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  return (
    <div>
      <label
        htmlFor="fileInput"
        className="inline-flex items-center justify-center w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <svg
          className="w-5 h-5 mr-2 text-accent-primary"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15V3M12 3L8 7M12 3L16 7M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-medium">
          {fileName?.name ? fileName.name : "Choose profile image"}
        </span>
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".png, .jpeg, .jpg"
        required
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default UploadImage;
