gsap.registerPlugin(ScrollTrigger);
const pageContainer = document.querySelector('.container')

const scroller = new LocomotiveScroll ({ 
    el: pageContainer,
    smooth: true
    })

    scroller.on('scroll', ScrollTrigger.update)
    ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
            return arguments.length ? scroller.scrollTop(value, 0, 0) : scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, }
        },
        pinType: pageContainer.computedStyleMap.transform ? 'transform' : 'fixed'
    })

    window.addEventListener('load', () => {
        let pinWrap = document.querySelector('.pin-wrap')
        let pinWrapWidth = pinWrap.offsetWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;
        
        gsap.to('.pin-wrap', {
            ScrollTrigger: {
                scroller: pageContainer,
                trigger: '.pin-wrap',
                start: 'top top',
                end: pinWrapWidth,
                scrub: true,
                pin: true,
                
            },
            x: -horizontalScrollLength
    })

    ScrollTrigger.addEventListener('refresh', () => scroller.update())
    ScrollTrigger.refresh()
    })



