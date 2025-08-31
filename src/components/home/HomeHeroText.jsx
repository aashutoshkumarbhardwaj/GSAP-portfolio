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
        // Simple entrance animation
        gsap.fromTo([line1Ref.current, line2Ref.current, line3Ref.current], {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        })

        // Video entrance with slight delay
        gsap.fromTo(videoRef.current, {
            scale: 0,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.6
        })

        // Subtle parallax on scroll
        gsap.to(containerRef.current, {
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        })

    }, { scope: containerRef })

    return (
        <div ref={containerRef} className='font-[font1] mt-48 md:mt-72 lg:mt-0 pt-5 text-center'>
            <div ref={line1Ref} className='lg:text-[9.5vw] text-[12vw] justify-center flex items-center uppercase lg:leading-[8vw] leading-[10vw] pt-9'>
                Aashutosh
            </div>
            <div ref={line2Ref} className='lg:text-[9.5vw] text-[12vw] justify-center flex items-start uppercase lg:leading-[8vw] leading-[10vw]'>
                Ku
                <div ref={videoRef} className='h-[7vw] w-[16vw] rounded-full lg:-mt-3 -mt-1 overflow-hidden '>
                    <Video />
                </div>
               mar
            </div>
            <div ref={line3Ref} className='lg:text-[9.5vw] text-[12vw] justify-center flex items-center uppercase lg:leading-[8vw] leading-[10vw]'>
                Bhardwaj
            </div>
        </div>
    )
}

export default HomeHeroText