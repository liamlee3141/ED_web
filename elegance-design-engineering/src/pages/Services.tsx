import React from 'react';
import { Home, Building, Palette, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { easeOut } from "framer-motion";

const Services: React.FC = () => {
  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: '住宅室内设计',
      description: '将您的家庭打造成风格与舒适并存的理想居所，提供全面的住宅设计服务。',
      features: [
        '整屋家居改造',
        '单房间设计',
        '家具选择与搭配',
        '色彩方案设计',
        '灯光设计',
        '定制家具设计'
      ],
      image: '/images/serene_contemporary_luxury_neutral_bedroom_interior.jpg',
      price: '起始价 ￥5,000'
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: '商业空间设计',
      description: '打造激发创新的工作环境，提升生产力并传达您的品牌理念。',
      features: [
        '办公空间设计',
        '餐饱及酒店设计',
        '零售空间设计',
        '健身房设计',
        '医疗空间设计',
        '品牌识别系统'
      ],
      image: '/images/modern_elegant_restaurant_dining_room_gold_accents.jpg',
      price: '起始价 ￥12,000'
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: '建筑设计规划',
      description: '从概念设计到施工图纸，提供全面的建筑设计与规划服务。',
      features: [
        '建筑方案设计',
        '空间规划优化',
        '结构设计',
        '技术图纸绘制',
        '规范审查服务',
        '施工监理'
      ],
      image: '/images/contemporary_modern_house_exterior_clean_lines.jpg',
      price: '起始价 ￥18,000'
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: '项目管理服务',
      description: '提供全面的项目管理服务，确保您的项目按时高质量完成。',
      features: [
        '项目时间管理',
        '预算控制与管理',
        '供应商协调',
        '质量监控',
        '定期进度报告',
        '问题解决支持'
      ],
      image: '/images/modern_corporate_meeting_room_minimalist_design_wood_glass.jpg',
      price: '按项目报价'
    },
  ];

  const process = [
    {
      step: '01',
      title: '初步咨询',
      description: '深入了解您的需求、喜好与预算，制定初步设计方案。'
    },
    {
      step: '02',
      title: '概念设计',
      description: '创建设计概念，包括空间布局、风格定位及材料选择。'
    },
    {
      step: '03',
      title: '详细设计',
      description: '完善所有设计细节，包括施工图纸、材料清单及预算分解。'
    },
    {
      step: '04',
      title: '施工监理',
      description: '专业监理施工过程，确保设计意图完美呈现。'
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
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
        ease: easeOut
      }
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-light text-gray-900 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            我们的专业服务
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            从住宅设计到商业空间，从概念规划到施工监理，
            我们为您提供一站式的专业设计服务解决方案。
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-16"
            variants={stagger}
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.title} 
                className="group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    <motion.div 
                      className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-normal text-gray-900 group-hover:text-gray-700 transition-colors">
                        {service.title}
                      </h3>
                      <motion.span 
                        className="text-gray-900 font-normal text-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {service.price}
                      </motion.span>
                    </div>
                    
                    <p className="text-gray-600 font-light mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <motion.div 
                          key={feature} 
                          className="flex items-center text-sm text-gray-700 font-light"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-gray-900 rounded-full mr-3" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              我们的工作流程
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              每一个项目都遵循严格的流程管理，确保设计的专业性和效果的完美呈现。
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
          >
            {process.map((step, index) => (
              <motion.div 
                key={step.step} 
                className="text-center group cursor-pointer"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light group-hover:bg-gray-700 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-xl font-normal text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Preview */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              优秀作品展示
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              探索我们的作品集，了解我们如何将创意转化为现实。
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={stagger}
          >
            {[
              '/images/luxurious_modern_marble_spa_bathroom_design.jpg',
              '/images/luxury_contemporary_marble_kitchen_minimalist_design.jpg',
              '/images/modern_elegant_restaurant_interior_bar_dining_archway.jpg'
            ].map((image, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer"
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-80 overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <motion.img
                    src={image}
                    alt={`作品展示 ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-white text-lg font-light">查看详情</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group transform hover:scale-105"
            >
              查看全部作品
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-gray-900 mb-6"
            variants={fadeInUp}
          >
            准备开始您的项目了吗？
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 font-light mb-8"
            variants={fadeInUp}
          >
            让我们一起讨论您的设计理念，制定个性化方案，将您的想法变为现实。
          </motion.p>
          <motion.div variants={scaleIn}>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group transform hover:scale-105"
            >
              预约咨询
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
