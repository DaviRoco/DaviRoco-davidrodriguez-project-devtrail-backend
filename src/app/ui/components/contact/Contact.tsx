'use client';
import React, { useRef } from 'react';
import './contact.css';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_bo7iv3i',
          'template_5covz5b',
          form.current,
          'tbu7V4DUsZCQeu8xe',
        )
        .then(() => {
          (e.target as HTMLFormElement).reset();
        });
    }
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="section-title">Get in touch</h2>
      <span className="section-subtitle">Contact Me</span>

      <div className="contact-container container grid">
        <div className="contact-content">
          <h3 className="contact-title">Talk to me</h3>

          <div className="contact-info">
            <div className="contact-card">
              <i className="bx bx-mail-send contact-card-icon"></i>

              <h3 className="contact-card-title">Email</h3>
              <div className="contact-card-data">david@rodriguezcoto.com</div>
              <br />
              <a
                href="mailto:david@rodriguezcoto.com"
                className="contact-button"
              >
                Write me
                <i className="bx bx-right-arrow-alt contact-button-icon"></i>
              </a>
            </div>
            <div className="contact-card">
              <i className="bx bxl-whatsapp contact-card-icon"></i>

              <h3 className="contact-card-title">Whatsapp</h3>
              <div className="contact-card-data">+506-7289-6071</div>
              <br />
              <a
                href="https://wa.me/+50672896071"
                target="_blank"
                className="contact-button"
              >
                Write me
                <i className="bx bx-right-arrow-alt contact-button-icon"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-content">
          <h3 className="contact-title"></h3>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="contact-form-div">
              <label className="contact-form-tag">Name</label>
              <input
                type="text"
                name="name"
                className="contact-form-input"
                placeholder="Insert your name"
              />
            </div>

            <div className="contact-form-div">
              <label className="contact-form-tag">Mail</label>
              <input
                type="email"
                name="email"
                className="contact-form-input"
                placeholder="Insert your email"
              />
            </div>

            <div className="contact-form-div contact-form-area">
              <label className="contact-form-tag">Message</label>
              <textarea
                name="message"
                cols={30}
                rows={10}
                placeholder="Write your message here..."
                className="contact-form-input"
              ></textarea>
            </div>
            <button className="button button--flex">
              Send Message
              <svg
                className="button-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
                  stroke="#292D32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.34"
                  d="M10.1094 13.6501L13.6894 10.0601"
                  stroke="#292D32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
