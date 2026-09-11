import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    let intensityInterval: ReturnType<typeof setInterval> | undefined;
    const promise = new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            try {
              console.log("GLTF loaded, compiling scene...");
              character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              console.log("Compiled scene, setting shadows...");
              character.traverse((child: any) => {
                if (child.isMesh) {
                  const mesh = child as THREE.Mesh;
                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              resolve(gltf);
              const workTrigger = ScrollTrigger.getById("work");
              ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger !== workTrigger) {
                  trigger.kill();
                }
              });
              intensityInterval = setCharTimeline(character, camera);
              setAllTimeline();
              const footR = character.getObjectByName("footR");
              if (footR) footR.position.y = 3.36;
              const footL = character.getObjectByName("footL");
              if (footL) footL.position.y = 3.36;
              dracoLoader.dispose();
              console.log("Character setup complete!");
            } catch (err) {
              console.error("Error inside character loader handler:", err);
              reject(err);
            }
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
    return { promise, getIntensityInterval: () => intensityInterval };
  };

  return { loadCharacter };
};

export default setCharacter;
