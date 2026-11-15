import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({width :640,height:360,letterbox:true ,crisp:true, stretch:true});

k.loadRoot("./"); // A good idea for Itch.io publishing later

k.loadFont("title", "fonts/BBHBogle-Regular.ttf")
k.loadFont("sub","fonts/BebasNeue-Regular.ttf")
k.loadFont("darksoul","fonts/OptimusPrinceps.ttf")

k.loadSound("chime","audio/chime.mp3")
k.loadSound("badchime","audio/badchime.mp3")
k.loadSound("death","audio/death.mp3")
k.loadSound("blackholevoices","audio/blackholesound.mp3")


k.loadSprite("bomb", "sprites/bomb.png")
k.loadSprite("menu","sprites/menu.jpg")
k.loadSprite("blackhole", "sprites/blackhole.png",
    {sliceX:7 , anims: 
        {idle : {from :0 , to : 6,loop:true ,speed:3}
}})

const stars = [ 
    "star1",
    "star2",
    "star3",
    "star4",
];

for (const name of stars){
    k.loadSprite(name, `sprites/${name}.png`)
}


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


k.scene("game",()=> {

    k.setBackground(rgb(30, 30, 34))

    const blackhole = k.add([
        k.pos(590, 160), 
        k.sprite("blackhole", {anim:"idle"}),
        k.rotate(-10),
        "blackhole",
        k.anchor("center"),
        k.z(10)]);

//score bar        


    let n =0 ;
    let score = 13 + 13*n;
    //score should be multiples of 13 since fing rect cant be a round no

    const outline = k.add([
        k.rect(30,130 ,{fill:false}),
        k.outline(6),
        k.pos(50,350),
        k.rotate(183),
        k.z(3)
        
    ])

    const fill = k.add([
        k.rect(30,score),
        k.pos(50,350),
        k.rotate(183),
        k.color(rgb(159, 29, 29)),
        k.z(2)
       
    ])    
 


    k.onClick(`thing`, (thing)=> {
         n = n+1;
        k.shake(4);
        k.destroy(thing)
        k.play("chime")
        });    

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
            thing.move(-thing.speed,0);
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
            blackholesound.volume = scalething - 0.6;
        }
        else{
            blackholesound.volume =0 ;
        }
        });
        



spawnthings(stars,100,150);

    });


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
        k.pos(250,200),
        k.scale(),
        k.area(),
        k.body(),
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



k.go("game");