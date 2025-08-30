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
        y: "35vh", // Much more dramatic downward movement
        scale: 1.3, // Bigger scale increase
        rotation: 8, // More pronounced rotation
        x: "-5vw", // Add horizontal movement
        scrollTrigger: {
          trigger: imageDivRef.current,
          start: "top 90%", // Starts even earlier
          end: "bottom -10%", // Extends beyond viewport
          scrub: 1, // Faster response to scroll
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Enhanced image cycling with smoother transitions
            const imageIndex = Math.min(
              imageArray.length - 1, 
              Math.floor(progress * imageArray.length)
            );
            
            if (imageRef.current && imageRef.current.src !== imageArray[imageIndex]) {
              // More dramatic fade effect
              gsap.to(imageRef.current, {
                opacity: 0.6,
                scale: 0.95,
                duration: 0.15,
                ease: "power2.inOut",
                onComplete: () => {
                  imageRef.current.src = imageArray[imageIndex];
                  gsap.to(imageRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.15,
                    ease: "power2.inOut"
                  });
                }
              });
            }

            // Dynamic shadow and glow based on scroll progress
            const shadowIntensity = 0.3 + (progress * 0.4);
            const glowIntensity = 0.1 + (progress * 0.2);
            
            imageDivRef.current.style.boxShadow = `
              0 ${30 + progress * 40}px ${60 + progress * 40}px rgba(0, 0, 0, ${shadowIntensity}),
              0 0 0 2px rgba(255, 255, 255, 0.1),
              0 0 ${40 + progress * 30}px rgba(211, 253, 80, ${glowIntensity}),
              0 0 ${80 + progress * 40}px rgba(59, 130, 246, ${glowIntensity * 0.5})
            `;
          }
        }
      });

      // Add floating animation
      gsap.to(imageDivRef.current, {
        y: "+=15",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Add subtle breathing effect
      gsap.to(imageRef.current, {
        scale: 1.02,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
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
          scale: 1.15,
          rotation: -3,
          x: 10,
          y: -10,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Enhanced glow on hover
        gsap.to(imageDiv, {
          boxShadow: `
            0 50px 80px rgba(0, 0, 0, 0.5),
            0 0 0 3px rgba(255, 255, 255, 0.2),
            0 0 60px rgba(211, 253, 80, 0.4),
            0 0 120px rgba(59, 130, 246, 0.2)
          `,
          duration: 0.4
        });

        // Image zoom on hover
        gsap.to(imageRef.current, {
          scale: 1.1,
          rotation: 2,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      
      imageDiv.addEventListener('mouseleave', () => {
        gsap.to(imageDiv, {
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Reset glow
        gsap.to(imageDiv, {
          boxShadow: `
            0 30px 60px rgba(0, 0, 0, 0.4),
            0 0 0 2px rgba(255, 255, 255, 0.1),
            0 0 40px rgba(211, 253, 80, 0.1)
          `,
          duration: 0.4
        });

        // Reset image
        gsap.to(imageRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      // Add click effect
      imageDiv.addEventListener('mousedown', () => {
        gsap.to(imageDiv, {
          scale: 0.95,
          duration: 0.1
        });
      });
      
      imageDiv.addEventListener('mouseup', () => {
        gsap.to(imageDiv, {
          scale: 1.15,
          duration: 0.1
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
          className='absolute overflow-hidden lg:h-[22vw] h-[32vw] lg:rounded-3xl rounded-2xl lg:w-[16vw] w-[26vw] lg:top-20 top-16 lg:left-[32vw] left-[37vw] cursor-pointer transition-all duration-500'
          style={{
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 40px rgba(211, 253, 80, 0.1)',
            backdropFilter: 'blur(20px)',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <img 
            ref={imageRef} 
            className='h-full object-cover w-full transition-all duration-500' 
            src={imageArray[0]} 
            alt="Team member"
            style={{
              filter: 'contrast(1.15) brightness(0.9) saturate(1.2) hue-rotate(5deg)'
            }}
          />
          {/* Enhanced overlay for depth and glow */}
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-[#D3FD50]/5 to-black/20 pointer-events-none mix-blend-overlay'></div>
          <div className='absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none mix-blend-soft-light'></div>
          
          {/* Animated border glow */}
          <div className='absolute -inset-1 bg-gradient-to-r from-[#D3FD50]/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-sm animate-pulse opacity-60'></div>
        </div>

        {/* Text content with refs for animations */}
        <div ref={textRef} className='relative font-[font2] z-0'>
          <div className='mt-[45vh] lg:mt-[60vh]'>
            <h1 
              ref={titleRef}
              className='text-[20vw] text-center uppercase leading-[18vw] font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent relative'
            >
              <span className='relative'>
                Seventy
                {/* Animated text shadow */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#D3FD50]/20 via-transparent to-blue-500/20 blur-xl opacity-50 animate-pulse'></div>
              </span>
              <br />
              <span className='relative'>
                Two
                <div className='absolute inset-0 bg-gradient-to-l from-purple-500/20 via-transparent to-[#D3FD50]/20 blur-xl opacity-50 animate-pulse' style={{animationDelay: '1s'}}></div>
              </span>
            </h1>
          </div>
          
          <div className='lg:pl-[40%] lg:mt-20 mt-10 p-4 md:p-8'>
            <p 
              ref={paragraphRef}
              className='text-xl md:text-3xl lg:text-5xl leading-tight text-gray-700 font-light tracking-wide relative'
            >
              <span className='bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 bg-clip-text text-transparent'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                Our curiosity fuels our creativity. We stay humble and say no to big egos, even yours. 
                A brand is alive. It has values, a personality, a story. If we forget that, we can achieve 
                good numbers in the short term, but we kill it in the long term. That's why we are committed 
                to providing perspective, to build influential brands.
              </span>
              {/* Subtle background glow */}
              <div className='absolute -inset-4 bg-gradient-to-r from-transparent via-[#D3FD50]/5 to-transparent blur-2xl opacity-30 rounded-2xl'></div>
            </p>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
          <div className='w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden bg-black/10 backdrop-blur-sm'>
            <div className='w-1.5 h-4 bg-gradient-to-b from-[#D3FD50] to-blue-500 rounded-full mt-2 animate-bounce'></div>
            {/* Animated border */}
            <div className='absolute inset-0 border-2 border-[#D3FD50]/30 rounded-full animate-ping'></div>
          </div>
          <p className='text-center text-xs text-gray-500 mt-2 animate-pulse'>Scroll</p>
        </div>

        {/* Additional floating particles */}
        <div className='fixed inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-[#D3FD50]/40 rounded-full animate-ping' style={{animationDelay: '0s'}}></div>
          <div className='absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/40 rounded-full animate-ping' style={{animationDelay: '1s'}}></div>
          <div className='absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-ping' style={{animationDelay: '2s'}}></div>
          <div className='absolute top-2/3 right-1/3 w-1 h-1 bg-[#D3FD50]/40 rounded-full animate-ping' style={{animationDelay: '3s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Agence