// File: src/pages/ContactPage.jsx
// Simple contact/feedback form that posts to /explain placeholder or sends to configured email (demo only).
import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [ok, setOk] = useState(null);

  function handleChange(e) { const {name,value} = e.target; setForm(f => ({...f,[name]:value})); }

  async function handleSubmit(e) {
    e.preventDefault();
    // This is a placeholder. In production you'd POST to your support backend or send an email.
    setOk("Thanks! Your message was submitted (demo).");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="page" aria-labelledby="contact-heading">
      <h1 id="contact-heading">Contact / Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="label">Name</label>
          <input className="input" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="label">Email</label>
          <input className="input" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="label">Message</label>
          <textarea className="input" name="message" rows="4" value={form.message} onChange={handleChange} />
        </div>
        <div>
          <button className="button" type="submit">Send</button>
        </div>
      </form>
      {ok && <div style={{marginTop:12}} className="small">{ok}</div>}
    </section>
  );
}
