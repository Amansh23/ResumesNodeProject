var t1 = gsap.timeline();
t1
.from("#main",{
    opacity:0,
    ease:Expo.easeOut,
    y:200,
    duration:2,
    onComplete: () => console.log("the tween is complete")
})

.from(".h2",{
    opacity:0,
    ease:Expo.easeOut,
    y:200,
    duration:2,
    onComplete: () => console.log("the tween is complete")
},"=-1")