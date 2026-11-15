import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({width :640,height:360,letterbox:true ,crisp:true, stretch:true});

k.loadRoot("./"); // A good idea for Itch.io publishing later

k.loadFont("title", "fonts/BBHBogle-Regular.ttf")
k.loadFont("sub","fonts/BebasNeue-Regular.ttf")
k.loadFont("darksoul","fonts/OptimusPrinceps.ttf")
k.loadFont("bold","fonts/Boldonse-Regular.ttf")

k.loadSound("chime","audio/chime.mp3")
k.loadSound("badchime","audio/badchime.mp3")
k.loadSound("death","audio/death.mp3")
k.loadSound("blackholevoices","audio/blackholesound.mp3")
k.loadSound("flash", "audio/flash.mp3")

k.loadSprite("bomb", "sprites/bomb.png")
k.loadSprite("menu","sprites/menu.jpg")
k.loadSprite("blackhole", "sprites/blackhole.png",
    {sliceX:7 , anims: 
        {idle : {from :0 , to : 6,loop:true ,speed:3}
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
    {"idle": {from:0,to:1,loop:true,speed:0.5}}

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


let currentlevel =0;



k.scene("menu", ()=> {
    k.setBackground(BLACK)

    const menu =k.add([
        k.sprite("menu"),
        k.z(0)
    ])

    const title = k.add([
        k.text("Blackh()le Radiation", {font:"title",size:34}),
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
        k.go("game")
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
    k.opacity(0.4),
    k.pos(130,270),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "starc"
])

const earthc =k.add([
    k.rect(50,50,),
    k.opacity(0.4),
    k.pos(185,170),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "earthc"
])

const ratc =k.add([
    k.rect(50,50,),
    k.opacity(0.4),
    k.pos(340,100),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "ratc"
])

const bookc =k.add([
    k.rect(50,50,),
    k.opacity(0.4),
    k.pos(450,220),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "bookc"
])

const blackholec =k.add([
    k.rect(50,50,),
    k.opacity(0.4),
    k.pos(290,280),
    k.color(rgb(247, 251, 247)),
    k.z(10),
    k.area(),
    k.body(),
    "blackholec"
])




//phew collisons end 

})


k.scene("game",()=> {

    k.setBackground(rgb(10, 10, 11))

    if (currentlevel === 1){
        k.add ([
            k.sprite("stars", {anim:"idle"})
        ])
    }

    if (currentlevel === 2 ) {
        k.add([
            k.sprite("earth", {anim:"idle"})
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
    throwthings(ratticus)
}
if (currentlevel===3){
   spawnthings(books,120,190)
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

    k.add([
       k.sprite(levelname, {anim:"idle"},
        k.opacity(0.8),
        
       )
  ])

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



k.go("levels");