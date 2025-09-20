import React, { useState } from 'react';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { easeOut } from "framer-motion";

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '住宅', '商业', '酒店', '建筑外观'];

  const projects = [
    {
      id: 1,
      title: '现代阁楼生活空间',
      category: '住宅',
      location: '上海徐汇区',
      year: '2024',
      description: '精致的阁楼设计，线条简洁、天然材质，享有全景城市景观。',
      image: '/images/modern_minimalist_living_room_natural_light_contemporary.jpg',
      featured: true
    },
    {
      id: 2,
      title: '豪华厨房设计',
      category: '住宅',
      location: '北京朝阳区',
      year: '2024',
      description: '现代风格厨房，配备大理石台面和极简主义橱柜。',
      image: '/images/luxury_contemporary_marble_kitchen_minimalist_design.jpg',
      featured: false
    },
    {
      id: 3,
      title: '精品酒店大堂',
      category: '酒店',
      location: '深圳南山区',
      year: '2023',
      description: '高端酒店大堂设计，融合现代元素与传统工艺。',
      image: '/images/modern_elegant_restaurant_dining_room_gold_accents.jpg',
      featured: true
    },
    {
      id: 4,
      title: '豪华浴室空间',
      category: '住宅',
      location: '成都高新区',
      year: '2023',
      description: '先进的浴室设计，采用天然石材和现代化设备。',
      image: '/images/luxurious_modern_marble_spa_bathroom_design.jpg',
      featured: false
    },
    {
      id: 5,
      title: '企业总部大楼',
      category: '商业',
      location: '广州珠江新城',
      year: '2023',
      description: '现代企业办公空间，强调协作与创新。',
      image: '/images/modern_corporate_meeting_room_minimalist_design_wood_glass.jpg',
      featured: false
    },
    {
      id: 6,
      title: '餐厅设计项目',
      category: '商业',
      location: '杭州西湖区',
      year: '2022',
      description: '高端餐厅室内设计，营造温馨而优雅的用餐环境。',
      image: '/images/modern_elegant_restaurant_interior_bar_dining_archway.jpg',
      featured: true
    },
    {
      id: 7,
      title: '现代住宅外观',
      category: '建筑外观',
      location: '苏州工业园区',
      year: '2022',
      description: '简洁现代的住宅建筑外观设计，线条清晰美观。',
      image: '/images/contemporary_modern_residential_exterior_clean_lines.jpg',
      featured: false
    },
    {
      id: 8,
      title: '建筑内部走廊',
      category: '商业',
      location: '南京鼓楼区',
      year: '2022',
      description: '现代建筑内部走廊，采用创新的LED照明设计。',
      image: '/images/architectural_hallway_modern_lighting_design.jpg',
      featured: false
    }
  ];

  const filteredProjects = selectedCategory === '全部' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
        staggerChildren: 0.15
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

  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-light text-gray-900 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            作品集
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            探索我们的精选作品集，从住宅设计到商业空间，
            每个项目都体现了我们对卓越设计的执着追求。
          </motion.p>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section 
        className="py-12 border-b border-gray-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={stagger}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 font-light transition-all duration-300 relative overflow-hidden ${
                  selectedCategory === category
                    ? 'text-white bg-gray-900'
                    : 'text-gray-600 bg-white border border-gray-300 hover:text-gray-900 hover:border-gray-900'
                }`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gray-900"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={`${selectedCategory}-${project.id}`}
                  className={`group cursor-pointer ${
                    project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className={`relative overflow-hidden ${
                      project.featured ? 'h-96' : 'h-64'
                    }`}>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />
                      
                      {/* Project Info Overlay */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                          <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.location}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {project.year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div 
                          className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-light"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          精选作品
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-normal text-gray-900 group-hover:text-gray-700 transition-colors">
                          {project.title}
                        </h3>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 45 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.year}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 font-light leading-relaxed">
                        {project.description}
                      </p>
                      
                      <motion.div 
                        className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-light"
                        whileHover={{ backgroundColor: "#374151", color: "white" }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.category}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              数据说话
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              我们的成就不仅体现在作品的美感上，更体现在客户的信任与满意中。
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={stagger}
          >
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                150+
              </motion.div>
              <div className="text-gray-600 font-light">完成项目</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                98%
              </motion.div>
              <div className="text-gray-600 font-light">客户满意度</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                25+
              </motion.div>
              <div className="text-gray-600 font-light">设计奖项</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                12
              </motion.div>
              <div className="text-gray-600 font-light">年专业经验</div>
            </motion.div>
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
            被我们的作品启发了吗？
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 font-light mb-8"
            variants={fadeInUp}
          >
            让我们一起创造非凡的作品。联系我们，讨论您的项目吧。
          </motion.p>
          <motion.div variants={scaleIn}>
            <motion.a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              开启您的项目
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio;
