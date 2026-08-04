import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Reveal, RevealLines } from './Reveal';

const FIELD =
  'w-full border-b border-line bg-transparent py-4 text-base text-ink placeholder:text-subtle/70 ' +
  'transition-colors focus:border-ink focus:outline-none disabled:opacity-60';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'd9a17273-d253-42e7-a156-decc699f0766',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
        toast({
          title: 'Message sent',
          description: "Thanks for reaching out — I'll get back to you soon.",
          duration: 5000,
        });
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitted(false);
        }, 4000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Could not send',
        description: 'Something went wrong. Please try again, or email me directly.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealLines
              as="h2"
              text={'Have\nsomething\nin mind?'}
              className="font-display text-[13vw] font-bold uppercase leading-[0.88] tracking-tight text-ink sm:text-[10vw] lg:text-[4.8vw]"
            />
            <Reveal delay={0.2} className="mt-8 space-y-6">
              <p className="max-w-sm text-base leading-relaxed text-subtle md:text-lg">
                Open to freelance work and full-time roles. Tell me what you are building
                and I will tell you honestly whether I am the right fit.
              </p>
              <div className="space-y-1">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">
                  Email
                </p>
                <a
                  href="mailto:libago.symond1@gmail.com"
                  className="inline-block border-b border-ink pb-0.5 text-lg text-ink transition-opacity hover:opacity-60 md:text-xl"
                >
                  libago.symond1@gmail.com
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-start justify-center border border-line px-8">
                <CheckCircle2 className="mb-5 h-10 w-10 text-brand" />
                <h3 className="font-display text-3xl font-semibold uppercase text-ink">Thank you</h3>
                <p className="mt-2 text-subtle">Your message is in. I&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">
                      Name
                    </label>
                    <input
                      id="name" name="name" required value={formData.name}
                      onChange={handleChange} placeholder="Your name"
                      className={FIELD} disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">
                      Email
                    </label>
                    <input
                      id="email" name="email" type="email" required value={formData.email}
                      onChange={handleChange} placeholder="you@example.com"
                      className={FIELD} disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-subtle">
                    Message
                  </label>
                  <textarea
                    id="message" name="message" required rows={5} value={formData.message}
                    onChange={handleChange} placeholder="What are you working on?"
                    className={`${FIELD} resize-none`} disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 bg-ink px-10 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-surface transition-colors hover:bg-brand disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? 'Sending' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
