const container=document.querySelector('.container');
const pipes=container.querySelectorAll('.pipe');

const comment=document.querySelector('.comment');

const selectedRingBox=document.querySelector('.selectedRingBox');
const ringBoxes=selectedRingBox.querySelectorAll('div');

const set1={pipe:pipes[0], ringBox:ringBoxes[0]};
const set2={pipe:pipes[1], ringBox:ringBoxes[1]};
const set3={pipe:pipes[2], ringBox:ringBoxes[2]};

takeRingEvent();

function takeRingEvent(){
    pipes.forEach(pp =>{
        pp.onclick=()=>{
            let set;
            if(pp==pipes[0]){set=set1;}
            else if(pp==pipes[1]){set=set2;}
            else {set=set3;}
            takeRing(set);
        }
    });
}

function takeRing(set){
    let ringBox=set.ringBox;
    let ringCount=set.pipe.childElementCount;
    let selectedRing=set.pipe.children[ringCount-1]||set.pipe.children[ringCount-2]||set.pipe.children[ringCount-3];

    if(ringCount!==0){
        selectedRing=set.pipe.children[ringCount-1];
        set.pipe.removeChild(selectedRing);
        ringBox.appendChild(selectedRing);
        dropRingEvent(set.pipe,ringBox,selectedRing);
    }
    else{
        ringBox.removeChild(selectedRing);
        set.pipe.appendChild(selectedRing);
    }
}

function dropRingEvent(fromPipe,ringbox,ring){
    pipes.forEach(pp => {
        pp.onclick =(event) => dropRing(fromPipe,ringbox,event.currentTarget,ring);
    });
}

function dropRing(fromPipe,box,pipe,ring){
    if(pipe.children.length===0){
        
        box.removeChild(ring);
        pipe.appendChild(ring);
    }
    else if((parseInt(ring.className.match(/\d+/)[0]))>(parseInt(pipe.lastChild.className.match(/\d+/)[0]))){
        box.removeChild(ring);
        pipe.appendChild(ring);
    }
    else{
        box.removeChild(ring);
        fromPipe.appendChild(ring);
    }
    takeRingEvent();
}