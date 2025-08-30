import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Video from './Video'

gsap.registerPlugin(ScrollTrigger);

const HomeHeroText = () => {
    const containerRef = useRef(null)
    const line1Ref = useRef(null)
    const line2Ref = useRef(null)
    const line3Ref = useRef(null)
    const videoRef = useRef(null)

    useGSAP(() => {
        // Set initial states
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
            y: 100,
            opacity: 0,
            rotateX: 45
        })

        gsap.set(videoRef.current, {
            scale: 0,
            rotation: 180,
            opacity: 0
        })

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        })

        // Animate text lines with stagger
        tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15
        })
        
        // Animate video with bounce effect
        .to(videoRef.current, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(2)",
        }, "-=0.6")

        // Continuous scroll-based animations
        gsap.to(line1Ref.current, {
            y: -20,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        })

        gsap.to(line3Ref.current, {
            y: 20,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom", 
                end: "bottom top",
                scrub: 1
            }
        })

        // Video floating animation
        gsap.to(videoRef.current, {
            y: -10,
            rotation: 2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top", 
                scrub: 2
            }
        })

        // Hover animations for interactivity
        const lines = [line1Ref.current, line2Ref.current, line3Ref.current]
        
        lines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                gsap.to(line, {
                    scale: 1.05,
                    color: '#D3FD50',
                    duration: 0.3,
                    ease: "power2.out"
                })
            })
            
            line.addEventListener('mouseleave', () => {
                gsap.to(line, {
                    scale: 1,
                    color: 'inherit',
                    duration: 0.3,
                    ease: "power2.out"
                })
            })
        })

    }, { scope: containerRef })

    return (
        <div 
            ref={containerRef}
            className='font-[font1] mt-32 sm:mt-48 md:mt-56 lg:mt-0 pt-5 text-center relative overflow-hidden'
        >
            {/* First line */}
            <div 
                ref={line1Ref}
                className='text-[11vw] sm:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[9vw] sm:leading-[8.5vw] lg:leading-[8vw] font-bold tracking-tight cursor-pointer transition-all duration-300'
            >
                L'étincelle
            </div>

            {/* Second line with video */}
            <div 
                ref={line2Ref}
                className='text-[11vw] sm:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[9vw] sm:leading-[8.5vw] lg:leading-[8vw] font-bold tracking-tight cursor-pointer transition-all duration-300'
            >
                <span className='mr-[2vw]'>qui</span>
                <div 
                    ref={videoRef}
                    className='h-[6vw] w-[12vw] sm:h-[5.5vw] sm:w-[11vw] lg:h-[5vw] lg:w-[10vw] rounded-full overflow-hidden shadow-2xl relative mx-[1vw] border-2 border-white/20'
                    style={{
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
                    }}
                >
                    <Video />
                    {/* Video overlay for better integration */}
                    <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none'></div>
                </div>
                <span className='ml-[2vw]'>génère</span>
            </div>

            {/* Third line */}
            <div 
                ref={line3Ref}
                className='text-[11vw] sm:text-[10vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[9vw] sm:leading-[8.5vw] lg:leading-[8vw] font-bold tracking-tight cursor-pointer transition-all duration-300'
            >
                la créativité
            </div>

            {/* Decorative elements */}
            <div className='absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-[#D3FD50]/20 to-transparent rounded-full blur-xl'></div>
            <div className='absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#D3FD50]/10 to-transparent rounded-full blur-2xl'></div>
        </div>
    )
}

export default HomeHeroText