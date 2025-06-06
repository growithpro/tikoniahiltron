import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    role: 'Product Manager at Acme Inc.',
    quote:
      'This platform transformed the way we build software. The team is fantastic and support is top-notch.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'CTO at BetaCorp',
    quote:
      'Reliable, fast, and beautifully designed. Our team productivity went through the roof!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    role: 'Freelance Designer',
    quote:
      'I love how intuitive the tools are. I was up and running in no time, and the UI is gorgeous.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          What Our Customers Say
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
