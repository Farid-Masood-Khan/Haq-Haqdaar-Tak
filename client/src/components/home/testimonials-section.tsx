import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  rating: number;
};

export default function TestimonialsSection() {
  const [slidePosition, setSlidePosition] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Haq Haqdaar Tak provided my family with food during our most difficult time. Their volunteers were kind and respectful, and the quality of food items was excellent.",
      name: "Ahmed Raza",
      title: "Lahore Resident",
      rating: 5
    },
    {
      id: 2,
      quote: "As a regular donor, I appreciate the transparency and dedication of the Haq Haqdaar Tak team. They keep me updated on how my donations are making a difference in the community.",
      name: "Fatima Abbasi",
      title: "Monthly Donor",
      rating: 5
    },
    {
      id: 3,
      quote: "I've volunteered with several organizations, but Haq Haqdaar Tak stands out for their organization and commitment. The team ensures that aid reaches those who truly need it.",
      name: "Usman Khan",
      title: "Volunteer",
      rating: 4.5
    },
    {
      id: 4,
      quote: "The monthly rashan packages have been a blessing for my family. The quality and quantity of food items are impressive and last us the entire month.",
      name: "Safia Bibi",
      title: "Aid Recipient",
      rating: 5
    },
    {
      id: 5,
      quote: "I organized a corporate donation drive with Haq Haqdaar Tak and was impressed by their professionalism and impact. Our team felt truly connected to the cause.",
      name: "Ali Hassan",
      title: "Corporate Partner",
      rating: 5
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlide = () => {
    setSlidePosition(Math.max(0, slidePosition - 1));
  };

  const nextSlide = () => {
    setSlidePosition(Math.min(testimonials.length - slidesPerView, slidePosition + 1));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400" size={18} />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" fill="currentColor" />
          <path d="M12 17.8 18.2 21 17 14.1l5-4.8-7-1L12 2" />
        </svg>
      );
    }
    
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="text-yellow-400" size={18} />);
    }
    
    return stars;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">What People Say</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Hear from those who have been impacted by our work.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${slidePosition * 100 / slidesPerView}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className={`min-w-full px-4 ${
                    slidesPerView === 3 ? 'md:min-w-[50%] lg:min-w-[33.333%]' : 
                    slidesPerView === 2 ? 'md:min-w-[50%]' : ''
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-md p-6 h-full transition-transform duration-300 hover:scale-[1.02]">
                    <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-3 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-heading font-medium">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-100 transition-colors ${slidePosition === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={prevSlide}
            disabled={slidePosition === 0}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-100 transition-colors ${slidePosition >= testimonials.length - slidesPerView ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={nextSlide}
            disabled={slidePosition >= testimonials.length - slidesPerView}
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
