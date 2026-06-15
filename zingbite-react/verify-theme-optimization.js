#!/usr/bin/env node

/**
 * Theme Optimization Verification Script
 * 
 * This script verifies that the theme optimizations have been implemented correctly
 * and that the visual appearance remains consistent.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

function checkFileExists(filePath) {
  const fullPath = path.join(ROOT_DIR, filePath);
  return fs.existsSync(fullPath);
}

function readFile(filePath) {
  const fullPath = path.join(ROOT_DIR, filePath);
  return fs.readFileSync(fullPath, 'utf8');
}

function verifyColorScheme() {
  console.log('\n🔍 Checking Color Scheme Preservation...');
  
  const indexCss = readFile('src/index.css');
  
  const requiredColors = [
    '--brand-red: #F7374F',
    '--brand-red-hover: #e02f43',
    '--bg-main: #ffffff',
    '--text-primary: #1c1c1c',
    '--success: #60b246',
    '--danger: #e23744'
  ];
  
  const missingColors = [];
  requiredColors.forEach(color => {
    if (!indexCss.includes(color)) {
      missingColors.push(color);
    }
  });
  
  if (missingColors.length === 0) {
    console.log('✅ All original color schemes preserved');
    return true;
  } else {
    console.log('❌ Missing color schemes:', missingColors.join(', '));
    return false;
  }
}

function verifyCSSFeatures() {
  console.log('\n🔍 Checking CSS Modern Features...');
  
  const indexCss = readFile('src/index.css');
  const features = [
    { name: 'CSS Cascade Layers', pattern: '@layer' },
    { name: 'Container Queries', pattern: '@container' },
    { name: 'CSS Containment', pattern: 'contain: layout' },
    { name: 'Transform-based Animations', pattern: 'transform: translateZ(0)' },
    { name: 'GPU Acceleration', pattern: 'will-change' },
    { name: 'Reduced Motion Support', pattern: '@media (prefers-reduced-motion' }
  ];
  
  const missingFeatures = [];
  features.forEach(feature => {
    if (!indexCss.includes(feature.pattern)) {
      missingFeatures.push(feature.name);
    }
  });
  
  if (missingFeatures.length === 0) {
    console.log('✅ All modern CSS features implemented');
    return true;
  } else {
    console.log('❌ Missing CSS features:', missingFeatures.join(', '));
    return false;
  }
}

function verifyAnimationOptimization() {
  console.log('\n🔍 Checking Animation Optimizations...');
  
  const indexCss = readFile('src/index.css');
  
  const optimizations = [
    { name: 'Transform-based animations', pattern: 'transform: translateY(' },
    { name: 'GPU acceleration', pattern: 'transform: translateZ(0)' },
    { name: 'Optimized hover states', pattern: '.premium-hover:hover' },
    { name: 'Staggered animations', pattern: '.stagger-children' },
    { name: 'Reduced motion support', pattern: '@media (prefers-reduced-motion' }
  ];
  
  const missingOptimizations = [];
  optimizations.forEach(opt => {
    if (!indexCss.includes(opt.pattern)) {
      missingOptimizations.push(opt.name);
    }
  });
  
  if (missingOptimizations.length === 0) {
    console.log('✅ All animation optimizations implemented');
    return true;
  } else {
    console.log('❌ Missing optimizations:', missingOptimizations.join(', '));
    return false;
  }
}

function verifyCodeOrganization() {
  console.log('\n🔍 Checking Code Organization...');
  
  const files = [
    'src/index.css',
    'src/styles/dashboard-shared.css',
    'src/App.jsx',
    'src/components/ProtectedRoute.jsx'
  ];
  
  const missingFiles = [];
  files.forEach(file => {
    if (!checkFileExists(file)) {
      missingFiles.push(file);
    }
  });
  
  if (missingFiles.length === 0) {
    console.log('✅ All required files present');
    return true;
  } else {
    console.log('❌ Missing files:', missingFiles.join(', '));
    return false;
  }
}

function verifyDocumentation() {
  console.log('\n🔍 Checking Documentation...');
  
  const docFiles = [
    'THEME_OPTIMIZATION_REPORT.md'
  ];
  
  const missingDocs = [];
  docFiles.forEach(doc => {
    if (!checkFileExists(doc)) {
      missingDocs.push(doc);
    }
  });
  
  if (missingDocs.length === 0) {
    console.log('✅ All documentation files present');
    return true;
  } else {
    console.log('❌ Missing documentation:', missingDocs.join(', '));
    return false;
  }
}

function main() {
  console.log('🚀 Starting Theme Optimization Verification...');
  
  const checks = [
    verifyColorScheme,
    verifyCSSFeatures,
    verifyAnimationOptimization,
    verifyCodeOrganization,
    verifyDocumentation
  ];
  
  const results = checks.map(check => check());
  const passed = results.filter(result => result === true).length;
  const total = results.length;
  
  console.log('\n📊 Verification Summary');
  console.log('=====================');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All verifications passed! Theme optimization complete.');
    return 0;
  } else {
    console.log('\n⚠️  Some verifications failed. Please review the issues above.');
    return 1;
  }
}

if (import.meta.url === import.meta.url) {
  process.exit(main());
}

export { main, verifyColorScheme, verifyCSSFeatures, verifyAnimationOptimization };
