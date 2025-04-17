
import React, { useState } from 'react';
import { categories } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ReportFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  images: FileList | null;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    images: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      images: files
    });

    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to report an issue.",
        variant: "destructive"
      });
      return;
    }

    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      images: null
    });
    setImagePreview(null);
    setOpen(false);
    
    toast({
      title: "Issue Reported",
      description: "Your issue has been successfully submitted!",
    });
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use a reverse geocoding service to get the address
          // For now, just use the coordinates
          setFormData({
            ...formData,
            location: `Lat: ${position.coords.latitude.toFixed(6)}, Lng: ${position.coords.longitude.toFixed(6)}`
          });
          
          toast({
            title: "Location Detected",
            description: "Your current location has been added to the form.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Please enter location manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-fixit-primary hover:bg-fixit-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Report an Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-fixit-primary text-xl">Report a New Issue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Brief title describing the issue"
              className="input-field mt-1"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              placeholder="Detailed description of the issue..."
              className="input-field mt-1"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="input-field mt-1"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Address or location description"
                className="input-field flex-grow"
                value={formData.location}
                onChange={handleChange}
              />
              <Button 
                type="button" 
                variant="outline"
                className="ml-2 whitespace-nowrap" 
                onClick={handleLocationDetect}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Detect
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images (Optional)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              className="input-field mt-1"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full max-h-40 object-cover rounded-md" 
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-fixit-primary hover:bg-fixit-secondary"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;
