import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({width :640,height:360,letterbox:true ,crisp:true, stretch:true});

k.loadRoot("./"); // A good idea for Itch.io publishing later

k.loadFont("title", "fonts/BBHBogle-Regular.ttf")
k.loadFont("sub","fonts/BebasNeue-Regular.ttf")
k.loadFont("darksoul","fonts/OptimusPrinceps.ttf")
k.loadFont("bold","fonts/Boldonse-Regular.ttf")

k.loadSound("rat","audio/rat.mp3")
k.loadSound("chime","audio/chime.mp3")
k.loadSound("badchime","audio/badchime.mp3")
k.loadSound("death","audio/death.mp3")
k.loadSound("blackholevoices","audio/blackholesound.mp3")
k.loadSound("flash", "audio/flash.mp3")
k.loadSound("menu","audio/menu.mp3")

k.loadSprite("bomb", "sprites/bomb.png")
k.loadSprite("menu","sprites/menu.jpg")
k.loadSprite("rat","sprites/ratticus.png")
k.loadSprite("blackhole", "sprites/blackhole2.png",
    {sliceX:6 , anims: 
        {idle : {from :0 , to : 5,loop:true ,speed:3}
}})
k.loadSprite("stars","sprites/starsbackground.png",
    {sliceX:2,anims:
        {idle: {from :0,to:1,loop:true,speed:1.3}}
    
})

k.loadSprite("earth","sprites/earthbackground.png",
    {sliceX:2,anims:
        {idle: {from :0,to:1,loop:true,speed:1.3}}
    
})    

k.loadSprite("levelbg","sprites/levelbackground.png", {sliceX:2 ,anims:
    {"idle": {from:0,to:1,loop:true,speed:0.7}}

})

k.loadSprite("blackend","sprites/blackholeend.png", {sliceX:6 ,anims:
    {"idle": { from:0,to:5,speed:1}}
})

const earth = [
    "earth1",
    "earth2",
    "earth3",
    "earth4"
]

for (const name of earth){
    k.loadSprite(name,`sprites/${name}.png`)
}

const stars = [ 
    "star1",
    "star2",
    "star3",
    "star4",
];

for (const name of stars){
    k.loadSprite(name, `sprites/${name}.png`)
}


const books = [
    "book1",
    "book2",
    "book3",
    "book4",
]

for (const name of books){
    k.loadSprite(name,`sprites/${name}.png`)
}

let currentlevel =0;



k.scene("menu", ()=> {
    const music = k.play("menu",{volume:0.2})
    k.setBackground(BLACK)

    const menu =k.add([
        k.sprite("menu"),
        k.z(0)
    ])

    const title = k.add([
        k.text("Blackh()le Radiation", {font:"bold",size:34}),
        k.pos(283,150),
        k.z(5),
        "title",
        k.scale(),
        k.anchor("center")
    ])

    k.onUpdate("title",()=>{
        title.scaleTo(rand(0.99,1))
    })


    const start = k.add([
        k.text("Enter the game ", {font:"sub",size:20}),
        k.pos(200,250),
        k.area(),
        k.body(),
        "start",
        k.anchor("center")
    ])

    k.onHover("start",()=>{
    k.tween(k.vec2(1),k.vec2(1.2),0.3,(opa) => start.scale = opa);
    })

    k.onHoverEnd("start",()=>{
    k.tween(k.vec2(1.2),k.vec2(1),0.2,(opa) => start.scale = opa);
    })

    k.onClick("start", ()=>{
        music.paused =true;
        k.go("lore")
    })

})

k.scene("lore",()=> {
    k.add([
        k.sprite("stars")
    ])
    k.add([
        k.text("The blackhole has split ,consumed everything.\nYour job is to retrieve the split parts\nand put them back.\nIf your get a chance ,destroy it. \n\n DO NOT PUT YOUR CURSOR NEAR IT.\n\n (collect the split parts via your cursor until \nthe bar fills up.)\n\n AVOID THE NOISE.\n\n(press enter)",{font:"bold",size:20}),
        k.pos(20,70)
    ])

    k.onKeyPress("enter", ()=> {
        k.go("levels")
    })
})

k.scene("levels", () => {
k.add ([
  k.sprite ("levelbg",{anim:"idle"})])

k.add([
    k.text("Level selector",{font:"bold",size:20}),
    k.pos(90,50),
    k.color(rgb(0,0,0)),
    
])
//ew collisions 
const starc =k.add([
    k.rect(50,50,),
    k.opacity(0),
    k.pos(130,270),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "starc"
])

const earthc =k.add([
    k.rect(50,50,),
    k.opacity(0),
    k.pos(185,170),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "earthc"
])

const ratc =k.add([
    k.rect(50,50,),
    k.opacity(0),
    k.pos(340,100),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "ratc"
])

const bookc =k.add([
    k.rect(50,50,),
    k.opacity(0),
    k.pos(450,220),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "bookc"
])

const blackholec =k.add([
    k.rect(50,50,),
    k.opacity(0),
    k.pos(290,280),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "blackholec"
])

k.onClick("starc",()=> {
    currentlevel=0
    k.go("game")
})

k.onClick("earthc", () =>{
     currentlevel=1
     k.go("game")
    })

k.onClick("ratc", () =>{
    currentlevel=2
    k.go("game")
})

k.onClick("bookc",()=> {
    currentlevel=3
    k.go("game")
})

k.onClick("blackholec",()=>{
    currentlevel=4
    k.go("game")
})





//phew collisons end 

})


k.scene("game",()=> {

    k.setBackground(rgb(10, 10, 11))

    if (currentlevel === 1){
        k.add ([
            k.sprite("stars", {anim:"idle"}),
            k.opacity(0.7)
        ])
    }

    if (currentlevel === 2 ) {
        k.add([
            k.sprite("earth", {anim:"idle"}),
            k.opacity(0.7),
        ])
    }

    if (currentlevel ===3 || currentlevel ===4 ){
        k.add([
            k.sprite("earth", {anim:"idle"}),
            k.opacity(0.7),
        ])        
    }

    const blackhole = k.add([
        k.pos(590, 160), 
        k.sprite("blackhole", {anim:"idle"}),
        k.rotate(-10),
        "blackhole",
        k.anchor("center"),
        k.z(10)]);

    const flash = k.add ([
        k.rect(640,360),
        k.pos(0,0),
        k.opacity(0),
        "flash",
        k.z(7)

    ])    


//score bar        

let n =0 ;

    //score should be multiples of 13 since fing rect cant be a round no

    const outline = k.add([
        k.rect(30,130 ,{fill:false}),
        k.color(rgb(255, 255, 255)),
        k.outline(6,rgb(241, 246, 241)),
        k.pos(50,350),
        k.rotate(183),
        k.z(3)
        
    ])



let score =0;

    k.onClick(`thing`, (thing)=> {
        n = n+1;
        score =13*n;
        fill.height = score;
        if (n>=10){
            k.tween(0,1,0.8, (opa)=> flash.opacity = opa)
            k.play("flash")
            k.tween(1,0,0.8,(opa)=> blackhole.opacity = opa)
            k.wait (1.3, () => {
                k.go("won", currentlevel)
            })}
        k.shake(4);
        k.destroy(thing)
        k.play("chime")
        });    

        const fill = k.add([
        k.rect(30,0),
        k.pos(50,350),
        k.rotate(183),
        k.color(rgb(159, 29, 29)),
        k.z(2)
       
    ])    



    k.onClick("bombthing", (bombthing) => {
        k.play("badchime")
        k.shake(10),
        k.wait(0.3,() => {
        k.go("gameover")})    
        })




    function spawnthings (level,smin,smax){

        loop (1.5, ()=> {
            const xpos = k.width() +30;
            const ypos = rand(0,k.height() -20);
            const speed = rand (smin,smax);
            const isbomb = chance (0.2);
            const namething = isbomb ? "bomb" : choose(level);

        add ([
            k.sprite(namething),
            k.pos(xpos,ypos),
            k.area(),
            k.scale(),
            k.anchor("center"),
            "thing",
            isbomb ? "bombthing" : `${level}thing`,
            {speed : speed}
        ])

        });


        k.onUpdate("thing", (thing) => {
            thing.move(-thing.speed -score*2,0);
            if (thing.pos.x <-120){
                k.destroy(thing)
        }})

        k.onHover("thing",(thing)=> {
            thing.scaleTo(1.4)
        })

        k.onHoverEnd("thing",(thing)=> {
            thing.scaleTo(1)
        })        




    }

//cam shake , audio whenever near balckhole so tht player doesnt spawn camp 
let scalething ;
const blackholesound = k.play("blackholevoices", {volume:0,loop:true},"bsound")
        k.onUpdate(()=>{
        const mouse = k.mousePos();
        const bhd = blackhole.pos.dist(mouse)
        if (bhd < 150){
            scalething = 1- bhd/150
            k.shake(scalething)
            blackholesound.volume = scalething*0.2;
        }
        else{
            blackholesound.volume =0 ;
        }
        });
        
//end of spooky balckhole

if (currentlevel === 0){
    spawnthings(stars,100,150);
}
if (currentlevel === 1){
    spawnthings(earth,120,180);
}
if (currentlevel === 2){
    k.go("rat");
}
if (currentlevel===3){
   spawnthings(books,120,190)
}
if (currentlevel === 4){
    k.go("end");
}
    });



k.scene("won", (level)=> {

    k.setBackground(rgb(0, 0, 0))

    let levelname ;

    if (level === 0){
        levelname = "stars"
    }
    if (level ===1){
        levelname = "earth"
    }

    if (level === 3){
        levelname = "books"
    }

    if (level ===0 ||level === 1){
    k.add([
       k.sprite(levelname, {anim:"idle"}),
        k.opacity(0.8),
  ])
    }

    k.add ([
    k.text (`You collected the ${levelname} suucessfully !`,{font: "bold",size:25}),
    k.pos(300,100),
    k.color(rgb(223, 231, 237)),
    k.scale(),
    k.anchor("center"),
    "title"
    ])

    const option = k.add ([
        k.text("Go to levels? ", {font:"bold",size:20,transform: () => ({
            color: k.hsl2rgb((k.time() * 0.2 ) % 1, 0.7, 0.8)})}),
        k.area(),
        k.body(),
        k.scale(),
        k.opacity(0.6),
        "option",
        k.pos(200,180)


    ])

    k.onHover("option",()=> {
        k.tween(0.2,1,0.5, (opa) => option.opacity = opa)
    })

    k.onHoverEnd("option",()=> {
        k.tween(1,0.2,0.3, (opa) => option.opacity = opa)

    })        

    k.onClick("option", ()=> {
        k.go("levels")
    })


})


k.scene("gameover" , () => {
    k.setBackground(rgb(172, 55, 55));
    const title = k.add([
        k.text ("You collected the wrong  \n radiation (oopsie ;3).",{font: "darksoul",size:40}),
        k.anchor("center"),
        k.pos(300,150)
    ])
    const music = k.play("death", {volume:0.7});
    k.tween(0,1,1,(opa) => title.opacity = opa )

    const back = k.add([
        "back",
        k.text(" Back to game",{font:"darksoul",size:24}),
        k.pos(250,230),
        k.scale(),
        k.area(),
        k.body(),
        k.anchor("center")
    ])

    k.tween(0,1,2,(opa) => back.opacity = opa )


        k.onHover("back",()=>{
    k.tween(k.vec2(1),k.vec2(1.2),0.3,(opa) =>back.scale = opa);
    })

    k.onHoverEnd("back",()=>{
    k.tween(k.vec2(1.2),k.vec2(1),0.2,(opa) => back.scale = opa);
    })

    k.onClick("back", ()=>{
        music.paused = true;
        k.go("game")
    })




})

k.scene("rat",() => {

 
 k.setBackground(rgb(0,0,0));

const background = k.add([
k.sprite("earth"),
k.opacity(0.6),
])

const blackhole = k.add([
    k.pos(590, 160), 
    k.sprite("blackhole", {anim:"idle"}),
    k.rotate(-10),
    "blackhole",
    k.anchor("center"),
    k.z(10)]);

const rat = k.add([
    k.sprite("rat"),
    k.pos(50,50),
    k.scale(0.5),
    k.area(),
    k.body(),
    k.opacity(0),
])    


const text =k.add([
    k.text("PONCHO, WHERE ARE THE CROPS-", {size:15}),
    k.pos(150,50),
    k.z(1),
    "destroy",
    k.color(rgb(0,0,0)),
    k.opacity(0)
])

const textbox =text.add([
    k.rect(text.width + 30,text.height+30),
    k.color(rgb(216, 231, 230)),
    k.area(),
    "destroy",
    k.z(0),
    k.opacity(0)
])


const option1 =k.add([
    k.text("throw him in the black hole.",{size:15}),
    k.area(),
    k.pos(70,250),
    k.scale(),
    k.color(rgb(8, 8, 8)),
    k.body(),
    "option",
    "destroy",
    k.opacity(0),
    k.z(1)
])

    const textbox2 =option1.add([
    k.rect(option1.width + 10,option1.height+10),
    k.color(rgb(216, 231, 230)),
    k.area(),
    k.opacity(0),
    "destroy",
    k.z(0)
])

    const option2 =k.add([
    k.text(" throw him in the black hole elegantly :3",{size:15}),
     k.pos(70,300),
    k.area(),
    k.color(rgb(0, 0, 0)),
    k.scale(),
    k.body(),
    "option",
    "destroy",
    k.z(1),
    k.opacity(0)
])

    const textbox3 =option2.add([
    k.rect(option2.width + 10,option2.height+10),
    k.color(rgb(216, 231, 230)),
    k.area(),
    "destroy",
    k.z(0),
    k.opacity(0)
    ])

    k.tween(0,1,1,(opa)=> rat.opacity =opa);

    k.wait(1,() =>{
    k.tween(0,1,1,(opa) => (text.opacity=opa,textbox.opacity = opa))
})

k.wait(2,()=> {
    k.tween(0,1,1,(opa) => (option1.opacity=opa,option2.opacity=opa,textbox2.opacity=opa,textbox3.opacity =opa))
})

 k.onHover("option", (option)=> {
option.scaleTo(1.3)
})

 k.onHoverEnd("option", (option)=> {
option.scaleTo(1)
})

 k.onClick("option" , () => {
    k.destroyAll("destroy")
    k.tween(50,700,3,(pos)=> rat.pos.x = pos)
    k.tween(50,200,3,(pos)=> rat.pos.y=pos)
    k.tween(0.5,0,3,(sca) => rat.scaleTo(sca))
    k.play("rat")
    k.wait(3.5,()=>{
        k.go("levels")
    })

})

})

k.scene("end", ()=> {

    k.add([
    k.sprite('earth'),
    k.opacity(0.4),
    ])

    const text = k.add ([
        k.text("Use your power you learnt from the book\nto end the blackhole?\nPress enter",{font:"bold",size:30}),
        k.color(rgb(203, 181, 181)),
        k.pos(50,60),
        "destroy"
    ])

    const blackhole = k.add([
        k.pos(590, 160), 
        k.sprite("blackhole", {anim:"idle"}),
        k.rotate(-10),
        k.opacity(1),
        "blackhole",
        "destroy",
        k.anchor("center"),
        k.z(10)]);    



k.onKeyPress("enter" , ()=> {
    blackhole.opacity= 0;
    k.tween(1,0,0.5,(opa)=> text.opacity = (opa))

    const blackholeend = k.add([
        k.pos(590, 160), 
        k.sprite("blackend", {anim:"idle"}),
        k.rotate(-10),
        k.opacity(1),
        "blackhole",
        "destroy",
        k.anchor("center"),
        k.z(10)]);

    k.wait(7,()=> {
        k.destroyAll('destroy')
        const text2 = k.add([
            k.text("Made with <3 by reaous ",{font:"bold",size:30}),
            k.pos(190,200),
            k.opacity(0)
        ])
        k.tween(0,1,0.3,(opa)=>text2.opacity=(opa))
    })



})
    
})


k.go("menu");

