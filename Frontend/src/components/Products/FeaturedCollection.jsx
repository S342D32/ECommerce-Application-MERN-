import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";


const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* left column */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Apparel made for your everyday Life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet optio
            quae modi magnam expedita totam ipsa sapiente beatae veniam harum,
            ullam inventore exercitationem doloribus soluta, et odio. Quaerat
            tempora ipsum quibusdam corrupti et, mollitia excepturi magni
            recusandae voluptate iusto earum! Tempore aliquid architecto culpa
            eius, quod cum error possimus, incidunt placeat magnam explicabo
            unde! Dolorem minima beatae, ea veritatis ad perferendis
            voluptatibus quibusdam consequuntur repellendus fuga nisi corrupti
            explicabo expedita cupiditate nulla similique. Officia, dolorem
            sunt. Suscipit aut repudiandae rerum error neque placeat hic
            corporis dolores maxime blanditiis quas accusamus expedita a quaerat
           
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        {/* Right Content */}
        <div className="lg:w-1/2">
        <img src={featured} alt="Featured Collection" className="w-full h-full object-cover "/>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
