"use client";

import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { modal } from "../types";

export const ANIM = {
    death: "Death.002",
    idle: "Idle01",
    dance: "Dance_Base.001",
};

export const CLICKABLE = ["sett", "Mesh_0010", "laptop", "cup"];

export const hoverMessageMap = {
    sett: "About Me",
    laptop: "Projects",
    cup: "Achievements",
    Mesh_0010: "PLEASE DON'T THE CAT",
};

export const clickableToModalMap = {
    sett: modal.aboutMe,
    laptop: modal.projects,
    cup: modal.achievements,
};

type Props = {
    mountRef: RefObject<HTMLDivElement | null>;
    setSelectedModal: (value: modal | undefined) => void;
    setHoverMessage: (value: string) => void;
    setLoadingProgress: (value: number) => void;
    setIsLoading: (value: boolean) => void;
    setLoadError: (value: boolean) => void;
};

function isDesktop(): boolean {
    if (typeof window === "undefined") return false;

    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;

    return !isMobileUA && hasFinePointer && hasHover;
}

export function usePortfolioScene({
    mountRef,
    setSelectedModal,
    setHoverMessage,
    setLoadingProgress,
    setIsLoading,
    setLoadError
}: Props) {
    const frameState = useRef({
        currentIntersect: null as THREE.Object3D | null,
        lastHoverMessage: "",
        lastCursorStyle: "",
        clickableNames: [...CLICKABLE],
        hasDied: false,
    });

    const loadingThrottle = useRef(0);
    const isDesktopDevice = isDesktop();

    console.log("Is desktop:", isDesktop());

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.domElement.style.cssText = "opacity:0;transition:opacity 0.8s ease;";
        mountRef.current.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 1));

        let camA: THREE.PerspectiveCamera | null = null;
        let camB: THREE.PerspectiveCamera | null = null;
        let model: THREE.Object3D | null = null;
        let mainMixer: THREE.AnimationMixer | null = null;
        let textMixer: THREE.AnimationMixer | null = null;
        let idleAction: THREE.AnimationAction;
        let deathAction: THREE.AnimationAction;

        const scroll = { progress: 0, target: 0 };
        const mouse = { x: 0, y: 0 };
        const keys = { up: false, down: false };
        const parallax = new THREE.Vector3();
        const currentOffset = new THREE.Vector3();
        const timer = new THREE.Timer();
        const raycaster = new THREE.Raycaster();

        const loadingManager = new THREE.LoadingManager();

        loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
            const percent = Math.floor((itemsLoaded / itemsTotal) * 100);
            if (percent - loadingThrottle.current >= 5 || percent === 100) {
                loadingThrottle.current = percent;
                setLoadingProgress(percent);
            }
        };

        loadingManager.onLoad = () => {
            setIsLoading(false);
        };

        const loader = new GLTFLoader(loadingManager);
        const dracoLoader = new DRACOLoader();

        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        loader.setDRACOLoader(dracoLoader);

        loader.load("/TextComponents.glb", (gltf) => {
            scene.add(gltf.scene);
            if (gltf.animations.length) {
                textMixer = new THREE.AnimationMixer(gltf.scene);
                gltf.animations.forEach(clip => textMixer!.clipAction(clip).play());
            }
        }, undefined, (error) => {
            console.error("Error loading TextComponents.glb:", error);
            setIsLoading(false);
            setLoadError(true);
        });

        loader.load("/Experience.glb", (gltf) => {
            model = gltf.scene;
            scene.add(gltf.scene);

            const cameras = gltf.cameras as THREE.PerspectiveCamera[];
            camA = cameras.find(c => c.name === "CameraLanding") ?? cameras[0];
            camB = cameras.find(c => c.name === "CameraPortfolio") ?? cameras[1];

            if (camA) {
                camera.position.copy(camA.position);
                camera.quaternion.copy(camA.quaternion);
            }

            if (gltf.animations.length) {
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

            onResize()
        }, undefined, (error) => {
            console.error("Error loading Experience.glb:", error);
            setIsLoading(false);
            setLoadError(true);
        });;

        const fixFovForAspect = (baseFov: number, aspect: number) => {
            const baseAspect = 16 / 9;
            if (aspect >= baseAspect) return baseFov;
            return (2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(baseFov / 2)) * (baseAspect / aspect))) * (180 / Math.PI);
        };

        const onClick = () => {
            if (model && scroll.target >= 0.999) {
                rayMouse.set(mouse.x, mouse.y);
                raycaster.setFromCamera(rayMouse, camera);
                const intersects = raycaster.intersectObject(model, true);
                const hit = intersects[0]?.object ?? null;

                frameState.current.currentIntersect = hit;

                const { currentIntersect, clickableNames, hasDied } = frameState.current;

                if (!currentIntersect) return;

                const { name } = currentIntersect;
                if (!clickableNames.includes(name)) return;

                setSelectedModal(clickableToModalMap[name as keyof typeof clickableToModalMap]);

                if (name === "Mesh_0010" && !hasDied) {
                    frameState.current.hasDied = true;
                    idleAction?.fadeOut(0.3);
                    deathAction?.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
                    if (deathAction) {
                        deathAction.enabled = true;
                        deathAction.setLoop(THREE.LoopOnce, 1);
                        deathAction.reset().fadeIn(0.2).play();
                    }
                    frameState.current.clickableNames = frameState.current.clickableNames.filter(n => n !== "Mesh_0010");
                    if (currentIntersect) currentIntersect.visible = false;
                }
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
            e.preventDefault();
            const deltaY = touchStartY - e.touches[0].clientY;
            scroll.target = THREE.MathUtils.clamp(scroll.target + deltaY * 0.001, 0, 1);
            touchStartY = e.touches[0].clientY;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const onResize = () => {
            const aspect = window.innerWidth / window.innerHeight;
            if (camA && camB) {
                camera.fov = Math.min(fixFovForAspect(camA.fov, aspect), 80);
            }
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("click", onClick);
        window.addEventListener("resize", onResize);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });

        let prevHoverMessage = "";
        let prevCursorStyle = "";

        const basePos = new THREE.Vector3();
        const right = new THREE.Vector3();
        const up = new THREE.Vector3();
        const rayMouse = new THREE.Vector2();

        let rafId: number;

        let lastRaycastTime = 0;
        const RAYCAST_INTERVAL_MS = 50;

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            timer.update();
            const delta = timer.getDelta();

            mainMixer?.update(delta);
            textMixer?.update(delta);

            if (keys.down) scroll.target = THREE.MathUtils.clamp(scroll.target + 0.02, 0, 1);
            if (keys.up) scroll.target = THREE.MathUtils.clamp(scroll.target - 0.02, 0, 1);

            scroll.progress += (scroll.target - scroll.progress) * 0.08;
            const t = scroll.progress;

            if (camA && camB) {
                basePos.lerpVectors(camA.position, camB.position, t);
                camera.quaternion.slerpQuaternions(camA.quaternion, camB.quaternion, t);

                right.setFromMatrixColumn(camera.matrix, 0);
                up.setFromMatrixColumn(camera.matrix, 1);

                parallax.copy(right).multiplyScalar(mouse.x * 0.3).addScaledVector(up, mouse.y * 0.3);
                currentOffset.lerp(parallax, 0.1);
                camera.position.copy(basePos).add(currentOffset);
            }

            const now = performance.now();

            if (now - lastRaycastTime >= RAYCAST_INTERVAL_MS && isDesktopDevice) {
                lastRaycastTime = now;
                if (model && scroll.target >= 0.999) {
                    rayMouse.set(mouse.x, mouse.y);
                    raycaster.setFromCamera(rayMouse, camera);
                    const intersects = raycaster.intersectObject(model, true);
                    const hit = intersects[0]?.object ?? null;

                    frameState.current.currentIntersect = hit;

                    const hitName = hit?.name || "";
                    const isClickable = frameState.current.clickableNames.includes(hitName);
                    const cursor = isClickable ? "pointer" : "default";
                    const message = isClickable ? hoverMessageMap[hitName as keyof typeof hoverMessageMap] || "" : "";

                    if (message !== prevHoverMessage) {
                        prevHoverMessage = message;
                        setHoverMessage(message);
                    }
                    if (cursor !== prevCursorStyle) {
                        prevCursorStyle = cursor;
                        document.body.style.cursor = cursor;
                    }
                } else {
                    if (prevHoverMessage !== "") {
                        prevHoverMessage = "";
                        setHoverMessage("");
                    }
                    if (prevCursorStyle !== "default") {
                        prevCursorStyle = "default";
                        document.body.style.cursor = "default";
                    }
                    frameState.current.currentIntersect = null;
                }
            }

            renderer.render(scene, camera);
        };

        animate();

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

            renderer.dispose();

            if (mainMixer) mainMixer.stopAllAction();
            if (textMixer) textMixer.stopAllAction();

            dracoLoader.dispose();

            scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                    const mesh = obj as THREE.Mesh;
                    if (mesh.geometry) mesh.geometry.dispose();
                    if (mesh.material) {
                        if (Array.isArray(mesh.material)) {
                            mesh.material.forEach(m => m.dispose());
                        } else {
                            mesh.material.dispose();
                        }
                    }
                }
            });

            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            cancelAnimationFrame(rafId);
        };
    }, [mountRef, setSelectedModal, setHoverMessage, setLoadingProgress, setIsLoading]);
}