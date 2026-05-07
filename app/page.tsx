"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const ANIM = {
    death: "Death.002",
    idle: "Idle01",
    dance: "Dance_Base.001",
};

const CLICKABLE = ["sett", "Mesh_0010", "laptop", "cup"];

export default function Page() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    // for future components
    const [aboutMe, setAboutMe] = useState(false);
    const [projects, setProjects] = useState(false);
    const [achievements, setAchievements] = useState(false);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.domElement.style.cssText = "opacity:0;transition:opacity 0.8s ease";
        mountRef.current.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 1));

        let camA: THREE.PerspectiveCamera | null = null;
        let camB: THREE.PerspectiveCamera | null = null;
        let model: THREE.Object3D | null = null;
        let mainMixer: THREE.AnimationMixer | null = null;
        let textMixer: THREE.AnimationMixer | null = null;
        let idleAction: THREE.AnimationAction;
        let deathAction: THREE.AnimationAction;
        let hasDied = false;
        let clickableNames = [...CLICKABLE];
        let currentIntersect: THREE.Object3D | null = null;

        const scroll = { progress: 0, target: 0 };
        const mouse = { x: 0, y: 0 };
        const keys = { up: false, down: false };
        const parallax = new THREE.Vector3();
        const currentOffset = new THREE.Vector3();
        const clock = new THREE.Clock();
        const raycaster = new THREE.Raycaster();

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        dracoLoader.preload();
        loader.setDRACOLoader(dracoLoader);

        loader.load("/TextComponents.glb", (gltf) => {
            scene.add(gltf.scene);
            if (gltf.animations.length > 0) {
                textMixer = new THREE.AnimationMixer(gltf.scene);
                for (const clip of gltf.animations) textMixer.clipAction(clip).play();
            }
        });

        loader.load("/Experience.glb", (gltf) => {
            model = gltf.scene;
            scene.add(gltf.scene);

            const cameras = gltf.cameras as THREE.PerspectiveCamera[];
            camA = cameras.find((c) => c.name === "CameraLanding") ?? cameras[0];
            camB = cameras.find((c) => c.name === "CameraPortfolio") ?? cameras[1];

            if (camA) {
                camera.position.copy(camA.position);
                camera.quaternion.copy(camA.quaternion);
            }

            if (gltf.animations.length > 0) {
                mainMixer = new THREE.AnimationMixer(gltf.scene);
                for (const clip of gltf.animations) {
                    const action = mainMixer.clipAction(clip);
                    if (clip.name === ANIM.idle) {
                        idleAction = action;
                        idleAction.play();
                    } else if (clip.name === ANIM.dance) {
                        action.play();
                    } else if (clip.name === ANIM.death) {
                        deathAction = action;
                        deathAction.loop = THREE.LoopOnce;
                        deathAction.clampWhenFinished = true;
                        deathAction.enabled = false;
                    }
                }
            }

            renderer.domElement.style.opacity = "1";
        });



        const fixFovForAspect = (baseFov: number, aspect: number) => {
            const baseAspect = 16 / 9;
            if (aspect >= baseAspect) return baseFov;
            return (2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(baseFov / 2)) * (baseAspect / aspect))) * (180 / Math.PI);
        };

        const onClick = () => {
            if (!currentIntersect) return;
            const { name } = currentIntersect;
            if (!clickableNames.includes(name)) return;

            setAboutMe(name === "sett");
            setProjects(name === "laptop");
            setAchievements(name === "cup");

            if (name === "Mesh_0010" && !hasDied) {
                hasDied = true;
                idleAction?.fadeOut(0.3);
                deathAction?.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
                if (deathAction) {
                    deathAction.enabled = true;
                    deathAction.setLoop(THREE.LoopOnce, 1);
                    deathAction.reset().fadeIn(0.2).play();
                }
                clickableNames = clickableNames.filter((n) => n !== "Mesh_0010");
                currentIntersect.visible = false;
            }
        };

        const onWheel = (e: WheelEvent) => {
            scroll.target = THREE.MathUtils.clamp(scroll.target + e.deltaY * 0.0015, 0, 1);
        };


        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") keys.down = true;
            if (e.key === "ArrowUp") keys.up = true;
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") keys.down = false;
            if (e.key === "ArrowUp") keys.up = false;
        };

        let touchStartY = 0;

        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            const deltaY = touchStartY - e.touches[0].clientY;
            scroll.target = THREE.MathUtils.clamp(scroll.target + deltaY * 0.001, 0, 1);
            touchStartY = e.touches[0].clientY;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("click", onClick);
        window.addEventListener("resize", onResize);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });

        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            mainMixer?.update(delta);
            textMixer?.update(delta);

            if (keys.down) scroll.target = THREE.MathUtils.clamp(scroll.target + 0.02, 0, 1);
            if (keys.up) scroll.target = THREE.MathUtils.clamp(scroll.target - 0.02, 0, 1);

            scroll.progress += (scroll.target - scroll.progress) * 0.08;
            const t = scroll.progress;

            if (camA && camB) {
                const basePos = new THREE.Vector3().lerpVectors(camA.position, camB.position, t);
                camera.quaternion.slerpQuaternions(camA.quaternion, camB.quaternion, t);
                camera.fov = Math.min(fixFovForAspect(THREE.MathUtils.lerp(camA.fov, camB.fov, t), window.innerWidth / window.innerHeight), 80);
                camera.updateProjectionMatrix();

                const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
                const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
                parallax.copy(right).multiplyScalar(mouse.x * 0.3).addScaledVector(up, mouse.y * 0.3);
                currentOffset.lerp(parallax, 0.1);
                camera.position.copy(basePos).add(currentOffset);
            }

            if (model) {
                raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
                const intersects = raycaster.intersectObject(model, true);
                const hit = intersects[0]?.object ?? null;
                if (hit !== currentIntersect) currentIntersect = hit;
                document.body.style.cursor = hit && clickableNames.includes(hit.name) ? "pointer" : "default";
            }

            renderer.render(scene, camera);
        };

        animate();

        // to fix a weird error
        onResize()

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);

            document.body.style.cursor = "default";
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
            <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
}