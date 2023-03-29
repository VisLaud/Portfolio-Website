import React, { useEffect, useState } from 'react';
import {
  Environment,
  Float,
  useGLTF,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
  useAnimations,
} from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
  const [finishedAnimation, setFinishedAnimation] = useState(false);

  const laptop = useGLTF('./laptop/laptop.glb');
  const animation = useAnimations(laptop.animations, laptop.scene);

  useEffect(() => {
    const action = animation.actions['TopAction'];
    action.play();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
  }, []);

  useFrame((state, delta) => {
    const action = animation.actions['TopAction'];
    if (!action.isPlaying && action.time >= action.getClip().duration) {
      setFinishedAnimation(true);
    }
  });

  return (
    <>
      <Environment preset="sunset" />

      <color args={['#695b5b']} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#ff6900'}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={laptop.scene} position-y={-1.2} />
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={1.17}
            position={[0, 0.33, -1.4]}
            rotation-x={-0.25}
          >
            {finishedAnimation && (
              <iframe src="https://simantathapa.netlify.app/" />
            )}
          </Html>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
          >
            Simanta Thapa
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.5} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
