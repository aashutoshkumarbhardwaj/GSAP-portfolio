import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

// Import images
import im1 from '../assets/im1.jpg';
import im2 from '../assets/im2.jpg';
import im3 from '../assets/im3.jpg';
import im4 from '../assets/im4.jpg';
import im5 from '../assets/im5.jpg';
import im6 from '../assets/im6.jpg';
import im7 from '../assets/im7.jpg';
import im8 from '../assets/im8.jpg';
import im9 from '../assets/im9.jpg';
import im10 from '../assets/im10.jpg';
import im11 from '../assets/im11.jpg';
import im12 from '../assets/im12.jpg';
import im13 from '../assets/im13.jpg';
import im14 from '../assets/im14.jpg';

gsap.registerPlugin(ScrollTrigger);

const Agence = () => {
  const imageDivRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const titleRef = useRef(null)
  const paragraphRef = useRef(null)

  const imageArray = [
    im1, im2, im3, im4, im5, im6,
    im7, im8, im9, im10, im11, im12, im13, im14
  ]

  useGSAP(function () {
    // Initial setup - set starting position and opacity
    gsap.set(imageDivRef.current, {
      y: 0,
      scale: 1,
      opacity: 1
    });

    // Image cycling and movement animation
    function setupImageAnimation() {
      gsap.to(imageDivRef.current, {
        y: "20vh", // Moves down as user scrolls
        scale: 1.1, // Slight scale increase for depth
        rotation: 2, // Subtle rotation for dynamic feel
        scrollTrigger: {
          trigger: imageDivRef.current,
          start: "top 80%", // Starts animation earlier
          end: "bottom 20%", // Longer animation duration
          scrub: 1.5, // Smooth animation tied to scroll
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Smooth image transition with proper bounds checking
            const imageIndex = Math.min(
              imageArray.length - 1, 
              Math.floor(progress * (imageArray.length - 1))
            );
            
            if (imageRef.current && imageRef.current.src !== imageArray[imageIndex]) {
              // Add a subtle fade effect when changing images
              gsap.to(imageRef.current, {
                opacity: 0.8,
                duration: 0.1,
                onComplete: () => {
                  imageRef.current.src = imageArray[imageIndex];
                  gsap.to(imageRef.current, {
                    opacity: 1,
                    duration: 0.1
                  });
                }
              });
            }
          }
        }
      });
    }

    // Text animations
    function setupTextAnimations() {
      // Title animation - staggered reveal
      const titleLines = titleRef.current.querySelectorAll('br');
      gsap.fromTo(titleRef.current.childNodes, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });

      // Paragraph animation - typewriter effect
      gsap.fromTo(paragraphRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Background animation for depth
    function setupBackgroundAnimation() {
      gsap.to(textRef.current, {
        y: "-10vh",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
          invalidateOnRefresh: true
        }
      });
    }

    // Image container hover animation
    function setupHoverAnimations() {
      const imageDiv = imageDivRef.current;
      
      imageDiv.addEventListener('mouseenter', () => {
        gsap.to(imageDiv, {
          scale: 1.05,
          rotation: -1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      imageDiv.addEventListener('mouseleave', () => {
        gsap.to(imageDiv, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // Setup all animations
    setupImageAnimation();
    setupTextAnimations();
    setupBackgroundAnimation();
    setupHoverAnimations();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <div className='parent min-h-[200vh]'> {/* Added min-height for scroll space */}
      <div id='page1' className='py-1 relative'>
        {/* Image container with enhanced styling */}
        <div 
          ref={imageDivRef} 
          className='absolute overflow-hidden lg:h-[20vw] h-[30vw] lg:rounded-3xl rounded-xl lg:w-[15vw] w-[25vw] lg:top-36 top-28 lg:left-[30vw] left-[35vw] shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-3xl'
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <img 
            ref={imageRef} 
            className='h-full object-cover w-full transition-all duration-300' 
            src={imageArray[0]} 
            alt="Team member"
            style={{
              filter: 'contrast(1.1) brightness(0.95) saturate(1.1)'
            }}
          />
          {/* Overlay for depth */}
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none'></div>
        </div>

        {/* Text content with refs for animations */}
        <div ref={textRef} className='relative font-[font2]'>
          <div className='mt-[40vh] lg:mt-[55vh]'>
            <h1 
              ref={titleRef}
              className='text-[20vw] text-center uppercase leading-[18vw] font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent'
            >
              Seventy <br />
              Two
            </h1>
          </div>
          
          <div className='lg:pl-[40%] lg:mt-20 mt-10 p-4 md:p-8'>
            <p 
              ref={paragraphRef}
              className='text-xl md:text-3xl lg:text-5xl leading-tight text-gray-700 font-light tracking-wide'
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
              Our curiosity fuels our creativity. We stay humble and say no to big egos, even yours. 
              A brand is alive. It has values, a personality, a story. If we forget that, we can achieve 
              good numbers in the short term, but we kill it in the long term. That's why we are committed 
              to providing perspective, to build influential brands.
            </p>
          </div>
        </div>

        {/* Additional scroll indicator */}
        <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
          <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agence