# Floorplan Management System

## Trabajo integrador - Ingeniería de aplicaciones Web

### Descripción

Diferentes organismos del estado gestionan planos de construcciones (planos de arquitectura, estructura, instalaciones eléctricas, etc.) de forma manual. Es decir, instituciones como el instituto de la vivienda o la municipalidad, archivan los documentos en servidores de archivos (NFS, SFTP, Google Drive o cualquier otro).

Los archivos suelen ser imágenes raster (un mapa de bits tal como PNG) o vectoriales (son definiciones geométricas tal como SVG) pero por el momento no se procesan definiciones más avanzadas como BIM donde se especifican elementos de alto nivel como puertas, paredes o ventanas entre otros.

### Alcance

#### Carga del proyecto

El objetivo es implementar un gestor de contenidos especializado en gestionar proyectos de construcciones con sus respectivos planos. La solución deberá ser multitenant permitiendo que una sola instancia del software brinde acceso a usuarios de diferentes organizaciones registradas en el sistema y permita la carga de proyectos. 

Se deberá permitir definir un proyecto de construcción y una lista de planos que lo componen. Puede requerirse adaptarse según el municipio. Además, cada proyecto cuenta con datos específicos del edificio tales como:

- **Número identificador**: GUID identificador interno del software
- **Número/Nombre de Proyecto**: Opcional, puede ser asignado por el desarrollador
- **Expediente**: Es un identificador generado por la institución y el patrón se configura al crear la institución basado en RegEx o similar.
- **Obra**: Corresponde al tipo de documentación a presentar. Categorías: A CONSTRUIR, A AMPLIAR, A REFACCIONAR, A DEMOLER, A DEMOLER Y CONSTRUIR, A DOCUMENTAR
- **Destino**: Corresponde al destino funcional de la construcción, Categorías: Vivienda unifamiliar, Vivienda multifamiliar, Vivienda Unifamiliar Agrupada, Oficina, Local comercial, industria.
- **Ubicación**: Se indica el domicilio del inmueble. Ejemplo: Calle 56 entre calle 9 y 10.
- **Escala**: Corresponde a la escala gráfica del dibujo, relacionando las dimensiones reales con las representadas. El patrón es número:número como por ejemplo 1:100
- **Otras exigencias**: Se puede indicar la zonificación que corresponde según el Código de Planeamiento. Se pueden indicar superficie y otros parámetros como F.O.T y F.O.S.
- **Referencias**
- **Antecedente**: Es una descripción de texto libre que referencia a algún expediente anterior. Por ejemplo, en caso de demolición se puede indicar el plano de construcción de dicha edificación.
- **Propietario**: Hace referencia al titular del inmueble. Puede incluir datos personales, DNI y/o domicilio.
- **Proyectistas**: Hace referencia a los profesionales que han desarrollado el diseño y cálculos. Puede ser varios. Puede incluir nombre y apellido, Matrícula provincial, Matrícula municipal, DNI y/o domicilio.
- **Dirección técnica**: Hace referencia a los profesionales a cargo de la construcción de la obra. Incluye datos similares a los proyectistas. Puede ser una persona jurídica la contratista que ejecute la obra.
- **Aprobación**: Es un espacio reservado para las instituciones donde aprueban el plano. Podría ser un booleano de True (aprobado), False (no aprobado)

Dado que esta información podría variar de organización a organización, es conveniente pensar en una solución flexible para formularios dinámicos. Por ejemplo basados en JsonForm.

#### Carga de planos

Cada proyecto podrá contar con varios recursos (imágenes o PDFs) que corresponden a los planos o cualquier documentación técnica. 

Dado que una imagen o PDF puede incluir varios planos, el sistema deberá permitir extraer planos mediante una funcionalidad de recorte en donde el usuario delimite una parte de una imagen y extraiga una subimagen. Se deberá registrar la operación de recorte sobre el plano, asociando a una etiqueta el área de recorte, indicando:

- **Especialidad**: arquitectura, estructura, instalaciones eléctricas, instalación sanitaria, u otros.
- **Etiquetas**: Las etiquetas pueden ser varias. Por ejemplo, “planta”, “3erPiso”, “OrientaciónNorte”.

Se deberá llevar un registro de los planos ingresados, junto con los datos del usuario.

#### Integración con motor IA

Finalmente, el sistema se conectará con una API que procesará los planos y retornará información de elementos identificados. La API será provista por la cátedra. La API responderá a un HUB de modelos de redes neuronales pre-entrenados.

Este servicio podría detectar puertas y ventanas de un plano, retornando las coordenadas de un rectángulo que delimita la posición del objeto, a partir de archivos txt o json generados por el detector. En el siguiente ejemplo, la API retorna las coordenadas de ventanas y en la imagen se muestran ventanas sobre el plano. Por una cuestión de simplicidad solo se muestran las ventanas, pero el servicio podría retornar más elementos.

El sistema deberá mostrar en pantalla los elementos identificados. Por una cuestión de eficiencia, los elementos identificados deberán ser almacenados en la base de datos del sistema.

#### Administración

Dado que la aplicación deberá permitir el acceso a diferentes organizaciones, se deberá brindar un área de administración donde se puedan registrar organizaciones y poder administrar sus usuarios. De una institución conocemos su nombre, dirección y datos de contacto. Además, se especifica el formato:

- **Letra**: string
- **N°**: integer
- **Año**: corresponde al año del expediente.
- **Partida**: string, puede ser que incluya guiones.

El acceso de los usuarios de las organizaciones deberá ser mediante Single Sign On (SSO). En este caso, desde la administración se podrá activar o desactivar usuarios vinculados a cada organización.

### Licencia

El software deberá contar con una licencia open-source, preferiblemente permisiva como MIT. Puede encontrar más detalles en este sitio: [Choose a License](https://choosealicense.com/)

### Entregables

La entrega deberá contar con los siguientes elementos:

- Código fuente utilizando un repositorio GIT
- Mockups desarrollados en clase
- Al menos 4 tests de interfaz de usuario
- Documento breve con cualquier decisión tomada

### Planos Ejemplo

En el vínculo, se presentan tres planos ejemplo: plano de estructura, arquitectura e instalación eléctrica.
