import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Fish, Leaf, UtensilsCrossed, Globe, Star, MapPin, Phone, Clock, X, Send, Navigation, Instagram, Facebook } from 'lucide-react';

// --- GALERÍA DE IMÁGENES DE PRUEBA (Enlaces Verificados) ---
const localImages = {
  hero: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2070&auto=format&fit=crop',
  story: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop',
  huevosShakshuka: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=600&auto=format&fit=crop',
  huevosBenedictinos: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop',
  ceviche: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=600&auto=format&fit=crop',
  lavaBowl: 'https://images.unsplash.com/photo-1598515214211-89d3c7373051?q=80&w=600&auto=format&fit=crop',
  tacosVeganos: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
  chef: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=192&auto=format&fit=crop',
  gerente: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=192&auto=format&fit=crop',
  mixologo: 'https://images.unsplash.com/photo-1551024709-8f237c2045b5?q=80&w=192&auto=format&fit=crop',
  ambiente: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop',
  cliente: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=500&auto=format&fit=crop',
  blog1: 'https://images.unsplash.com/photo-1574484284000-24b21b44f2b3?q=80&w=600&auto=format&fit=crop',
  blog2: 'https://images.unsplash.com/photo-1565511739329-1a73c5453622?q=80&w=600&auto=format&fit=crop',
  blog3: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop',
};

// --- DATOS SIMULADOS (CMS Content) ---
const cmsData = {
  es: {
    meta: {
        title: "Vénia Cozumel | Restaurante de Cocina Caribeña de Autor",
        description: "Descubre Vénia, una experiencia sensorial en Cozumel. Disfruta de nuestra cocina caribeña, reserva tu mesa y vive momentos inolvidables frente al mar."
    },
    categories: { all: 'Todos', main: 'Principales', starters: 'Entrantes', vegan: 'Vegano' },
    items: [
        { id: 1, category: 'main', image: localImages.huevosShakshuka, name: 'Huevos Shakshuka', description: 'Huevos pochados en una vibrante salsa de tomate y pimientos, un clásico del Mediterráneo.', price: '$250', isLimited: true },
        { id: 2, category: 'main', image: localImages.huevosBenedictinos, name: 'Huevos Benedictinos', description: 'El brunch perfecto con salmón ahumado, huevos pochados y salsa holandesa sedosa.', price: '$280', isLimited: false },
        { id: 3, category: 'starters', image: localImages.ceviche, name: 'Ceviche Vénia', description: 'La frescura del mar de Cozumel con leche de tigre y un toque de cilantro.', price: '$210', isLimited: false },
        { id: 4, category: 'vegan', image: localImages.tacosVeganos, name: 'Tacos de Jamaica', description: 'Sorprendente y delicioso, con la flor de jamaica guisada al pibil.', price: '$190', isLimited: false },
        { id: 5, category: 'main', image: localImages.lavaBowl, name: 'Lava Bowl Especial', description: 'Una explosión de sabor en nuestro bowl de autor, servido con pan rústico tostado.', price: '$320', isLimited: true },
    ],
    gallery: {
        title: "Momentos Vénia",
        description: "Explora la atmósfera, los sabores y las sonrisas que hacen de nuestro restaurante un lugar único en Cozumel.",
        images: [
            { id: 1, src: localImages.ambiente, alt: "Ambiente elegante del restaurante por la noche", testimonial: null },
            { id: 2, src: localImages.huevosShakshuka, alt: "Platillo gourmet servido en la mesa", testimonial: "“¡Cada platillo es una obra de arte! La mejor cena de nuestras vacaciones.” - Laura G." },
            { id: 3, src: localImages.cliente, alt: "Mujer disfrutando de un platillo", testimonial: null },
            { id: 4, src: localImages.huevosBenedictinos, alt: "Huevos benedictinos servidos elegantemente", testimonial: "“Los mejores Huevos Benedictinos de la isla. ¡Imperdible!” - Carlos S." },
            { id: 5, src: localImages.chef, alt: "Chef sonriendo en la cocina", testimonial: null },
            { id: 6, src: localImages.ceviche, alt: "Ceviche fresco y vibrante", testimonial: "“El ceviche más fresco que he probado en mi vida.” - Ana P." },
        ]
    },
    teamSection: {
        title: "Nuestra Familia",
        description: "Las sonrisas detrás de la magia. Personas apasionadas por crear momentos inolvidables para ti.",
        members: [
            { id: 1, name: "Chef Alejandro", role: "Chef Ejecutivo", image: localImages.chef, bio: "Con 15 años de experiencia, el Chef Alejandro fusiona la tradición yucateca con técnicas de vanguardia." },
            { id: 2, name: "Sofía Herrera", role: "Gerente de Sala", image: localImages.gerente, bio: "Sofía se asegura de que tu experiencia sea perfecta, cuidando cada detalle desde que entras por la puerta." },
            { id: 3, name: "David Castillo", role: "Mixólogo Jefe", image: localImages.mixologo, bio: "Creador de nuestros cócteles de autor, David mezcla los sabores del Caribe en cada copa." }
        ]
    },
    blogSection: {
        title: "Historias de Sabor",
        description: "Detrás de cada platillo hay una historia. Descubre los secretos y la tradición que inspiran nuestra cocina.",
        cta: "Leer más",
        articles: [
            { id: 1, slug: "la-leyenda-del-tikin-xic", image: localImages.blog1, title: "La Leyenda del Pescado Tikin Xic", excerpt: "Sumérgete en la tradición maya y descubre por qué este platillo es más que una receta, es un ritual ancestral..." },
            { id: 2, slug: "el-secreto-de-nuestro-ceviche", image: localImages.blog2, title: "El Secreto de Nuestro Ceviche Vénia", excerpt: "La frescura no es solo un ingrediente, es nuestra filosofía. Conoce cómo seleccionamos el pescado cada mañana..." },
            { id: 3, slug: "brunch-en-venia", image: localImages.blog3, title: "El Brunch que Conquista Cozumel", excerpt: "Explora por qué nuestros Huevos Benedictinos se han convertido en la estrella de los fines de semana." },
        ]
    },
    hero: { title: 'Vénia Cozumel', subtitle: 'Donde cada bocado es un recuerdo.', cta: 'Reservar una Experiencia' },
    menuSection: { title: 'Un Menú Sensorial', description: 'Platillos creados con la pasión del Caribe y la frescura de nuestro mar. Descubre tu próximo sabor favorito.' },
    storySection: { title: 'Nuestra Historia', content: 'Todo comenzó por un sueño: capturar la magia de Cozumel en un plato. Vénia no es solo un restaurante, es el punto de encuentro para quienes buscan momentos inolvidables, donde la brisa del mar acompaña conversaciones y cada sabor cuenta una parte de nuestra historia. Nuestro equipo es una familia unida por el amor a la buena mesa y el servicio excepcional.', cta: 'Conoce al equipo' },
    footer: { 
        copyright: "Todos los derechos reservados.",
        socials: {
            instagram: "https://instagram.com/veniacozumel",
            facebook: "https://facebook.com/veniacozumel"
        }
    },
    reservationsSection: {
        title: "Reserve su Mesa",
        description: "Asegure su lugar en el paraíso. Las reservaciones online son la mejor forma de garantizar su experiencia Vénia.",
        form: { name: "Nombre Completo", guests: "Número de Personas", date: "Fecha", time: "Hora", submit: "Confirmar Reservación", success: "¡Gracias! Su mesa ha sido reservada. Recibirá una confirmación por correo electrónico en breve.", error: "Por favor, complete todos los campos." },
        exclusivity: "Nota: Para asegurar una experiencia íntima, solo aceptamos 10 reservaciones por noche a través de nuestro sitio web."
    },
    locationSection: {
        title: "Encuéntranos en el Corazón del Caribe",
        description: "Estamos ubicados en el lugar perfecto para que disfrutes de la brisa del mar antes o después de tu cena. ¡Te esperamos!",
        address: "Av. Rafael E. Melgar, Centro, 77600 Cozumel, Q.R.",
        phone: "+52 987 123 4567",
        hours: "Martes a Domingo: 1:00 PM - 11:00 PM",
        cta: "Cómo Llegar"
    },
    reviewsSection: {
        title: "Lo que dicen nuestros clientes",
        counter: "Más de 100 personas ya vivieron la experiencia Vénia",
        reviews: [
            { id: 1, platform: 'Google', author: 'Miguel R.', rating: 5, text: "¡Simplemente espectacular! La comida, el ambiente, el servicio... todo de 10. El Pescado Tikin Xic es una obligación.", url: "https://google.com" },
            { id: 2, platform: 'TripAdvisor', author: 'Samantha V.', rating: 5, text: "Un rincón mágico en Cozumel. Perfecto para una cena romántica. El ceviche es el más fresco que he probado.", url: "https://tripadvisor.com" },
            { id: 3, platform: 'Google', author: 'Javier L.', rating: 4, text: "Muy buena experiencia. Los cócteles son creativos y deliciosos. Un poco concurrido, así que es mejor reservar.", url: "https://google.com" }
        ]
    },
  },
  en: {
    // ... (Full English content with local images)
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const TexturedBackground = ({ children, className = '', id = '' }) => {
    return (
        <section id={id} className={`relative ${className}`}>
            <div 
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2303254E' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>
            <div className="relative z-10">{children}</div>
        </section>
    );
};

const fetchContentFromCMS = (lang) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cmsData[lang] || cmsData.es);
        }, 800);
    });
};

const MetaTags = ({ title, description }) => {
    useEffect(() => {
        if (title) document.title = title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && description) {
            metaDesc.setAttribute('content', description);
        }
    }, [title, description]);
    return null;
};

const RestaurantSchema = ({ content }) => {
    if (!content || !content.footer) return null;
    const schema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Vénia Cozumel",
        "image": localImages.ambiente,
        "@id": "",
        "url": "https://www.veniacozumel.com",
        "telephone": content.phone,
        "priceRange": "$$$",
        "menu": "https://www.veniacozumel.com/#menu",
        "servesCuisine": "Caribeña",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Rafael E. Melgar",
            "addressLocality": "Cozumel",
            "addressRegion": "Q.R.",
            "postalCode": "77600",
            "addressCountry": "MX"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 20.5102,
            "longitude": -86.9511
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "13:00",
            "closes": "23:00"
        },
        "sameAs": [
            content.footer.socials.facebook,
            content.footer.socials.instagram
        ] 
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(schema)}
        </script>
    );
};


function App() {
  const [lang, setLang] = useState('es');
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const initialLang = (browserLang === 'en' && cmsData.en) ? 'en' : 'es';
    setLang(initialLang);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchContentFromCMS(lang).then(data => {
        setContent(data);
        setIsLoading(false);
    });
  }, [lang]);

  const toggleLang = () => { setLang(prevLang => (prevLang === 'es' ? 'en' : 'es')); };
  
  if (isLoading || !content) {
    return (
        <div className="bg-[#F3E9D2] min-h-screen flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <ChefHat size={48} className="text-[#00A6A6]" />
            </motion.div>
        </div>
    );
  }

  return (
    <>
      <MetaTags title={content.meta.title} description={content.meta.description} />
      <RestaurantSchema content={{...content.locationSection, footer: content.footer}} />
      <div className="bg-[#F3E9D2] min-h-screen font-sans text-[#03254E]">
        <Header lang={lang} toggleLang={toggleLang} />
        <main>
          <HeroSection content={content.hero} />
          <MenuSection content={content} />
          <StorySection content={content.storySection} />
          <TeamSection content={content.teamSection} />
          <GallerySection content={content.gallery} setSelectedImg={setSelectedImg} />
          <ReviewsSection content={content.reviewsSection} />
          <BlogSection content={content.blogSection} />
          <ReservationsSection content={content.reservationsSection} />
          <LocationSection content={content.locationSection} />
        </main>
        <Footer content={content.footer} location={content.locationSection} />
        <AnimatePresence>
          {selectedImg && <Lightbox selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
        </AnimatePresence>
      </div>
    </>
  );
}

const Header = ({ toggleLang }) => (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-[#03254E] flex items-center gap-2">
            <ChefHat className="text-[#00A6A6]" /> Vénia
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#menu" className="hover:text-[#00A6A6] transition-colors">Menu</a>
          <a href="#story" className="hover:text-[#00A6A6] transition-colors">Nosotros</a>
          <a href="#gallery" className="hover:text-[#00A6A6] transition-colors">Galería</a>
          <a href="#reviews" className="hover:text-[#00A6A6] transition-colors">Reseñas</a>
          <a href="#blog" className="hover:text-[#00A6A6] transition-colors">Blog</a>
          <a href="#location" className="hover:text-[#00A6A6] transition-colors">Contacto</a>
        </div>
        <div className="flex items-center gap-2">
            <a href="#reservations" className="px-4 py-2 bg-[#00A6A6] text-white font-semibold rounded-full hover:bg-teal-600 transition-colors text-sm">Reservar</a>
            <button onClick={toggleLang} className="p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Change language">
                <Globe size={20} />
            </button>
        </div>
      </nav>
    </header>
);

const HeroSection = ({ content }) => (
    <section className="h-[70vh] md:h-[80vh] relative flex items-center justify-center text-white text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img src={localImages.hero} alt="[Imagen de la vista de la playa de Cozumel]" className="w-full h-full object-cover" width="2070" height="1380" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <motion.div className="relative z-10 p-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>{content.title}</h1>
        <p className="mt-4 text-xl md:text-2xl" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>{content.subtitle}</p>
        <motion.a href="#reservations" whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 166, 166, 0.8)" }} whileTap={{ scale: 0.95 }} className="mt-8 inline-block px-8 py-3 bg-[#00A6A6] text-white font-bold rounded-full shadow-lg transition-transform">
          {content.cta}
        </motion.a>
      </motion.div>
    </section>
);

const MenuSection = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(content.items || []);

  useEffect(() => { setFilteredItems(content.items || []); setActiveCategory('all'); }, [content]);
  useEffect(() => {
    if (!content.items) return;
    if (activeCategory === 'all') { setFilteredItems(content.items); } 
    else { const filtered = content.items.filter(item => item.category === activeCategory); setFilteredItems(filtered); }
  }, [activeCategory, content]);

  const categoryIcons = { all: <UtensilsCrossed size={20} />, main: <Fish size={20} />, starters: <ChefHat size={20} />, vegan: <Leaf size={20} /> };

  return (
    <TexturedBackground id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.menuSection?.title}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{content.menuSection?.description}</p>
        </motion.div>
        <motion.div {...fadeIn} className="flex justify-center flex-wrap gap-3 mb-12">
          {content.categories && Object.entries(content.categories).map(([key, value]) => (
            <button key={key} onClick={() => setActiveCategory(key)} className={`px-4 py-2 flex items-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 ${ activeCategory === key ? 'bg-[#00A6A6] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
              {categoryIcons[key]} {value}
            </button>
          ))}
        </motion.div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>{filteredItems.map(item => <MenuCard key={item.id} item={item} />)}</AnimatePresence>
        </motion.div>
      </div>
    </TexturedBackground>
  );
};

const MenuCard = ({ item }) => (
    <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, ease: 'easeInOut' }} whileHover={{ y: -10, boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
      <div className="relative">
        <img src={item.image} alt={`[Imagen de ${item.name}]`} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="600" height="400" />
        {item.isLimited && ( <div className="absolute top-4 right-4 bg-[#00A6A6] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Star size={14} /> Edición Limitada</div> )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#03254E]">{item.name}</h3>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <p className="mt-4 text-xl font-semibold text-[#00A6A6]">{item.price}</p>
      </div>
    </motion.div>
);

const StorySection = ({ content }) => (
    <section id="story" className="relative py-24 md:py-32 bg-gray-800" style={{ backgroundImage: `url(${localImages.story})`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="container mx-auto px-6 relative z-20 text-white text-center">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8 }}
                className="bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-2xl max-w-3xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
                <p className="text-lg md:text-xl leading-relaxed mb-6">{content.content}</p>
                <motion.a href="#team" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-[#00A6A6] text-white font-bold rounded-full transition-colors hover:bg-teal-500">
                    {content.cta}
                </motion.a>
            </motion.div>
        </div>
    </section>
);

const TeamSection = ({ content }) => {
    if (!content) return null;
    return (
        <TexturedBackground id="team" className="py-20 bg-[#F3E9D2]">
            <div className="container mx-auto px-6">
                <motion.div {...fadeIn} className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.title}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{content.description}</p>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                    viewport={{ once: true }}
                >
                    {content.members?.map(member => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </motion.div>
            </div>
        </TexturedBackground>
    );
};

const TeamMemberCard = ({ member }) => (
    <motion.div variants={fadeIn} className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-4">
            <img src={member.image} alt={`[Foto de ${member.name}]`} className="rounded-full w-full h-full object-cover shadow-lg" loading="lazy" width="192" height="192" />
        </div>
        <h3 className="text-xl font-bold text-[#03254E]">{member.name}</h3>
        <p className="font-semibold text-[#00A6A6] mb-2">{member.role}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
    </motion.div>
);

const GallerySection = ({ content, setSelectedImg }) => (
    <TexturedBackground id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <motion.div {...fadeIn} className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.title}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{content.description}</p>
            </motion.div>
            <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} viewport={{ once: true }}>
                {content.images?.map((img) => (
                    <motion.div key={img.id} className="relative rounded-lg overflow-hidden cursor-pointer group shadow-lg" onClick={() => setSelectedImg(img)} variants={fadeIn} whileHover={{ scale: 1.03, zIndex: 10 }}>
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover aspect-square" loading="lazy" width="500" height="500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                           {img.testimonial && <p className="text-white text-sm font-semibold">"{img.testimonial}"</p>}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </TexturedBackground>
);

const FloatingBlobs = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <motion.div
            animate={{ x: ['-20%', '10%', '-20%'], y: ['-15%', '20%', '-15%'], rotate: [0, 180, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 40, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A6A6]/20 rounded-full filter blur-3xl"
        />
        <motion.div
            animate={{ x: ['20%', '-15%', '20%'], y: ['10%', '-20%', '10%'], rotate: [0, -180, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 50, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00A6A6]/20 rounded-full filter blur-3xl"
        />
    </div>
);

const ReviewsSection = ({ content }) => {
    if (!content) return null;
    return (
        <TexturedBackground id="reviews" className="py-20 bg-[#F3E9D2] overflow-hidden">
            <FloatingBlobs />
            <div className="container mx-auto px-6">
                <motion.div {...fadeIn} className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.title}</h2>
                    <p className="mt-4 text-lg font-semibold text-[#00A6A6]">{content.counter}</p>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} viewport={{ once: true }}
                >
                    {content.reviews?.map(review => ( <ReviewCard key={review.id} review={review} /> ))}
                </motion.div>
            </div>
        </TexturedBackground>
    );
};

const ReviewCard = ({ review }) => (
    <motion.a 
        href={review.url} target="_blank" rel="noopener noreferrer" variants={fadeIn}
        whileHover={{ y: -8, boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col gap-4 border border-white/20"
    >
        <div className="flex justify-between items-center">
            <span className={`font-bold ${review.platform === 'Google' ? 'text-blue-600' : 'text-green-600'}`}>{review.platform}</span>
            <div className="flex">{[...Array(5)].map((_, i) => ( <Star key={i} size={18} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} /> ))}</div>
        </div>
        <p className="text-gray-600 italic">"{review.text}"</p>
        <p className="font-bold text-right text-gray-800 mt-auto">- {review.author}</p>
    </motion.a>
);

const ReservationsSection = ({ content }) => {
    const [formData, setFormData] = useState({ name: '', guests: 2, date: '', time: '19:00' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.date || !formData.time) { setError(content.form?.error); return; }
        setError('');
        setIsSubmitting(true);
        setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
    };

    if (isSubmitted) {
        return (
            <TexturedBackground id="reservations" className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
                        <Send size={48} className="mx-auto text-[#00A6A6]" />
                        <h3 className="text-2xl font-bold mt-4">¡Reservación Confirmada!</h3>
                        <p className="mt-2 text-gray-600">{content.form?.success}</p>
                    </motion.div>
                </div>
            </TexturedBackground>
        )
    }

    return (
        <TexturedBackground id="reservations" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.div {...fadeIn} className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.title}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{content.description}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto bg-[#F3E9D2] p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{content.form?.name}</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6]" required />
                            </div>
                            <div>
                                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">{content.form?.guests}</label>
                                <input type="number" id="guests" name="guests" min="1" max="10" value={formData.guests} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6]" required />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">{content.form?.date}</label>
                                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} min={new Date().toISOString().split("T")[0]} className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6]" required />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">{content.form?.time}</label>
                                <select id="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6]" required>
                                    <option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option><option>21:30</option>
                                </select>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                        <div className="text-center mt-6">
                            <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full md:w-auto px-10 py-3 bg-[#00A6A6] text-white font-bold rounded-full shadow-lg transition-colors hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Confirmando...' : content.form?.submit}
                            </motion.button>
                        </div>
                    </form>
                    <p className="text-center text-xs text-gray-500 mt-6">{content.exclusivity}</p>
                </motion.div>
            </div>
        </TexturedBackground>
    );
};

const BlogSection = ({ content }) => {
    if (!content || !content.articles) return null;
    return (
        <TexturedBackground id="blog" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.div {...fadeIn} className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.title}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{content.description}</p>
                </motion.div>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} viewport={{ once: true }}>
                    {content.articles.map(article => ( <BlogCard key={article.id} article={article} ctaText={content.cta} /> ))}
                </motion.div>
            </div>
        </TexturedBackground>
    );
};

const BlogCard = ({ article, ctaText }) => (
    <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col">
        <div className="relative">
            <img src={article.image} alt={`[Imagen para el artículo ${article.title}]`} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="600" height="400" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#03254E] mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
            <a href={`/blog/${article.slug}`} className="mt-auto font-semibold text-[#00A6A6] hover:text-teal-700 transition-colors self-start">
                {ctaText} &rarr;
            </a>
        </div>
    </motion.div>
);

const LocationSection = ({ content }) => {
    if (!content) return null;
    const gmapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(content.address)}`;

    return (
        <TexturedBackground id="location" className="py-20 bg-[#F3E9D2]">
            <div className="container mx-auto px-6">
                <motion.div {...fadeIn} className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#03254E]">{content.title}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{content.description}</p>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-[#03254E]">Detalles de Contacto</h3>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-start gap-4">
                                <MapPin size={24} className="text-[#00A6A6] mt-1 flex-shrink-0" />
                                <span>{content.address}</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone size={24} className="text-[#00A6A6] mt-1 flex-shrink-0" />
                                <span>{content.phone}</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock size={24} className="text-[#00A6A6] mt-1 flex-shrink-0" />
                                <span>{content.hours}</span>
                            </div>
                        </div>
                        <a href={gmapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#00A6A6] text-white font-bold rounded-full shadow-lg transition-colors hover:bg-teal-600">
                            <Navigation size={20} />
                            {content.cta}
                        </a>
                    </div>
                    <div className="h-80 lg:h-full w-full rounded-2xl shadow-2xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.425972892994!2d-86.95010168507218!3d20.52952798627196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e59cebd033b23%3A0x9698b53833a4118!2sAv%20Rafael%20E.%20Melgar%2C%20San%20Miguel%20de%20Cozumel%2C%20Q.R.%2C%20M%C3%A9xico!5e0!3m2!1ses!2ses!4v1678886453215!5m2!1ses!2ses"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de ubicación de Vénia Cozumel"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </TexturedBackground>
    );
};

const Lightbox = ({ selectedImg, setSelectedImg }) => {
    const handleClose = (e) => { if (e.target.id === 'lightbox-backdrop') { setSelectedImg(null); } };
    return (
        <motion.div id="lightbox-backdrop" className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="relative max-w-4xl max-h-[90vh]" layoutId={`gallery-image-${selectedImg.id}`}>
                <img src={selectedImg.src} alt={selectedImg.alt} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
                {selectedImg.testimonial && ( <p className="text-white text-center mt-4 bg-black/50 p-2 rounded-md">"{selectedImg.testimonial}"</p> )}
            </motion.div>
            <motion.button className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-2" onClick={() => setSelectedImg(null)} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                <X size={24} />
            </motion.button>
        </motion.div>
    );
};

const Footer = ({ content, location }) => (
    <footer className="bg-[#03254E] text-white pt-12 pb-8">
        <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-6">Vénia Cozumel</h3>
             <div className="flex justify-center items-center gap-6 mb-6">
                <a href={content.socials?.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Vénia Cozumel" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
                <a href={content.socials?.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Vénia Cozumel" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24} /></a>
             </div>
             <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-gray-300">
                <div className="flex items-center gap-3"><MapPin className="text-[#00A6A6]" size={18}/><span>{location?.address}</span></div>
                <div className="flex items-center gap-3"><Phone className="text-[#00A6A6]" size={18}/><span>{location?.phone}</span></div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Vénia Cozumel. {content?.copyright}</p>
                <p>Diseño Web con ❤️ </p>
            </div>
        </div>
    </footer>
);

export default App;
