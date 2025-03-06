
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const EventInformationPage = () => {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventType || !guestCount || !name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your request has been submitted successfully!");
      setIsSubmitting(false);
      navigate("/events");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative h-[30vh] md:h-[40vh] bg-gradient-to-r from-hotel-800 to-hotel-950 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Event venue" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Request Event Information</h1>
            <p className="text-white/90 text-lg">
              Fill out the form below to get more information about hosting your event with us
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Event Details</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type <span className="text-red-500">*</span></Label>
                      <Select value={eventType} onValueChange={setEventType} required>
                        <SelectTrigger id="eventType">
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="corporate">Corporate Meeting</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="social">Social Gathering</SelectItem>
                          <SelectItem value="birthday">Birthday Party</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="guestCount">Approximate Number of Guests <span className="text-red-500">*</span></Label>
                      <Select value={guestCount} onValueChange={setGuestCount} required>
                        <SelectTrigger id="guestCount">
                          <SelectValue placeholder="Select guest count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-20">1-20</SelectItem>
                          <SelectItem value="21-50">21-50</SelectItem>
                          <SelectItem value="51-100">51-100</SelectItem>
                          <SelectItem value="101-200">101-200</SelectItem>
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="500+">500+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Preferred Venue (Optional)</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ballroom" />
                          <label htmlFor="ballroom" className="text-sm cursor-pointer">Ballroom</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="garden" />
                          <label htmlFor="garden" className="text-sm cursor-pointer">Garden</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="beachfront" />
                          <label htmlFor="beachfront" className="text-sm cursor-pointer">Beachfront</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="conferenceRoom" />
                          <label htmlFor="conferenceRoom" className="text-sm cursor-pointer">Conference Room</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Required Services (Optional)</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="catering" />
                          <label htmlFor="catering" className="text-sm cursor-pointer">Catering</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="decoration" />
                          <label htmlFor="decoration" className="text-sm cursor-pointer">Decoration</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="audioVisual" />
                          <label htmlFor="audioVisual" className="text-sm cursor-pointer">Audio/Visual</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="photography" />
                          <label htmlFor="photography" className="text-sm cursor-pointer">Photography</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="name" 
                          placeholder="Your full name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                        <Input 
                          id="phone" 
                          placeholder="Your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information (Optional)</Label>
                      <textarea 
                        id="message" 
                        className="w-full border rounded-md p-2 min-h-[100px]"
                        placeholder="Tell us more about your event, including any special requirements or questions you might have."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" required />
                    <label htmlFor="privacy" className="text-sm cursor-pointer">
                      I agree to the <a href="#" className="text-hotel-600 hover:underline">privacy policy</a> and consent to being contacted about my request.
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventInformationPage;
