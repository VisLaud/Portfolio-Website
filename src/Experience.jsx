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
import { useSpring, animated } from '@react-spring/three';

export default function Experience() {
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const laptop = useGLTF('./laptop/laptop.glb');
  const animation = useAnimations(laptop.animations, laptop.scene);

  const [introAnimation, setIntroAnimation] = useSpring(() => ({
    position: [0, -5, 0],
  }));

  useEffect(() => {
    const action = animation.actions['TopAction'];
    action.play();
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
  }, []);

  useEffect(() => {
    setIntroAnimation({
      position: [0, 0, 0],
      config: { mass: 3, tension: 400, friction: 50 },
    });
  }, [setIntroAnimation]);

  useEffect(() => {
    if (isHovered) {
      setIntroAnimation({
        position: [-2.35, 0.5, 3],
        rotation: [0, -0.6, 0],
        config: { mass: 3, tension: 400, friction: 50 },
      });
    }
    if (!isHovered) {
      setIntroAnimation({
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        config: { mass: 3, tension: 400, friction: 50 },
      });
    }
  }, [isHovered, setIntroAnimation]);

  useFrame((state, delta) => {
    const action = animation.actions['TopAction'];
    if (!action.isPlaying && action.time >= action.getClip().duration) {
      setFinishedAnimation(true);
    }
  });

  //to-do fix this
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const modelContainer = document.querySelector('container-model');
      console.log(modelContainer);
      if (modelContainer && !modelContainer.contains(event.target)) {
        setIsHovered(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Environment preset="sunset" />

      <color args={['#695b5b']} attach="background" />

      <Float rotationIntensity={0.4}>
        <rectAreaLight
          width={2.5}
          height={1.65}
          intensity={65}
          color={'#ff6900'}
          rotation={[-0.1, Math.PI, 0]}
          position={[0, 0.55, -1.15]}
        />
        <animated.group {...introAnimation}>
          <primitive
            object={laptop.scene}
            position-y={-1.2}
            onClick={() => setIsHovered(!isHovered)}
            {...{ className: 'container-model' }}
          />
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={0.6}
            position={[0, 0.33, -1.4]}
            rotation-x={-0.25}
          >
            {finishedAnimation && (
              <iframe
                src="https://simantathapa.netlify.app/"
                {...introAnimation}
              />
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
        </animated.group>
      </Float>
      <ContactShadows position-y={-1.5} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
