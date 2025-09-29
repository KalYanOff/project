/**
 * GALLERY IMAGES CONFIGURATION
 * ============================
 * 
 * INSTRUCTIONS FOR ADDING GALLERY PHOTOS:
 * 
 * 1. Create a folder: /public/img/gallery/
 * 
 * 2. Add your photos to this folder with descriptive names:
 *    - exterior.jpg (building exterior)
 *    - garden.jpg (garden/yard areas) 
 *    - kitchen.jpg (common kitchen)
 *    - bbq.jpg (barbecue area)
 *    - playground.jpg (children's area)
 *    - room1.jpg, room2.jpg (room examples)
 * 
 * 3. Update the array below with your image paths and descriptions
 * 
 * 4. Recommended image size: 1200x900px for best quality
 * 
 * 5. Supported formats: JPG, PNG, WebP
 */

export const galleryImages = [
  {
    src: "/img/gallery/2.png",           // UPDATE: Path to your garden/yard photo
    alt: "Зелёный двор и зоны отдыха"    // Description for accessibility
  },
  {
    src: "/img/gallery/7.jpg",           // UPDATE: Path to your entrance photo  
    alt: "Вход на территорию"
  },
  {
    src: "/img/gallery/9.jpg",           // UPDATE: Path to your kitchen photo
    alt: "Общая кухня — вся посуда и техника"
  },
  {
    src: "/img/gallery/04-bbq.jpg",      // UPDATE: Path to your BBQ area photo
    alt: "Мангал и большой стол"
  },
  {
    src: "/img/gallery/05-playground.jpg", // UPDATE: Path to playground photo
    alt: "Детская площадка в тени"
  },
  {
    src: "/img/gallery/06-room-std-a.jpg", // UPDATE: Path to sample room photo
    alt: "Номер Стандарт — двуспальная кровать"
  }
  // ADD MORE IMAGES HERE:
  // {
  //   src: "/img/gallery/your-photo.jpg",
  //   alt: "Description of your photo"
  // }
];

/**
 * Gets a subset of gallery images for initial display
 */
export const getGalleryPreview = (count = 6) => {
  return galleryImages.slice(0, count);
};