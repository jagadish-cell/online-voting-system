import React, { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "./faceModels";

const FaceRecognition = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const streamRef = useRef(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    // 🛑 Function to Stop Camera - NOW FULLY FIXED
    const stopCamera = useCallback(() => {
        console.log("🔴 Stopping camera...");

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
                console.log(`✅ Stopped track: ${track.kind}`);
            });
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null; // ⬅️ Critical Fix
        }

        setIsStreaming(false);
        console.log("✅ Camera stopped.");
    }, []);

    useEffect(() => {
        const startVideo = async () => {
            try {
                await loadModels();
                setModelsLoaded(true);
                console.log("✅ Models loaded successfully.");

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsStreaming(true);
                }
            } catch (err) {
                console.error("❌ Error accessing webcam:", err);
            }
        };

        startVideo();

        return () => {
            stopCamera(); // ✅ Ensures cleanup when component unmounts
        };
    }, [stopCamera]); // ✅ Correct dependency

    // ✅ Close Page & Stop Camera First
    const closePage = () => {
        stopCamera();
        setTimeout(() => {
            window.open("", "_self");
            window.close();
        }, 500);
    };

    const captureFaceData = async () => {
        if (!videoRef.current) {
            alert("Webcam not available.");
            return;
        }

        if (!modelsLoaded) {
            alert("Face detection models are still loading. Please wait...");
            return;
        }

        console.log("🔍 Detecting face...");
        try {
            const detections = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (detections) {
                setFaceDetected(true);
                onCapture(detections.descriptor);
            } else {
                alert("No face detected, please try again.");
            }
        } catch (error) {
            console.error("❌ Error detecting face:", error);
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay muted width="640" height="480" />
            <canvas ref={canvasRef} />
            <div style={{ marginTop: "10px" }}>
                <button
                    onClick={captureFaceData}
                    style={{ padding: "10px", backgroundColor: faceDetected ? "#28a745" : "#ffde59" }}
                >
                    {faceDetected ? "Face Captured" : "Capture Face Data"}
                </button>
                {isStreaming && (
                    <>
                        <button
                            onClick={stopCamera}
                            style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#dc3545", color: "white" }}
                        >
                            Stop Camera
                        </button>
                        <button
                            onClick={closePage}
                            style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#343a40", color: "white" }}
                        >
                            Close Page
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default FaceRecognition;
