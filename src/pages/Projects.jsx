import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import ProjectCard from '../components/projects/ProjectCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const Projects = () => {
  const stickyLineRef = useRef()
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [{
    title: "PJC Creative Studio",
    description: "Brand identity and digital experience for creative agency",
    category: "Branding & Web Design",
    image1: 'https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg'
  }, {
    title: "OKA Furniture",
    description: "E-commerce platform redesign with focus on user experience",
    category: "E-commerce & UX",
    image1: 'https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg'
  }, {
    title: "Shelton Audio",
    description: "Custom audio solution platform with immersive design",
    category: "Audio & Interactive",
    image1: 'https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg'
  }, {
    title: "Digital Portfolio",
    description: "Interactive showcase with modern animations and transitions",
    category: "Portfolio Design",
    image1: 'https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg'
  }, {
    title: "Brand Identity",
    description: "Complete visual identity system with logo and guidelines",
    category: "Brand Design",
    image1: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg'
  }, {
    title: "Mobile Experience",
    description: "Native mobile app with seamless user interface design",
    category: "Mobile Design",
    image1: 'https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg'
  }]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(function () {
    // Original animation
    gsap.from('.hero', {
      height: '100px',
      opacity: 0,
      stagger: {
        amount: 0.4
      },
      scrollTrigger: {
        trigger: '.lol',
        start: 'top 100%',
        end: 'top -150%',
        scrub: 2.5
      }
    })

    // Enhanced title animation
    gsap.from('.projects-title', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.projects-title',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Project cards scale on scroll
    gsap.utils.toArray('.hero').forEach((card, index) => {
      gsap.fromTo(card, {
        scale: 0.8,
        opacity: 0.7
      }, {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        }
      })
    })
  })

  const handleProjectHover = (project, isEntering) => {
    if (isEntering) {
      setHoveredProject(project)
      gsap.to(stickyLineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out"
      })
    } else {
      gsap.to(stickyLineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in"
      })
      setTimeout(() => setHoveredProject(null), 300)
    }
  }

  return (
    <div className='lg:p-4 p-2 pb-20 relative'>
      {/* Sticky Hover Line */}
      <div className='fixed top-0 left-0 w-full z-50 pointer-events-none'>
        <div 
          ref={stickyLineRef}
          className='h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0'
          style={{ transformOrigin: 'left center' }}
        />
        {hoveredProject && (
          <div className='bg-black/95 backdrop-blur-sm border-b border-white/10 text-white p-6 lg:p-8'>
            <div className='max-w-6xl mx-auto'>
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                <div className='flex-1'>
                  <div className='flex items-center gap-4 mb-3'>
                    <h3 className='text-2xl lg:text-4xl font-bold tracking-tight'>{hoveredProject.title}</h3>
                    <div className='hidden lg:block w-12 h-px bg-white/30'></div>
                  </div>
                  <p className='text-gray-200 text-lg lg:text-xl font-light leading-relaxed max-w-2xl'>
                    {hoveredProject.description}
                  </p>
                </div>
                <div className='flex flex-col lg:items-end gap-3'>
                  <span className='px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg text-sm font-medium tracking-wide'>
                    {hoveredProject.category}
                  </span>
                  <div className='flex items-center gap-2 text-gray-400'>
                    <div className='w-2 h-2 bg-white/50 rounded-full'></div>
                    <span className='font-mono text-sm'>View Project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='pt-[1vh] md:pt-[5vh] lg:pt-[40vh]'>
        <h2 className='projects-title font-[font2] lg:text-[9.5vw] text-7xl uppercase'>Projects</h2>
      </div>
      
      <div className='lg:-mt-10 project-list lol'>
        {projects.map(function (elem, idx) {
          return (
            <div 
              key={idx} 
              className='hero w-full lg:h-[50vh] mb-4 flex lg:flex-row flex-col lg:gap-1 gap-1'
              onMouseEnter={() => handleProjectHover(elem, true)}
              onMouseLeave={() => handleProjectHover(elem, false)}
            >
              <ProjectCard image1={elem.image1} image2={elem.image2} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Projects