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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const [isCropping, setIsCropping] = useState(false); // Nuevo estado para controlar la visibilidad

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/projects/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const projectData = await response.json();
        setProject(projectData);
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

  const handleFileChange = (files: FileList) => {
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Actualizar vista previa con el nuevo archivo
      setIsCropping(true); // Hacer visible el recortador y ocultar el DropZone
    }
  };

  const handleCrop = (image: string) => {
    // Añadir la imagen recortada a la lista sin borrar las anteriores
    setCroppedImages((prevImages) => [image, ...prevImages]);
    setSelectedFile(null); // Limpiar el archivo seleccionado después del recorte
    setIsCropping(false); // Volver a mostrar el DropZone después de recortar
  };

  const addImageToProject = async (image: string) => {
    const response = await fetch(
      `http://localhost:3000/projects/${project._id}/image`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      }
    );
  
    if (response.ok) {
      const updatedProject = await response.json();
      
      // Asegurar que el nuevo plano se agregue al inicio del array
      setProject((prevProject) => ({
        ...prevProject,
        planos: [image, ...prevProject.planos], // Nuevo plano primero
      }));
  
      console.log("Image added to project:", updatedProject);
    }
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
            {openModal && (
              <ProjectModal
                title="Crear proyecto"
                projectId={project._id}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
          </div>

          {/* Render selected file for cropping */}
          {selectedFile && isCropping && (
            <div>
              {selectedFile.type.startsWith("image/") ? (
                <>
                  <ImageCropper
                    image={preview}
                    onCrop={handleCrop}
                    addImageToProject={addImageToProject} // Pasar la función como prop
                  />
                </>
              ) : (
                <PdfViewer file={selectedFile} />
              )}
            </div>
          )}

          {/* DropZone to handle file selection */}
          {!isCropping && <DropZone handleFileSelect={handleFileChange} />}

          <h3 className="text-xl text-center m-4">Planos</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {project.planos.map((plan, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={plan} // Asumiendo que la imagen ya está en base64 o que `plan.image` es el path al archivo
                  alt={`Plano ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-lg" // Añadí algunas clases de Tailwind para darle estilo
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
