
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData);
    
    toast.success("Message sent successfully", {
      description: "We'll get back to you as soon as possible."
    });
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="section-padding bg-marathon-darkBlue text-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-marathon-orange mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Have questions about the marathon or need assistance with your registration?
            Our team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-1 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-1 text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  required
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-marathon-orange hover:bg-orange-600">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl text-marathon-orange mr-4">📞</div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p className="text-gray-300">+1 (123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl text-marathon-orange mr-4">✉️</div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-gray-300">info@marathon2025.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl text-marathon-orange mr-4">📍</div>
                  <div>
                    <h4 className="font-bold">Office Address</h4>
                    <p className="text-gray-300">
                      123 Marathon Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Office Hours</h3>
              <ul className="space-y-3">
                <TimeItem day="Monday - Friday" hours="9:00 AM - 6:00 PM" />
                <TimeItem day="Saturday" hours="10:00 AM - 4:00 PM" />
                <TimeItem day="Sunday" hours="Closed" />
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-gray-300">
                  Our support team is available via email 24/7 for urgent inquiries during the event weekend.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaqItem
              question="When do registrations close?"
              answer="Registrations will close two weeks before the event date or when maximum capacity is reached, whichever comes first."
            />
            <FaqItem
              question="Is there an age limit for participants?"
              answer="Participants must be at least 16 years old for the full marathon, 14 for the half marathon, and 10 for the 5K run (with parental consent)."
            />
            <FaqItem
              question="Can I transfer my registration to someone else?"
              answer="Yes, registration transfers are allowed up until one month before the event. A small transfer fee applies."
            />
            <FaqItem
              question="What happens if the event is cancelled?"
              answer="In case of cancellation due to circumstances beyond our control, we offer partial refunds or deferral to next year's event."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimeItem = ({ day, hours }) => (
  <li className="flex justify-between">
    <span className="font-medium">{day}</span>
    <span className="text-gray-300">{hours}</span>
  </li>
);

const FaqItem = ({ question, answer }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
    <h4 className="text-lg font-bold mb-2">{question}</h4>
    <p className="text-gray-300">{answer}</p>
  </div>
);

export default ContactSection;
