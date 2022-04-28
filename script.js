lwx=0;
lwy=0;
rwx=0;
rwy=0;
srw=0;
slw=0;
music="";
music2="";

function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(500, 500);
    canvas.position(500, 200);
    xion=createCapture(VIDEO);
    xion.hide();
    poseNet=ml5.poseNet(xion, modelNOTloaded);
    poseNet.on("pose", dontgotposes);
}

function dontgotposes(results){
    console.log("I already said we dont have poses.");
    if(results.length > 0){
        console.log(results);

        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;  

        srw = results[0].pose.keypoints[10].score;
        slw = results[0].pose.keypoints[9].score;
 

    }
}

function modelNOTloaded(){
    console.log("poseNet has not loaded. OOF.")
}

function draw(){
    image(xion, 0, 0, 500, 500);

    song1_status = music1.isPlaying();
    song2_status = music2.isPlaying();

    if(srw > 0.2){
        circle(rwx, rwy, 20);
        music2.stop();

        if(song1_status == false){
            music1.play();
        }
    }

    if(slw > 0.2){
        circle(lwx, lwy, 20);
        music1.stop();

        if(song2_status == false){
            music2.play();
        }
    }
}




