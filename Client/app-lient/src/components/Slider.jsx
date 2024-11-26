import { useState, useEffect } from 'react';

const images = [
  "https://img4.thuthuatphanmem.vn/uploads/2020/06/26/hinh-anh-banner-dien-may-thong-minh_033705387.png",
  "https://img3.thuthuatphanmem.vn/uploads/2019/10/08/banner-quang-cao-dien-thoai_103211774.jpg",
  "https://tse2.mm.bing.net/th?id=OIP.8OQ8xqSZIBpX1y2fWwxmWwHaCo&pid=Api&P=0&h=180",
];

const fixedImage = "https://tse2.mm.bing.net/th?id=OIP.XEIfbUaqzTavsZ7QhNCzWQHaFn&pid=Api&P=0&h=180"; // Replace with your fixed image URL

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Grid container for slider and fixed image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Slider Section - 8 columns */}
        <div className="md:col-span-8 relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-full h-full">
                <img 
                  src={image} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-200 transition focus:outline-none"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-200 transition focus:outline-none"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <div 
                key={index} 
                onClick={() => goToSlide(index)}
                className={`cursor-pointer h-4 w-4 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'} transition duration-300 transform ${index === currentIndex ? 'scale-125' : ''}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Fixed Image Section - 4 columns */}
        <div className="md:col-span-4 flex items-center justify-center">
          <img 
            src={fixedImage} 
            alt="Fixed Display" 
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default Slider;
