
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import mapboxgl from 'mapbox-gl';

interface Suggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

interface SearchPanelProps {
  onLocationSelect: (center: [number, number]) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onLocationSelect }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddressInput = async (value: string) => {
    setAddress(value);
    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${mapboxgl.accessToken}&limit=5&types=address&country=US`
      );
      const data = await response.json();
      setSuggestions(data.features);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    setAddress(suggestion.place_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setLoading(true);

    try {
      onLocationSelect(suggestion.center);
      toast.success('Location found!');
    } catch (error) {
      console.error('Error searching address:', error);
      toast.error('Error finding location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-10">
      <div className="bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg animate-fade-in max-w-3xl w-full mx-auto border border-gray-100">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt="Company Logo"
            className="h-8 md:h-10 w-auto"
          />
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => handleAddressInput(e.target.value)}
                className="pl-10 h-10 md:h-11 text-sm md:text-base border-gray-200 font-jakarta font-normal"
                style={{ fontSize: '16px' }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm font-jakarta"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.place_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button 
              onClick={() => suggestions.length && handleSuggestionClick(suggestions[0])}
              disabled={loading || !suggestions.length}
              variant="default"
              size="default"
              className="bg-brand-primary hover:bg-brand-primary/90 transition-colors text-white font-jakarta"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
