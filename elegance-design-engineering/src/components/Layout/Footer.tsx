import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-50 border-t border-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div className="col-span-1 md:col-span-2" variants={fadeInUp}>
            <motion.div 
              className="flex items-center space-x-2 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">ED</span>
              </div>
              <span className="text-xl font-light text-gray-900">雅致设计工程</span>
            </motion.div>
            <p className="text-gray-600 font-light max-w-md mb-6">
              打造精致空间，融合极简美学与实用功能，创造超越期望的设计作品。
              我们致力于将美与功能完美结合，为每一位客户打造独一无二的空间体验。
            </p>
            <motion.div 
              className="flex space-x-4"
              variants={stagger}
            >
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 group"
                    aria-label={social.label}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-normal text-gray-900 mb-6">快速链接</h3>
            <ul className="space-y-3">
              {[
                { name: '首页', path: '/' },
                { name: '关于我们', path: '/about' },
                { name: '服务项目', path: '/services' },
                { name: '作品集', path: '/portfolio' },
                { name: '联系我们', path: '/contact' }
              ].map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-300 inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-normal text-gray-900 mb-6">主要服务</h3>
            <ul className="space-y-3">
              {[
                '住宅室内设计',
                '商业空间设计',
                '建筑设计规划',
                '项目管理服务',
                '设计咨询'
              ].map((service, index) => (
                <motion.li 
                  key={service}
                  className="text-gray-600 font-light"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    whileHover={{ x: 5, color: "#111827" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="cursor-pointer"
                  >
                    {service}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200"
          variants={fadeInUp}
        >
          <h3 className="text-lg font-normal text-gray-900 mb-6">联系信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="flex items-center space-x-3 group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </motion.div>
              <span className="text-gray-600 font-light group-hover:text-gray-900 transition-colors">
                上海市黄浦区淮海中路138号
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Phone className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </motion.div>
              <span className="text-gray-600 font-light group-hover:text-gray-900 transition-colors">
                +86 138-0013-8000
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 group"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </motion.div>
              <span className="text-gray-600 font-light group-hover:text-gray-900 transition-colors">
                hello@elegancedesign.com
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={fadeInUp}
        >
          <p className="text-gray-500 font-light">
            © 2025 雅致设计工程。保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/privacy" className="text-gray-500 font-light hover:text-gray-700 transition-colors">
                隐私政策
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/terms" className="text-gray-500 font-light hover:text-gray-700 transition-colors">
                服务条款
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;