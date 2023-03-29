import {
  Environment,
  Float,
  useGLTF,
  PresentationControls,
} from '@react-three/drei';

export default function Experience() {
  const laptop = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );
  return (
    <>
      <Environment preset="sunset" />

      <color args={['#695b5b']} attach="background" />

      <PresentationControls global>
        <Float rotationIntensity={0.4}>
          <primitive object={laptop.scene} position-y={-1.2} />
        </Float>
      </PresentationControls>
    </>
  );
}
