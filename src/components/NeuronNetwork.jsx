import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function NeuronNetwork() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 180;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Particles config
    const particleCount = 80;
    const maxDistance = 60;
    const particles = [];
    
    const positions = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();
    
    // Colors based on theme — orange particles, green lines
    const particleColor = theme === 'dark' ? 0xF97316 : 0xEA6C00;
    const lineColor    = theme === 'dark' ? 0x22C55E : 0x16A34A;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 100;
      
      particles.push({
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.2
        )
      });
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Particles material — orange
    const particleMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: 3.5,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });
    
    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(pointCloud);
    
    // Lines — green
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: theme === 'dark' ? 0.18 : 0.25
    });
    
    // Interaction
    const mouse = new THREE.Vector3(0, 0, -1000);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;
      
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      raycaster.ray.intersectPlane(plane, mouse);
    };
    
    const onMouseLeave = () => {
      mouse.set(0, 0, -1000);
    };
    
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    
    // Animation loop
    let animationFrameId;
    
    // Line geometry will be updated dynamically
    let lineGeometry = new THREE.BufferGeometry();
    let lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const posAttr = pointCloud.geometry.attributes.position;
      const linePositions = [];
      
      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        // Move
        p.pos.add(p.vel);
        
        // Boundary check
        if (Math.abs(p.pos.x) > 170) p.vel.x *= -1;
        if (Math.abs(p.pos.y) > 110) p.vel.y *= -1;
        if (Math.abs(p.pos.z) > 80) p.vel.z *= -1;
        
        // Mouse interaction (push away)
        const distToMouse = p.pos.distanceTo(mouse);
        if (distToMouse < 45) {
          const dir = new THREE.Vector3().subVectors(p.pos, mouse).normalize();
          const force = (45 - distToMouse) * 0.08;
          p.pos.addScaledVector(dir, force);
        }
        
        // Update geometry attribute
        posAttr.setXYZ(i, p.pos.x, p.pos.y, p.pos.z);
      }
      
      posAttr.needsUpdate = true;
      
      // Compute connections
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dist = particles[i].pos.distanceTo(particles[j].pos);
          if (dist < maxDistance) {
            linePositions.push(
              particles[i].pos.x, particles[i].pos.y, particles[i].pos.z,
              particles[j].pos.x, particles[j].pos.y, particles[j].pos.z
            );
          }
        }
      }
      
      // Re-create lines buffer
      scene.remove(lineSegments);
      lineGeometry.dispose();
      
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      
      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      
      // Dispose resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]); // Re-run if theme changes to update node colors
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-40 md:opacity-60"
    />
  );
}
