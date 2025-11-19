import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    {
      name: "Men",
      path: "men",
      img: "https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg"
    },
    {
      name: "Women",
      path: "women",
      img: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg"
    },
    {
      name: "Kids",
      path: "kids",
      img: "https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg"
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Shop by Category
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4">
        
        {categories.map((category, index) => (
          <Link key={index} to={`/categories/${category.path}`} className="flex flex-col items-center group">
            
            {/* Circle Image */}
            <div className="w-30 h-30 sm:w-30 sm:h-30 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
              <img 
                src={category.img} 
                alt={category.name} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Category Name */}
            <h3 className="mt-4 text-xl font-semibold transition-colors duration-300 group-hover:text-black/70">
              {category.name}
            </h3>

          </Link>
        ))}

      </div>
    </div>
  );
};

export default CategorySection;
