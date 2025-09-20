import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, CheckCircle } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';

import { easeOut } from "framer-motion";

const Home: React.FC = () => {
  // Background image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    {
      src: '/images/white-architecture.jpg',
      alt: '现代几何建筑设计'
    },
    {
      src: '/images/spiral-building-modern.jpg', 
      alt: '动态曲线玻璃钢结构建筑'
    },
    {
      src: '/images/concrete-spiral-stairs.jpg',
      alt: '六边形螺旋楼梯设计'
    }
  ];

  // Rotate background images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const stats = [
    { number: '150+', label: '已完成项目' },
    { number: '12', label: '年设计经验' },
    { number: '98%', label: '客户满意度' },
    { number: '25+', label: '设计奖项' },
  ];

  const services = [
    {
      title: '室内设计',
      description: '打造独特精致的室内空间，提升您的日常生活品质体验。',
      image: '/images/modern_minimalist_living_room_natural_light_contemporary.jpg'
    },
    {
      title: '建筑规划',
      description: '从概念到完成的全方位建筑解决方案。',
      image: '/images/contemporary_modern_residential_exterior_clean_lines.jpg'
    },
    {
      title: '商业设计',
      description: '专业的商业空间设计，提升品牌形象与客户体验。',
      image: '/images/modern_corporate_meeting_room_minimalist_design_wood_glass.jpg'
    },
  ];

  const features = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '屡获殊荣的设计',
      description: '我们的作品在国际设计大赛中屡获殊荣，彰显卓越品质。'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: '专业设计团队',
      description: '经验丰富的设计师团队，为您提供个性化专业服务。'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '准时交付',
      description: '严格按照项目时间节点推进，确保按时高质量交付。'
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Multiple background images with fade transitions */}
          {backgroundImages.map((image, index) => (
            <motion.img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: index === currentImageIndex ? 1 : 0
              }}
              transition={{ 
                duration: index === 0 ? 2 : 1.5, 
                ease: "easeOut" 
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1 
            className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <span className="block font-extralight">雅致设计</span>
            <span className="block text-3xl md:text-4xl mt-4 opacity-90 font-light tracking-wide">创造非凡空间</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-light mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            我们专注于打造既美观又实用的设计空间，
            将您的生活理念转化为现实的艺术作品。
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-all duration-300 group transform hover:scale-105 tracking-wide"
            >
              查看作品集
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 group transform hover:scale-105 tracking-wide"
            >
              免费咨询
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} className="text-center" variants={fadeInUp}>
                <motion.div 
                  className="text-4xl md:text-5xl font-light text-gray-900 mb-2 tracking-tight"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
              我们的专业服务
            </h2>
            <p className="text-lg text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed tracking-wide">
              从概念设计到施工完成，我们为您提供全方位的专业设计服务，
              打造独一无二的空间体验。
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.title} 
                className="group cursor-pointer"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 font-normal leading-relaxed tracking-wide">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-300 group transform hover:scale-105 tracking-wide"
            >
              查看所有服务
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
              为什么选择我们
            </h2>
            <p className="text-lg text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed tracking-wide">
              十二年专业设计经验，为每一位客户提供独特而卓越的设计服务。
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                className="text-center group"
                variants={slideIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-gray-700 transition-colors tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-normal leading-relaxed tracking-wide">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gray-900 text-white overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-6 tracking-tight"
            variants={fadeInUp}
          >
            准备好改变您的空间了吗？
          </motion.h2>
          <motion.p 
            className="text-xl font-normal mb-8 opacity-90 leading-relaxed tracking-wide"
            variants={fadeInUp}
          >
            让我们一起讨论您的设计理念，创造非凡的空间体验。
          </motion.p>
          <motion.div
            variants={scaleIn}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-all duration-300 group transform hover:scale-105 tracking-wide"
            >
              立即开始
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
