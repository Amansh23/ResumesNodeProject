var t1 = gsap.timeline();
t1
.to("#container",{

    opacity:0,
    ease:Expo.easeIn,
    duration:2,
    onComplete: () => console.log("the tween is complete")
})

.to(".icon",{
    x:300,
    opacity:1,
    ease:Expo.easeOut,
    duration:1
})
.to(".img",{
    x:-300,
    opacity:1,
    ease:Expo.easeOut,
    duration:1
},"=-1")
.from(".h1",{
    opacity:0,
    y:5,
    ease:Sine.easeIn,
    duration:0.2
})
.from(".h2",{
    opacity:0,
    x:5,
    ease:Sine.easeIn,
    duration:0.2
})
.from(".h4",{
    opacity:0,
    y:15,
    ease:Sine.easeIn,
    duration:0.2
})
.from(".h3",{
    opacity:0,
    x:5,
    ease:Sine.easeIn,
    duration:0.2
})