import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { easeOut } from "framer-motion";

const About: React.FC = () => {
  const team = [
    {
      name: '亚历山大·斯特林',
      role: '首席设计师兼创始人',
      bio: '拥有15年高端设计经验，以无可挑剔的优雅和功能性追求，引领我们的创意远景。',
      image: '/images/serene_contemporary_luxury_bedroom_neutral_design.jpg'
    },
    {
      name: '马克斯·陈',
      role: '高级建筑师',
      bio: '马克斯为每个项目带来建筑精度，确保结构完整性与美学卓越的完美结合。',
      image: '/images/architectural_hallway_modern_lighting_design.jpg'
    },
    {
      name: '伊超贝拉·罗德里格斯',
      role: '室内设计总监',
      bio: '伊超贝拉对细节的敏锐洞察力和对可持续设计的热情，创造既美丽又环保的空间。',
      image: '/images/luxurious_modern_travertine_bathroom_spa_bathtub.jpg'
    }
  ];

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: '卓越品质',
      description: '我们始终追求在设计的每一个细节中体现卓越品质，从初步构想到最终实现。'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '客户中心',
      description: '每个项目都以客户的独特需求为中心，我们胴听、理解并超越期望。'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: '可持续设计',
      description: '我们致力于环保设计实践，选用可持续材料，为未来创造责任。'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: '热情与创意',
      description: '我们对设计的热情和不懈的创新精神，驱使我们不断推送设计边界。'
    }
  ];

  const achievements = [
    {
      year: '2023',
      title: '亚太地区最佳室内设计大奖',
      description: '获得亚太地区顶级设计奖项认可'
    },
    {
      year: '2022',
      title: '绿色设计先锋奖',
      description: '在可持续设计领域的杰出贡献'
    },
    {
      year: '2021',
      title: '国际建筑设计卓越奖',
      description: '在商业空间设计类别中获得金奖'
    }
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
            关于雅致设计
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            我们是一支由热情驱动的设计师和建筑师组成的专业团队，
            致力于通过卓越的设计和精湛的工艺，将空间转化为艺术作品。
          </motion.p>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideIn}>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
                我们的故事
              </h2>
              <p className="text-lg text-gray-600 font-light mb-6 leading-relaxed">
                雅致设计成立于2012年，始于一个简单而纯粹的信念：
                每个空间都拥有无限的可能性，等待着被发现和释放。
              </p>
              <p className="text-lg text-gray-600 font-light mb-6 leading-relaxed">
                十二年来，我们从一个小工作室成长为一支在业界备受尊敬的设计团队，
                完成了超过150个项目，涵盖住宅、商业和公共空间等多个领域。
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                我们始终相信，好的设计不仅仅是美的，更应该是功能性的、
                可持续的、并能够深入触动使用者心灵的。
              </p>

              <div className="grid grid-cols-4 gap-6 mt-12">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-light text-gray-900 mb-1">经验</div>
                  <div className="text-gray-600 font-light">12年</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-light text-gray-900 mb-1">项目</div>
                  <div className="text-gray-600 font-light">150+</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-light text-gray-900 mb-1">奖项</div>
                  <div className="text-gray-600 font-light">25+</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-light text-gray-900 mb-1">满意度</div>
                  <div className="text-gray-600 font-light">98%</div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={scaleIn}
            >
              <motion.img
                src="/images/stunning_modern_architectural_hallway_lighting.jpg"
                alt="现代建筑设计"
                className="w-full h-96 object-cover rounded-sm shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              我们的团队
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              聚集来自不同领域的专业人士，共同致力于创造非凡的设计作品。
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={stagger}
          >
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6 overflow-hidden rounded-sm">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-light mb-4">{member.role}</p>
                <p className="text-gray-600 font-light leading-relaxed text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              我们的价值理念
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              指导我们工作的核心价值观，也是我们对每一位客户的郑重承诺。
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
          >
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                className="text-center group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-700 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-lg font-normal text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Awards Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              成就与荣誉
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              我们的专业能力和创新精神得到业界的广泛认可。
            </p>
          </motion.div>

          <motion.div 
            className="space-y-8"
            variants={stagger}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.year}
                className="flex items-center space-x-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                variants={slideIn}
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-light group-hover:bg-gray-700 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {achievement.year}
                </motion.div>
                <div>
                  <h3 className="text-xl font-normal text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section 
        className="py-20 bg-gray-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-8"
            variants={fadeInUp}
          >
            设计哲学
          </motion.h2>
          <motion.p 
            className="text-xl font-light opacity-90 leading-relaxed"
            variants={fadeInUp}
          >
            “真正的设计不仅仅在于它的外观，而在于它如何与使用者的生活产生共鸣。
            我们致力于创造能够激发灵感、提升幸福感并且随着时间流逝而更加美好的空间。
            每个项目都是一场旅程，一次对美与功能性的探索。”
          </motion.p>
          <motion.div 
            className="mt-8 text-lg font-light opacity-70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            —— 亚历山大·斯特林，创始人兼首席设计师
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
