import * as faceapi from "face-api.js";

export const loadModels = async () => {
  const MODEL_URL = "/models"; // Ensure models are hosted correctly

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), // Ensure this loads for your detection method
  ]);

  console.log("✅ All Face-api.js models loaded successfully.");
};
