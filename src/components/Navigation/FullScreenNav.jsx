import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useContext, useRef, useEffect } from 'react'
import { NavbarContext } from '../../context/NavContext'

import NavLinkItem from './NavLinkItem';

// Import images
import im1 from '../../assets/im1.jpg';
import im2 from '../../assets/im2.jpg';
import im3 from '../../assets/im3.jpg';
import im4 from '../../assets/im4.jpg';
import im5 from '../../assets/im5.jpg';
import im6 from '../../assets/im6.jpg';

const navLinksData = [
    {
        title: 'Projects',
        images: [im3, im4]
    },
    {
        title: 'Agency',
        images: [im1, im2]
    },
    {
        title: 'Contact',
        images: [im5, im6]
    },
    {
        title: 'Blogs',
        images: [im1, im2]
    },
];

const FullScreenNav = () => {
    const fullNavLinksRef = useRef(null)
    const fullScreenRef = useRef(null)
    const stairingRefs = useRef([])

    const [navOpen, setNavOpen] = useContext(NavbarContext)

    // Prevent body scroll when nav is open
    useEffect(() => {
        if (navOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [navOpen])

    function gsapAnimation() {
        const tl = gsap.timeline()
        
        // Set initial states
        gsap.set(fullScreenRef.current, {
            display: 'flex',
            opacity: 1
        })
        
        gsap.set('.stairing', {
            height: 0,
            transformOrigin: 'bottom'
        })
        
        gsap.set('.link', {
            opacity: 0,
            rotateX: 90,
            transformOrigin: 'center bottom'
        })
        
        gsap.set('.navlink', {
            opacity: 0,
            y: -20
        })

        // Animation sequence
        tl.to('.stairing', {
            height: '100%',
            duration: 0.8,
            ease: "power3.inOut",
            stagger: {
                amount: 0.4,
                from: "center"
            }
        })
        .to('.navlink', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .to('.link', {
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
                amount: 0.4
            }
        }, "-=0.4")
    }

    function gsapAnimationReverse() {
        const tl = gsap.timeline()
        
        tl.to('.link', {
            opacity: 0,
            rotateX: 90,
            duration: 0.4,
            ease: "power2.in",
            stagger: {
                amount: 0.2
            }
        })
        .to('.navlink', {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in"
        }, "-=0.2")
        .to('.stairing', {
            height: 0,
            duration: 0.6,
            ease: "power3.inOut",
            stagger: {
                amount: 0.3,
                from: "edges"
            }
        }, "-=0.1")
        .to(fullScreenRef.current, {
            display: 'none',
            opacity: 0,
            duration: 0.1
        })
    }

    useGSAP(function () {
        if (navOpen) {
            gsapAnimation()
        } else {
            gsapAnimationReverse()
        }
    }, { dependencies: [navOpen], scope: fullScreenRef })

    return (
        <div 
            ref={fullScreenRef} 
            id='fullscreennav' 
            className='fullscreennav fixed inset-0 text-white overflow-hidden h-screen w-screen z-[9999] hidden'
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999
            }}
        >
            {/* Animated background stairs */}
            <div className='h-full w-full fixed inset-0'>
                <div className='h-full w-full flex'>
                    {[...Array(5)].map((_, index) => (
                        <div 
                            key={index}
                            className='stairing h-0 w-1/5 bg-gradient-to-b from-gray-900 via-black to-gray-800'
                            ref={el => stairingRefs.current[index] = el}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Navigation content */}
            <div ref={fullNavLinksRef} className='relative h-full w-full flex flex-col'>
                {/* Header with close button */}
                <div className="navlink flex w-full justify-between items-start p-4 lg:p-8 relative z-10">
                    <div className='flex-1'></div>
                    
                    {/* Close button */}
                    <div 
                        onClick={() => setNavOpen(false)} 
                        className='h-12 w-12 lg:h-16 lg:w-16 relative cursor-pointer group transition-all duration-300 hover:scale-110'
                    >
                        <div className='absolute top-1/2 left-1/2 w-8 lg:w-10 h-0.5 lg:h-1 bg-[#D3FD50] transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:bg-red-400 transition-colors duration-300'></div>
                        <div className='absolute top-1/2 left-1/2 w-8 lg:w-10 h-0.5 lg:h-1 bg-[#D3FD50] transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:bg-red-400 transition-colors duration-300'></div>
                    </div>
                </div>

                {/* Navigation links container */}
                <div className='flex-1 flex items-center justify-center px-4 lg:px-8'>
                    <div className='w-full max-w-7xl'>
                        <div className='grid gap-6 lg:gap-12'>
                            {navLinksData.map((link, index) => (
                                <div key={link.title} className='link opacity-0'>
                                    <NavLinkItem
                                        title={link.title}
                                        images={link.images}
                                        isLast={index === navLinksData.length - 1}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer space */}
                <div className='h-16 lg:h-24'></div>
            </div>

            {/* Background overlay for additional depth */}
            <div className='fixed inset-0 bg-black/20 pointer-events-none'></div>
            
            {/* Decorative elements */}
            <div className='fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D3FD50] via-transparent to-[#D3FD50] opacity-50'></div>
            <div className='fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D3FD50] via-transparent to-[#D3FD50] opacity-50'></div>
        </div>
    )
}

export default FullScreenNav