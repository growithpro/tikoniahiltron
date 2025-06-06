import React from 'react';

const images = [
  'https://images.pexels.com/photos/2422276/pexels-photo-2422276.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3949100/pexels-photo-3949100.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://plus.unsplash.com/premium_photo-1683836722608-60ab4d1b58e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW50ZXJuZXR8ZW58MHx8MHx8fDA%3D',
  'https://cdn.pixabay.com/photo/2016/09/14/08/26/web-1668927_1280.jpg',
  'https://media.istockphoto.com/id/891297988/photo/seo-search-engine-optimization.jpg?b=1&s=612x612&w=0&k=20&c=YC_us3mf2Mx_ceMQXXut52My6f6JSkM6lmIzYxi_UWQ=',
  'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWl8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdWQlMjBjb21wdXRpbmd8ZW58MHx8MHx8fDA%3D',
];

const Gallery = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Photo Gallery</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
