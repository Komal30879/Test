objects= [];
status = "";

function preload(){
    video = createVideo("test.mp4");
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start(){
    object_detector = ml5.objectDetector('cocossd' , model_loaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function model_loaded(){
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function got_results(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        object_detector.detect(video, got_results);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of objects detected are: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+" "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}