function goin(){
    let intro=document.querySelector(".intro");
    let menu=document.querySelector(".menu");
    intro.classList.remove("fadein");
    intro.classList.add("fadeout");
    menu.classList.remove("fadeout");
    menu.classList.add("fadein");

}


//bj
let playerdetails={
    'you':{'span':'#player_score',
            'div':'.player-space','score':0},
    'bot':{'span':'#bot_score','div':'.dealer-space','score':0},
    'cards':['30','34','38','43','45','15','4','21','19','50','10','40','25'],
    'cardmap':{'30':[1,11],'34':4,'38':8,'43':10,'45':10,'15':10,'4':2,'21':5,'19':3,'50':6,'10':7,'40':10,'25':9},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'isturnover':false,
};


let cash=new Audio('./assets/cash.mp3');
let swish=new Audio('./assets/swish.m4a');
let lose=new Audio('./assets/aww.mp3');
let wins= document.querySelector("#wins");
let losses= document.querySelector("#losses");
let draws= document.querySelector("#draws");
const player=playerdetails['you'];
const bot=playerdetails['bot'];

function blackjack(){
    let menu=document.querySelector(".menu");
    let cash=new Audio('./assets/cash.mp3');
    let bjtable=document.querySelector(".bj");
    menu.classList.remove("fadein");
    menu.classList.add("fadeout");
    bjtable.classList.remove("fadeout");
    bjtable.classList.add("fadein");
}

let deal=document.getElementById('deal');
deal.addEventListener('click',cardsdeal);

let stand=document.getElementById('stand');
stand.addEventListener('click',dealersgame);



function hit(){
    if(playerdetails['isStand']===false){
    let rando= Randomfun();
    showcards(rando,player);
    updatescore(rando,player);
    showscore(player);
    swish.play();
    }
}


function Randomfun(){
    let card=Math.floor(Math.random()*13);
    return playerdetails['cards'][card];
}

function showcards(rando,activeplay){
    if(activeplay['score']<=21){
    let bmf=document.createElement('img');
    bmf.src=`./assets/cards/Asset ${rando}.png`;
    bmf.style="padding:20px"
    document.querySelector(activeplay['div']).appendChild(bmf);
}
}

function cardsdeal(){
    if(playerdetails['isturnover']===true){
        playerdetails['isStand']=false;

        let yourcards=document.querySelector('.player-space').querySelectorAll('img');
        let dealercards=document.querySelector('.dealer-space').querySelectorAll('img');

        for(i=0;i<yourcards.length;i++){
            yourcards[i].remove();
        }

        for(i=0;i<dealercards.length;i++){
            dealercards[i].remove();
        }
        player['score']=0;
        bot['score']=0;
        document.querySelector("#player_score").textContent=0;
        document.querySelector("#bot_score").textContent=0;
        document.querySelector("#player_score").style.color="#ffffff";
        document.querySelector("#bot_score").style.color="#ffffff";

        wins.textContent=playerdetails['wins'];
        losses.textContent=playerdetails['losses'];
        draws.textContent=playerdetails['draws'];

        document.querySelector('#result').textContent="Let's Play!";
        document.querySelector('#result').style.color="black";
        playerdetails['isturnover']=false;
}
}


function updatescore(rando,activeplay){
    if(activeplay['score']<=21){
    if(rando=='30'){
        if(activeplay['score']+playerdetails['cardmap'][rando][1]<=21){
            activeplay['score']+=playerdetails['cardmap'][rando][1];

        }else{
            activeplay['score']+=playerdetails['cardmap'][rando][0];

        }
    }else{
        activeplay['score']+=playerdetails['cardmap'][rando];

    }

}
}


function showscore(activeplay){
    if(activeplay['score']<=21){
    document.querySelector(activeplay['span']).textContent=activeplay['score'];
    
    }
    else{
        document.querySelector(activeplay['span']).textContent='Bust!';
        document.querySelector(activeplay['span']).style='color:red;';

    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealersgame(){
    playerdetails['isStand']=true;
while(bot['score']<16 && playerdetails['isStand']===true){
    let rando= Randomfun();  
    swish.play();
    showcards(rando,bot);
    updatescore(rando,bot);
    showscore(bot);
    await sleep(1000);
}
        
       playerdetails['isturnover']=true;
       let kinner=computeWinner();
       showresults(kinner);
           

 

}


function computeWinner(){
    let winner;
    if(player['score']<=21){
        if((player['score']>bot['score'])||(bot['score']>21)){
            winner=player;
        }else if(player['score']<bot['score']){
            winner=bot;

        }else if (player['score']===bot['score']){
            console.log('You drew');
        }
    }
    else if(player['score']>21&&bot['score']>21){
        console.log("you drew!");

    }else if(player['score']>21&&bot['score']<=21){
        winner=bot;
    }
        console.log("winner is ",winner);
        return winner;
}

function showresults(winner){
 let message,textcolor;
 if(playerdetails['isturnover']===true){
        if(winner==player){
            message="You Win!";
            textcolor="green";
            playerdetails['wins']++;
            cash.play();
           


        }   
        else if(winner==bot){
            message="You Lost!";
            textcolor="red";
            playerdetails['losses']++;
            lose.play();

        }   
        else{
            message="You drew!";
            textcolor="black";
            playerdetails['draws']++;


        }   
        document.querySelector("#result").textContent=message;
        document.querySelector("#result").style.color=textcolor;

    
}
}
let slot=new Audio('./assets/slot.wav');
let roll=document.querySelector('#casinoShuffle');
let stop=document.querySelector('#casinoStop');
let counts=0;
roll.addEventListener('click',()=>{
    slot.loop=true;
    slot.play();
});
stop.addEventListener('click',()=>{
    counts++;
    if(counts%3==0){
        slot.pause();
    }

});
// slot
function slotmachine(){
    let menu=document.querySelector(".menu");
   
    let slotm=document.querySelector(".slotmachinegame");
    menu.classList.remove("fadein");
    menu.classList.add("fadeout");
    slotm.classList.remove("fadeout");
    slotm.classList.add("fadein");
}
function goback(){
    let menu=document.querySelector(".menu");
    let slotm=document.querySelector(".slotmachinegame");
    menu.classList.remove("fadeout");
    menu.classList.add("fadein");
    slotm.classList.remove("fadein");
    slotm.classList.add("fadeout");
    slot.pause();
}
//confetti
