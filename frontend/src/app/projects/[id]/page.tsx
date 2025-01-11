"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectModal from "@/components/ProjectModal";
import Loading from "@/app/loading";
import DropZone from "@/components/DropZone";
import ImageCropper from "@/components/ImageCropper";
import PdfViewer from "@/components/PdfViewer";

const Page = () => {
  const [project, setProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  // const [tags, setTags] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadDrawing, setUploadDrawing] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/projects/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const org = await response.json();
        console.log(org);
        setProject(org);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const handleAddProject = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleFileChange = (files) => {
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCrop = (image) => {
    setCroppedImage(image);
  };

  return (
    <div className="container mx-auto p-4">
      {project ? (
        <>
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-semibold text-center p-4">
              {project.name}
            </h1>
            <p className="text-lg font-semibold text-center p-4">
              {project.type}
            </p>
            {/* <Button onClick={() => setUploadDrawing(!uploadDrawing)}>
              Cargar plano
            </Button> */}
            {openModal && (
              <ProjectModal
                title="Crear proyecto"
                projectId={project._id}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
          </div>
          {!selectedFile && <DropZone handleFileSelect={handleFileChange} />}
          {selectedFile && !croppedImage && (
            <div>
              {selectedFile.type.startsWith("image/") ? (
                <ImageCropper image={preview} onCrop={handleCrop} />
              ) : (
                <PdfViewer file={selectedFile} />
              )}
            </div>
          )}
          {croppedImage && (
            <div>
              <img src={croppedImage} alt="Cropped" />
              {/* <TagForm onSubmit={handleTagSubmit} /> */}
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
