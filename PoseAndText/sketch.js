// // Copyright (c) 2020 ml5
// //
// // This software is released under the MIT License.
// // https://opensource.org/licenses/MIT

// /* ===
// ml5 Example
// Object Detection using COCOSSD
// This example uses a callback pattern to create the classifier
// === */

// let video;
// let detector;
// let detections = [];

// function setup() {
//   createCanvas(640, 480);
//   video = createCapture(VIDEO);
//   video.size(640, 480);
//   video.hide();
//   // Models available are 'cocossd', 'yolo'
//   detector = ml5.objectDetector('cocossd', modelReady);
// }

// function gotDetections(error, results) {
//   if (error) {
//     console.error(error);
//   }
//   detections = results;
//   detector.detect(video, gotDetections);
// }

// function modelReady() {
//   detector.detect(video, gotDetections);
// }

// function draw() {
//   image(video, 0, 0);

//   for (let i = 0; i < detections.length; i++) {
//     let object = detections[i];
//     stroke(0, 255, 0);
//     strokeWeight(4);
//     noFill();
//     rect(object.x, object.y, object.width, object.height);
//     noStroke();
//     fill(255);
//     textSize(24);
//     text(object.label, object.x + 10, object.y + 24);
//   }
// }

// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

let texts = "Who am I";
let chars = [];
let up, down;
let directionX;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Setup video capture
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // Initialize text variables
  chars = texts.split('');
  up = 10;
  down = 10;
  directionX = 1;
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();

  // Draw the text following the mouse
  for (let i = 0; i < chars.length; i++) {
    let x = mouseX + directionX * i * 10;
    let y = mouseY + random(-down, up);
    text(chars[i], x, y);
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse if the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

