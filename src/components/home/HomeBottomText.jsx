import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const HomeBottomText = () => {
    const containerRef = useRef(null)
    const paragraphRef = useRef(null)
    const buttonsRef = useRef(null)
    const projectsBtnRef = useRef(null)
    const agenceBtnRef = useRef(null)
    
    const navigate = useNavigate()

    useGSAP(() => {
        // Set initial states
        gsap.set(paragraphRef.current, {
            y: 50,
            opacity: 0,
            rotateX: 45
        })

        gsap.set([projectsBtnRef.current, agenceBtnRef.current], {
            y: 80,
            opacity: 0,
            scale: 0.8
        })

        // Main entrance animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse"
            }
        })

        // Animate paragraph first
        tl.to(paragraphRef.current, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out"
        })

        // Then animate buttons with stagger
        .to([projectsBtnRef.current, agenceBtnRef.current], {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2
        }, "-=0.4")

        // Parallax scroll effects
        gsap.to(paragraphRef.current, {
            y: -30,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        })

        gsap.to(buttonsRef.current, {
            y: 15,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        })

        // Individual button hover animations
        const setupButtonHover = (buttonRef) => {
            const button = buttonRef.current
            
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    rotateY: 5,
                    borderColor: '#D3FD50',
                    color: '#D3FD50',
                    duration: 0.3,
                    ease: "power2.out"
                })
                
                // Add glow effect
                gsap.to(button, {
                    boxShadow: '0 0 30px rgba(211, 253, 80, 0.3)',
                    duration: 0.3
                })
            })
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    rotateY: 0,
                    borderColor: 'white',
                    color: 'inherit',
                    boxShadow: '0 0 0px rgba(211, 253, 80, 0)',
                    duration: 0.3,
                    ease: "power2.out"
                })
            })

            // Click animation
            button.addEventListener('mousedown', () => {
                gsap.to(button, {
                    scale: 0.95,
                    duration: 0.1
                })
            })
            
            button.addEventListener('mouseup', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.1
                })
            })
        }

        setupButtonHover(projectsBtnRef)
        setupButtonHover(agenceBtnRef)

        // Floating animation for buttons
        gsap.to([projectsBtnRef.current, agenceBtnRef.current], {
            y: "+=10",
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.5
        })

    }, { scope: containerRef })

    return (
        <div 
            ref={containerRef}
            className='font-[font2] relative min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-4 lg:p-8 overflow-hidden'
        >
            {/* Background decorative elements */}
            <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#D3FD50]/5 to-transparent rounded-full blur-3xl'></div>
                <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl'></div>
            </div>

            {/* Enhanced paragraph with better positioning */}
            <div className='lg:absolute lg:w-[20vw] w-full max-w-lg lg:right-8 xl:right-16 lg:top-1/2 lg:transform lg:-translate-y-1/2 z-10'>
                <p 
                    ref={paragraphRef}
                    className='font-[font1] text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed lg:leading-loose text-gray-700 lg:text-gray-600 text-center lg:text-left p-6 lg:p-8 bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-2xl lg:rounded-none shadow-lg lg:shadow-none border lg:border-0 border-gray-200'
                >
                    K72 est une agence qui pense chaque action pour nourrir la marque. Demain, dans 5 mois et dans 5 ans. 
                    On cherche la friction qui crée l'étincelle pour générer de l'émotion. Pour assurer une relation honnête, 
                    on est sans filtre, on dit ce qui doit être dit, on fait ce qui doit être fait.
                </p>
            </div>

            {/* Enhanced button container */}
            <div 
                ref={buttonsRef}
                className='flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 z-10'
            >
                {/* Projects Button */}
                <div 
                    ref={projectsBtnRef}
                    className='group relative overflow-hidden'
                >
                    <Link 
                        to='/projects'
                        className='block border-2 lg:border-3 border-white hover:border-[#D3FD50] 
                                 h-16 sm:h-20 lg:h-32 xl:h-36 
                                 w-40 sm:w-48 lg:w-56 xl:w-64
                                 flex items-center justify-center 
                                 rounded-full uppercase font-bold tracking-wider
                                 text-lg sm:text-xl lg:text-2xl xl:text-3xl
                                 transition-all duration-300 ease-out
                                 relative z-10 bg-black/5 backdrop-blur-sm
                                 hover:bg-[#D3FD50]/10 hover:text-[#D3FD50]
                                 shadow-lg hover:shadow-2xl'
                    >
                        <span className='relative z-10'>Projects</span>
                        {/* Animated background */}
                        <div className='absolute inset-0 bg-gradient-to-r from-[#D3FD50]/0 via-[#D3FD50]/20 to-[#D3FD50]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full'></div>
                    </Link>
                </div>

                {/* Agency Button */}
                <div 
                    ref={agenceBtnRef}
                    className='group relative overflow-hidden'
                >
                    <Link 
                        to='/agence'
                        className='block border-2 lg:border-3 border-white hover:border-[#D3FD50] 
                                 h-16 sm:h-20 lg:h-32 xl:h-36 
                                 w-40 sm:w-48 lg:w-56 xl:w-64
                                 flex items-center justify-center 
                                 rounded-full uppercase font-bold tracking-wider
                                 text-lg sm:text-xl lg:text-2xl xl:text-3xl
                                 transition-all duration-300 ease-out
                                 relative z-10 bg-black/5 backdrop-blur-sm
                                 hover:bg-[#D3FD50]/10 hover:text-[#D3FD50]
                                 shadow-lg hover:shadow-2xl'
                    >
                        <span className='relative z-10'>Agence</span>
                        {/* Animated background */}
                        <div className='absolute inset-0 bg-gradient-to-r from-[#D3FD50]/0 via-[#D3FD50]/20 to-[#D3FD50]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full'></div>
                    </Link>
                </div>
            </div>

            {/* Additional decorative floating elements */}
            <div className='absolute top-1/3 left-1/4 w-2 h-2 bg-[#D3FD50] rounded-full opacity-30 animate-pulse'></div>
            <div className='absolute bottom-1/3 right-1/3 w-1 h-1 bg-[#D3FD50] rounded-full opacity-50 animate-ping'></div>
        </div>
    )
}

export default HomeBottomText