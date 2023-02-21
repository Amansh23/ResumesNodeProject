var t1 = gsap.timeline();
t1
.from("#profilebox",{
    opacity:0,
    ease:Expo.easeOut,
    y:80,
    duration:2,
    onComplete: () => console.log("the tween is complete")
})
.from("#headingbox",{
    opacity:0,
    ease:Expo.easeOut,
    y:-80,
    duration:2,
    onComplete: () => console.log("the tween is complete")
},"=-1")

.from("#mainbox",{
    opacity:0,
    ease:Expo.easeOut,
    y:80,
    duration:1,
    onComplete: () => console.log("the tween is complete")
},"=-1")

.from("#postbox",{
    opacity:0,
    ease:Expo.easeIn,
    y:80,
    duration:2,
    onComplete: () => console.log("the tween is complete")
},"=-1")

.from(".box1",{
    opacity:0,
    ease:Expo.easeOut,
    x:80,
    duration:2,
    onComplete: () => console.log("the tween is complete")
},"=-1")

.from(".box2",{
    opacity:0,
    ease:Expo.easeOut,
    x:80,
    duration:2,
    onComplete: () => console.log("the tween is complete")
},"=-1")

.from(".box3",{
    opacity:0,
    ease:Expo.easeOut,
    x:80,
    duration:2,
    onComplete: () => console.log("the tween is complete")
},"=-1")




document.querySelector(".profilebutton").addEventListener('click',function(){
    document.querySelector("#upload").click()
  })

  document.querySelector("#upload").addEventListener("change",function(){
    document.querySelector('#one').submit()
  })