import willPhoto from "@assets/Will_Franke_-_Harmonator_Visuals_1783298643853.jpeg";
import { SiteHeader } from "@/components/site-header";

export default function About() {
  return (
    <div className="min-h-screen bg-[#08091a] text-slate-100 flex flex-col">
      <SiteHeader />
      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-2xl space-y-10">
          <h1 className="text-4xl font-light tracking-tight text-center">
            About
          </h1>

          {/* Founder photo */}
          <div className="flex justify-center">
            <img
              src={willPhoto}
              alt="Will Franke performing"
              className="w-64 h-80 object-cover rounded-2xl border border-white/[0.1]"
            />
          </div>

          {/* Bio */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-medium">Will Franke</h2>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400">
              Founder, Developer, Multi-Instrumentalist
            </p>
          </div>

          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>The idea for Tone Chroma came to Will Franke when on a bicycle ride in West Bengal, India. He was studying Indian classical music and the ethnomusicology of Bengali mystic folk music.</p>
            <p>In the vast world of Eastern music, many of the tones do not exist on the traditional keyboard of the West. He wondered if a single instrument could access all these tones, both East and West, in an intuitive way. Thus the origins of Tone Chroma began in my mind.</p>
            <p>
              Over time, the mental images manifested into the interface
              accessible now. I wanted to create a tool which expands the
              harmonic pallet of a keyboard instrument to include all possible
              microtones which exist in the vast landscape of world music to
              create a fusion of tradition and technology, past and future, East
              and West.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
