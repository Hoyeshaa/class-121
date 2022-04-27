function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet' , modelLoaded)
}
function draw(){
  image(video , 0 , 0 , 250 , 250 );
  classifier.classify(video , gotResults);
}
previos = "";
function modelLoaded(){
  console.log("Model Loaded");
}

function gotResults(error , results){
  if(error){
    console.log(error);
  }
  else{
    if(results[0].confidence > 0.5 && (previos != results[0].label)){
      console.log(results);
      previos = results[0].label;
      synth = window.speechSynthesis;
      data = "object detected is:"+ results[0].label;
      utterthis = new SpeechSynthesisUtterance(data);
      synth.speak(utterthis);
       document.getElementById("object").innerHTML = results[0].label;
       document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
  }
}



