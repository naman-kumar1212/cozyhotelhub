
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Your message has been sent successfully!");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team using any of the methods below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                <Phone size={20} />
              </div>
              <h3 className="font-medium mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2">For immediate assistance</p>
              <a href="tel:+1234567890" className="text-hotel-800 font-medium hover:underline">
                +1 (234) 567-890
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                <Mail size={20} />
              </div>
              <h3 className="font-medium mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">We'll respond within 24 hours</p>
              <a href="mailto:info@cozyhotelhub.com" className="text-hotel-800 font-medium hover:underline">
                info@cozyhotelhub.com
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-hotel-100 flex items-center justify-center text-hotel-800 mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-2">Our main headquarters</p>
              <p className="text-hotel-800 font-medium">
                123 Hospitality Ave, San Francisco, CA 94103
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send Us a Message
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="general" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                General Inquiry
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="reservation" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Reservation
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="feedback" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Feedback
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="support" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Support
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?"
                            className="resize-none min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <div className="bg-white rounded-xl p-6 border border-hotel-100 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      question: "What are the check-in and check-out times?",
                      answer: "Check-in time is at 3:00 PM and check-out time is at 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability."
                    },
                    {
                      question: "Is there a cancellation fee?",
                      answer: "Cancellation policies vary depending on the rate and dates of your reservation. Please refer to your confirmation email for specific details regarding your booking."
                    },
                    {
                      question: "Do you offer airport transportation?",
                      answer: "Yes, we provide airport shuttle services for our guests. Please contact our concierge at least 24 hours in advance to arrange transportation."
                    }
                  ].map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-medium mb-1">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-hotel-50 rounded-xl p-6 border border-hotel-100">
                <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Front Desk:</span>
                    <span>24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Concierge:</span>
                    <span>7:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Restaurant:</span>
                    <span>6:30 AM - 10:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Spa & Wellness:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Business Center:</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
