song=""
left_wrist_x=""
left_wrist_y=""
right_wrist_x=""
right_wrist_y=""
left_wrist=""
right_wrist=""
function preload(){
    song=loadSound('forever.mp3')
    
}
function setup(){
    canvas=createCanvas(400,350)
    canvas.position(500,135)
    webcam=createCapture(VIDEO)
    webcam.size(200,200)
    webcam.hide()
    pose=ml5.poseNet(webcam,modelLoaded)
    pose.on("pose",gotPose)
}
function draw(){
    image(webcam,0,0,400,350)
    fill('red')
    stroke("black")
    if(right_wrist>0.2){
        circle(right_wrist_x,right_wrist_y,30)
        console.log("right")
        if(right_wrist_y>0 && right_wrist_y<70){
            song.rate(0.5)
            document.getElementById("sp").innerHTML="speed :0.5x"
        }
        else if(right_wrist_y>70 && right_wrist_y<140){
            song.rate(1)
            document.getElementById("sp").innerHTML="speed :1x"
        }
        else if(right_wrist_y>140 && right_wrist_y<210){
            song.rate(1.5)
            document.getElementById("sp").innerHTML="speed :1.5x"
        }
        else if(right_wrist_y>210 && right_wrist_y<280){
            song.rate(2)
            document.getElementById("sp").innerHTML="speed :2x"
        }
        else if(right_wrist_y>280 && right_wrist_y<350){
            song.rate(2.5)
            document.getElementById("sp").innerHTML="speed :2.5x"
        }

    }
    if(left_wrist>0.2){
        circle(left_wrist_x,left_wrist_y,30)
        console.log("left")
        number_left=Number(left_wrist_y)
        new_left=floor(number_left/350)
        song.setVolume(new_left)
        document.getElementById("vl").innerHTML="volume : "+new_left
    }
    
}
function mp(){
    song.play()
}
function stop(){
    song.stop()
}
function pause(){
    song.pause()
}
function modelLoaded(){
    console.log("hello i am working ")
}

function gotPose(results){
    if(results.length>0){
        console.log(results)
        right_wrist_x=results[0].pose.rightWrist.x
        right_wrist_y=results[0].pose.rightWrist.y
        left_wrist_x=results[0].pose.leftWrist.x
        left_wrist=results[0].pose.keypoints[9].score
        right_wrist=results[0].pose.keypoints[10].score
    }
}




