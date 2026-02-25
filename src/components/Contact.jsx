import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
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

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Using the Web3Forms endpoint as per your functional example
    const ENDPOINT = "https://api.web3forms.com/submit";

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d9a17273-d253-42e7-a156-decc699f0766", // Your current access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        toast({
          title: 'Message Sent Successfully! ✓',
          description: 'Thank you for reaching out! I\'ll get back to you soon.',
          duration: 5000,
        });

        // Reset form after a delay
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setSubmitted(false);
        }, 4000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: 'Error Sending Message',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono" style={{ color: '#2B0D3E' }}>
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-mono" style={{ color: '#7A3F91' }}>
            Please reach out! Let's discuss your project or just say hello
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 font-mono" style={{ color: '#2B0D3E' }}>
                Let's Connect
              </h3>
              <p className="text-lg leading-relaxed font-mono" style={{ color: '#7A3F91' }}>
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C59DD9' }}>
                  <Mail className="h-6 w-6" style={{ color: '#2B0D3E' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 font-mono" style={{ color: '#2B0D3E' }}>Email</h4>
                  <a href="mailto:libago.symond1@gmail.com" className="transition-colors duration-300 hover:underline font-mono" style={{ color: '#7A3F91' }}>
                    libago.symond1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C59DD9' }}>
                  <MapPin className="h-6 w-6" style={{ color: '#2B0D3E' }} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 font-mono" style={{ color: '#2B0D3E' }}>Location</h4>
                  <p className="font-mono" style={{ color: '#7A3F91' }}>Remote</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-[#F2EAF7] rounded-2xl p-8 border-2 border-[#C59DD9]">
                <CheckCircle2 className="w-16 h-16 text-[#7A3F91] mb-4" />
                <h3 className="text-2xl font-bold" style={{ color: '#2B0D3E' }}>Thank You!</h3>
                <p className="text-center mt-2 font-mono" style={{ color: '#7A3F91' }}>
                  Your message has been sent. I'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 font-mono" style={{ color: '#2B0D3E' }}>Name</label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border-2 transition-all duration-300 font-mono"
                    style={{ borderColor: '#C59DD9', color: '#2B0D3E' }}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 font-mono" style={{ color: '#2B0D3E' }}>Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border-2 transition-all duration-300 font-mono"
                    style={{ borderColor: '#C59DD9', color: '#2B0D3E' }}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 font-mono" style={{ color: '#2B0D3E' }}>Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please reach out!"
                    rows={6}
                    className="w-full rounded-lg border-2 transition-all duration-300 resize-none font-mono"
                    style={{ borderColor: '#C59DD9', color: '#2B0D3E' }}
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-70 font-mono cursor-pointer"
                  style={{ backgroundColor: '#7A3F91', color: '#F2EAF7' }}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;