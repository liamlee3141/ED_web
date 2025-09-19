import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ContactFormData } from '../types';
import { motion } from 'framer-motion';

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    '住宅室内设计',
    '商业空间设计',
    '建筑设计规划',
    '项目管理服务',
    '仅需咨询',
    '其他'
  ];

  const budgetRanges = [
    '25,000元以下',
    '25,000 - 50,000元',
    '50,000 - 100,000元',
    '100,000 - 250,000元',
    '250,000 - 500,000元',
    '500,000元以上'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '姓名为必填项';
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱为必填项';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入正确的邮箱格式';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '联系电话为必填项';
    }

    if (!formData.projectType) {
      newErrors.projectType = '请选择项目类型';
    }

    if (!formData.budgetRange) {
      newErrors.budgetRange = '请选择预算范围';
    }

    if (!formData.message.trim()) {
      newErrors.message = '请简述您的需求';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([formData]);
      
      if (error) throw error;
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budgetRange: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: '提交失败，请稍后再试' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
        staggerChildren: 0.1
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

  if (isSubmitted) {
    return (
      <motion.div 
        className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="max-w-md mx-auto px-4 text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-light text-gray-900 mb-4">谢谢您的信任！</h2>
          <p className="text-gray-600 font-light mb-8">
            我们已收到您的咨询信息，将在24小时内与您取得联系。
            期待与您合作，共同打造理想空间。
          </p>
          <motion.button
            onClick={() => {
              setIsSubmitted(false);
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            返回首页
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

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
            联系我们
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            无论您有什么设计想法或问题，我们都很乐意与您沟通。
            请填写以下表格，我们将尽快与您取得联系。
          </motion.p>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 
                className="text-2xl font-normal text-gray-900 mb-8"
                variants={fadeInUp}
              >
                项目咨询表单
              </motion.h2>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={stagger}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                      邮箱地址 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                      placeholder="请输入您的邮箱地址"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </motion.div>
                </div>
                
                <motion.div variants={fadeInUp}>
                  <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
                    联系电话 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    placeholder="请输入您的联系电话"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="projectType" className="block text-sm font-light text-gray-700 mb-2">
                      项目类型 *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">请选择项目类型</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>}
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <label htmlFor="budgetRange" className="block text-sm font-light text-gray-700 mb-2">
                      预算范围 *
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">请选择预算范围</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    {errors.budgetRange && <p className="mt-1 text-sm text-red-600">{errors.budgetRange}</p>}
                  </motion.div>
                </div>
                
                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-2">
                    项目描述 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                    placeholder="请详细描述您的项目需求、风格喜好及其他重要信息..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </motion.div>
                
                {errors.submit && (
                  <motion.p 
                    className="text-red-600 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.submit}
                  </motion.p>
                )}
                
                <motion.div variants={fadeInUp}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        提交中...
                      </>
                    ) : (
                      <>
                        提交咨询
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 
                className="text-2xl font-normal text-gray-900 mb-8"
                variants={fadeInUp}
              >
                联系方式
              </motion.h2>
              
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start space-x-4 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Mail className="h-6 w-6 text-gray-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-1">邮箱</h3>
                    <p className="text-gray-600 font-light">hello@elegancedesign.com</p>
                    <p className="text-gray-600 font-light">info@elegancedesign.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Phone className="h-6 w-6 text-gray-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-1">电话</h3>
                    <p className="text-gray-600 font-light">+86 138-0013-8000</p>
                    <p className="text-gray-600 font-light">+86 400-888-9999</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MapPin className="h-6 w-6 text-gray-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-1">地址</h3>
                    <p className="text-gray-600 font-light">
                      中国上海市黄浦区<br />
                      淮海中路138号<br />
                      雅致设计大厦 28楼
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="h-6 w-6 text-gray-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-normal text-gray-900 mb-1">工作时间</h3>
                    <p className="text-gray-600 font-light">
                      周一至周五: 9:00 AM - 7:00 PM<br />
                      周六: 10:00 AM - 4:00 PM<br />
                      周日: 预约可约
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="mt-12 p-6 bg-gray-50"
                variants={scaleIn}
              >
                <h3 className="text-lg font-normal text-gray-900 mb-4">预约咨询</h3>
                <p className="text-gray-600 font-light mb-4">
                  更倾向于面对面沟通？我们可为您提供
                  工作室或上门的免费咨询服务。
                </p>
                <motion.a
                  href="tel:+8613800138000"
                  className="inline-flex items-center text-gray-900 font-light hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  立即预约咨询
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;