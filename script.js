gsap.registerPlugin(ScrollTrigger);
const pageContainer = document.querySelector('.container')

const scroller = new LocomotiveScroll ({ 
    el: pageContainer,
    smooth: true
    })

    scroller.on('scroll', ScrollTrigger.update)
    ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
            return arguments.length
            ? scroller.scrollTop(value, 0, 0)
            : scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return { 
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight, 
            }
        },
        pinType: pageContainer.style.transform ? 'transform' : 'fixed'
    })

    window.addEventListener('load', function() {
        let pinWrap = document.querySelector('pin-wrap')
        let pinWrapWidth = pinWrap.offsetWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;
        
        gsap.to('.pin-wrap', {
            ScrollTrigger: {
                scroller: pageContainer,
                scrub: true,
                trigger: 'pin-wrap',
                pin: true,
                start: 'top top',
                end: pinWrapWidth,
            },
            x: -horizontalScrollLength
    })

    ScrollTrigger.addEventListener('refresh', () => scroller.update())
    ScrollTrigger.refresh();
    })



