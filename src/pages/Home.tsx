import Testimonial from "../components/layouts/Testimonals";
import CardTutorSmall from "../components/tutor/CardTutorSmall";
import developers from "../mocks/tutores.json";
import testimonials from "../mocks/testimonials.json";
import Hero from '../components/layouts/Hero';
import Pricing from '../components/layouts/Pricing';

function Home() {


  return (
    <>
      <Hero />
      <Testimonial testimonials={testimonials} />
      <section className="px-8 md:px-0">
        <div className="container mx-auto py-14">
          <h2 className="text-3xl font-bold text-slate-900">
            Busque em 5.400+<span className="block">mentores disponíveis</span>
          </h2>
        </div>
        <div className="container mx-auto pb-14">
          <div className="grid md:grid-cols-3 gap-6">
            {developers.map((dev) => (
              <CardTutorSmall
                name={dev.name}
                role={dev.role}
                rating={dev.rating}
                skills={dev.skills}
                photo={dev.photo}
                key={dev.id}
              />
            ))}
          </div>
        </div>
      </section>
      <Pricing />
    </>
  );
}

export default Home;
