
object= [];
status= "";



function setup()
{
    canvas= createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
}

function start()
{
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    
    document.getElementById("status").innerHTML= "Status : Detecting Object ";
}

function modelLoaded()
{
    console.log('modelLoaded');
    status= true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else 
    {
        console.log(results); 
        object= results;
    }
    
}

function draw()
{
    image(video,0,0,400,400);

     if(status != "")
     {
        r= random(255);
        g= random(255);
        b= random(255);

     objectDetector.detect(video,gotResult);
     for(i=0 ; i < object.length ; i++)
     {
       document.getElementById("status").innerHTML= "Status = Object Detected";
       document.getElementById("number").innerHTML= "Number of Objects detected are - " + object.length;
       
    noFill();
    stroke(r,g,b);
    percent=floor(object[i].confidence * 100);
    text(object[i].label + " " + percent + "%" , object[i].x + 15 , object[i].y + 15);
    rect(object[i].x, object[i].y , object[i].width , object[i].height);
     }
}
}
