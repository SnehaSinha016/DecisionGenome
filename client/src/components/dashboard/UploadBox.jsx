import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

import { uploadPDF } from "../../services/uploadService";

export default function UploadBox({ onUploadSuccess }) {

  const fileInput = useRef();

  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {

    if (!file) return;

    try {

      setLoading(true);

      // Upload document using service
      const response = await uploadPDF(file);

      console.log("Upload Response:", response);

      // Refresh dashboard
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (err) {

      console.error(err);

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="bg-white rounded-2xl border border-gray-200 p-10 text-center cursor-pointer hover:border-blue-500 transition"
      onClick={() => fileInput.current?.click()}
    >

      <UploadCloud
        size={60}
        className="mx-auto text-blue-500"
      />

      <h2 className="text-2xl font-semibold mt-5">
        Upload PDF
      </h2>

      <p className="text-gray-500 mt-2">
        Drag & Drop or Click
      </p>

      <input
        hidden
        ref={fileInput}
        type="file"
        accept=".pdf"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {loading && (

        <p className="mt-5 text-blue-600">
          Processing Document...
        </p>

      )}

    </div>

  );

}