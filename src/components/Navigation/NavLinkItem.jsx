import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NavLinkItem = ({ title, images, isLast = false }) => {
    const containerRef = useRef(null);

    // This hook sets up the continuous horizontal scroll animation.
    // It's scoped to the component's container to avoid conflicts.
    useGSAP(() => {
        // We are targeting the .moveX class and animating its xPercent to -100
        // to create a seamless loop.
        gsap.to('.moveX', {
            xPercent: -100,
            duration: 10,
            repeat: -1,
            ease: 'none',
        });
    }, { scope: containerRef });

    // This hook provides a context-safe function for the hover animations.
    // This ensures that animations created on hover are properly cleaned up.
    const { contextSafe } = useGSAP({ scope: containerRef });

    const onEnter = contextSafe(() => {
        gsap.to('.moveLink', { opacity: 1, duration: 0.3, ease: 'power2.out' });
    });

    const onLeave = contextSafe(() => {
        gsap.to('.moveLink', { opacity: 0, duration: 0.3, ease: 'power2.in' });
    });

    return (
        <div ref={containerRef} onMouseEnter={onEnter} onMouseLeave={onLeave} className={`link origin-top relative border-t border-white ${isLast ? 'border-b' : ''}`}>
            <h1 className='font-[font2] text-5xl md:text-7xl lg:text-[6vw] text-center lg:leading-[0.8] py-4 lg:pt-8 lg:pb-0 uppercase'>{title}</h1>
            <div className='moveLink opacity-0 absolute text-black flex top-0 bg-[#D3FD50] overflow-hidden w-full h-full'>
                <div className='moveX flex items-center shrink-0'>
                    <h2 className='whitespace-nowrap font-[font2] text-5xl md:text-7xl lg:text-[6vw] text-center lg:leading-[0.8] py-4 lg:pt-8 lg:pb-0 uppercase'>View All</h2>
                    <img className='h-12 md:h-20 lg:h-28 rounded-full shrink-0 w-24 md:w-40 lg:w-64 object-cover' src={images[0]} alt="Preview image" />
                    <h2 className='whitespace-nowrap font-[font2] text-5xl md:text-7xl lg:text-[6vw] text-center lg:leading-[0.8] py-4 lg:pt-8 lg:pb-0 uppercase'>View All</h2>
                    <img className='h-12 md:h-20 lg:h-28 rounded-full shrink-0 w-24 md:w-40 lg:w-64 object-cover' src={images[1]} alt="Preview image" />
                </div>
                <div className='moveX flex items-center shrink-0'>
                    <h2 className='whitespace-nowrap font-[font2] text-5xl md:text-7xl lg:text-[6vw] text-center lg:leading-[0.8] py-4 lg:pt-8 lg:pb-0 uppercase'>View All</h2>
                    <img className='h-12 md:h-20 lg:h-28 rounded-full shrink-0 w-24 md:w-40 lg:w-64 object-cover' src={images[0]} alt="Preview image" />
                    <h2 className='whitespace-nowrap font-[font2] text-5xl md:text-7xl lg:text-[6vw] text-center lg:leading-[0.8] py-4 lg:pt-8 lg:pb-0 uppercase'>View All</h2>
                    <img className='h-12 md:h-20 lg:h-28 rounded-full shrink-0 w-24 md:w-40 lg:w-64 object-cover' src={images[1]} alt="Preview image" />
                </div>
            </div>
        </div>
    );
};

export default NavLinkItem;