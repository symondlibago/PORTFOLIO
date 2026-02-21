import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: 'Message Sent Successfully! ✓',
      description: 'Thank you for reaching out! I\'ll get back to you soon.',
      duration: 5000,
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2B0D3E' }}>
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#7A3F91' }}>
            Please reach out! Let's discuss your project or just say hello
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#2B0D3E' }}>
                Let's Connect
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#7A3F91' }}>
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#C59DD9' }}
                >
                  <Mail className="h-6 w-6" style={{ color: '#2B0D3E' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: '#2B0D3E' }}>
                    Email
                  </h4>
                  <a
                    href="mailto:symond@example.com"
                    className="transition-colors duration-300 hover:underline"
                    style={{ color: '#7A3F91' }}
                  >
                    symond@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#C59DD9' }}
                >
                  <MapPin className="h-6 w-6" style={{ color: '#2B0D3E' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: '#2B0D3E' }}>
                    Location
                  </h4>
                  <p style={{ color: '#7A3F91' }}>Remote</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#2B0D3E' }}>
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border-2 transition-all duration-300 focus:outline-none"
                  style={{ borderColor: '#C59DD9', color: '#2B0D3E' }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#2B0D3E' }}>
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border-2 transition-all duration-300 focus:outline-none"
                  style={{ borderColor: '#C59DD9', color: '#2B0D3E' }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#2B0D3E' }}>
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please reach out!"
                  rows={6}
                  className="w-full rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none"
                  style={{ borderColor: '#C59DD9', color: '#2B0D3E' }}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#7A3F91', color: '#F2EAF7' }}
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;