import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const HomeBottomText = () => {
    const containerRef = useRef(null)
    const paragraphRef = useRef(null)
    const projectsBtnRef = useRef(null)
    const agenceBtnRef = useRef(null)

    useGSAP(() => {
        // Simple entrance animations
        gsap.fromTo(paragraphRef.current, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        })

        gsap.fromTo([projectsBtnRef.current, agenceBtnRef.current], {
            y: 40,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        })

        // Button hover animations
        const setupButtonHover = (buttonRef) => {
            const button = buttonRef.current
            
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                })
            })
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })
            })
        }

        setupButtonHover(projectsBtnRef)
        setupButtonHover(agenceBtnRef)

    }, { scope: containerRef })

    return (
        <div ref={containerRef} className='font-[font2] flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 p-4'>
            <p ref={paragraphRef} className='lg:absolute lg:w-[17vw] w-full max-w-md lg:right-0 lg:bottom-2 font-[font1] text-xs lg:text-lg leading-tight lg:leading-relaxed mb-8 lg:mb-0'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                Ashutosh Kumar Bhardwaj is a passionate learner and creator, exploring AI, machine learning, web development, and storytelling. He shares knowledge through YouTube, blogging, and open-source contributions. Focused on personal growth, discipline, and innovation, he balances tech projects with content creation, aiming to inspire and build meaningful, impactful digital solutions.
            </p>
            <div className='flex items-center justify-center gap-2 lg:gap-4'>
                <div ref={projectsBtnRef} className='lg:border-3 border-2 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-44 flex items-center px-3 pt-1 lg:px-14 border-white rounded-full uppercase transition-all duration-300'>
                    <Link className='text-[6vw] lg:mt-6' to='/projects'>Projects</Link>
                </div>
                <div ref={agenceBtnRef} className='lg:border-3 border-2 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-44 flex items-center px-3 pt-1 lg:px-14 border-white rounded-full uppercase transition-all duration-300'>
                    <Link className='text-[6vw] lg:mt-6' to='/agence'>agence</Link>
                </div>
            </div>
        </div>
    )
}

export default HomeBottomText