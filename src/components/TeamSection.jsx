import { motion } from 'framer-motion';
import { Github, Linkedin, Users } from 'lucide-react';

const teamMembers = [
  {
    name: 'Vijesh Patel',
    role: 'Co-ordinator',
    github: 'https://github.com/geccodingclub',
    linkedin: '#',
    img:'https://res.cloudinary.com/dsk3qfmab/image/upload/v1778739552/image_ikg33k.png'
  },
  {
    name: 'Deepu Kumar',
    role: 'Volunteer',
    github: 'https://github.com/CodeBuiltByDeepu',
    linkedin: 'https://www.linkedin.com/in/deepu-kumar-543aa2312/',
    img:'https://res.cloudinary.com/dsk3qfmab/image/upload/v1773492901/coding_club_profiles/byssxektyyropop47yir.jpg'
  },
  {
    name: 'Abudarda',
    role: 'Tech Lead',
    github: 'https://github.com/Abudarda12',
    linkedin: 'https://www.linkedin.com/in/abudarda/',
    img:'https://res.cloudinary.com/dsk3qfmab/image/upload/v1773434877/coding_club_profiles/aalvlhaunxstohxroo35.jpg'
  },
  {
    name: 'Hansraz',
    role: 'Event Manager',
    github: '#',
    linkedin: 'https://www.linkedin.com/in/hansraj-975466326/',
    img:'https://res.cloudinary.com/dsk3qfmab/image/upload/v1773506771/coding_club_profiles/azohpdeokvlqpejr99ts.jpg'
  },
  {
    name: 'Ishu',
    role: 'Design Lead',
    github: 'https://www.linkedin.com/in/ishu-kumar-5a0940281/',
    linkedin: '#',
    img: 'https://res.cloudinary.com/dsk3qfmab/image/upload/v1774891873/coding_club_profiles/achx5omifwwugxta5ku9.jpg'
  },
  {
    name: 'Prince Kumar',
    role: 'Volunteer',
    github: '#',
    linkedin: '#',
    img: 'https://res.cloudinary.com/dsk3qfmab/image/upload/v1775827492/coding_club_profiles/lqseymm115wzis2djtow.jpg'
  },
];

const TeamSection = () => {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <Users size={14} />
            Core Team
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-4"
          >
            The People Behind{' '}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              The Code
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-mono text-sm max-w-lg mx-auto"
          >
            Meet our core team — the builders, organizers, and dreamers driving innovation at GEC Bhojpur.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-2xl transition-all duration-300"
              style={{
                background: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:border-primary/40 transition-colors duration-300">
                  <span className="font-heading text-lg font-bold text-primary">
                    <img src={member.img} alt="Profile pic" />
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] text-white/30 uppercase tracking-[0.15em] mb-6">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
