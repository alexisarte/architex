"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectModal from "@/components/ProjectModal";
import OrganizationCard from "@/components/OrganizationCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "flowbite-react";
import Loading from "@/app/loading";
import DropZone from "@/components/DropZone";
import ImageCropper from "@/components/ImageCropper";
import PdfViewer from "@/components/PdfViewer";

const Page = () => {
  const [organization, setOrganization] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  // const [tags, setTags] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [changePlanner, setChangePlanner] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/organizations/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const org = await response.json();
        console.log(org);
        setOrganization(org);
      } catch (error) {
        console.error("Failed to fetch organization:", error);
      }
    };

    if (params.id) {
      fetchOrganization();
    }
  }, [params.id]);
  const handleAddProject = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCrop = (image) => {
    setCroppedImage(image);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleAddProject}>Agregar proyecto</Button>
      {organization ? (
        <>
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-semibold text-center p-4">
              {organization.name}
            </h1>
            <p className="text-lg font-semibold text-center p-4">
              {organization.description}
            </p>
            <Button onClick={() => setChangePlanner(!changePlanner)}>
              Cargar plano
            </Button>
            {openModal && (
              <ProjectModal
                title="Crear proyecto"
                organizationId={organization._id}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold">Proyectos</h2>
              <div className="grid grid-cols-3 gap-4">
                {organization.projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          </div>
          {changePlanner ? (
            <>
              <DropZone preview={preview} handleFileSelect={handleFileChange} />
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
          ) : null}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
