
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { countryData } from '../utils/countryData';
import { toast } from 'sonner';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const country = countryData[countryCode || ''];

  if (!country) {
    React.useEffect(() => {
      toast.error("Country not found");
      navigate('/');
    }, []);
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Map
        </Button>
        
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header Section */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{country.name}</h1>
              <p className="text-gray-600">{country.description}</p>
            </div>

            {/* History Section */}
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{country.history}</p>
              </CardContent>
            </Card>

            {/* Geography Section */}
            <Card>
              <CardHeader>
                <CardTitle>Geography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{country.geography}</p>
              </CardContent>
            </Card>

            {/* Culture Section */}
            <Card>
              <CardHeader>
                <CardTitle>Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{country.culture}</p>
              </CardContent>
            </Card>

            {/* Economy Section */}
            <Card>
              <CardHeader>
                <CardTitle>Economy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{country.economy}</p>
              </CardContent>
            </Card>

            {/* Rankings Section */}
            <Card>
              <CardHeader>
                <CardTitle>Global Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {country.rankings.map((ranking, index) => (
                    <div key={index} className="bg-muted rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">{ranking.category}</h3>
                      <p className="text-gray-600">
                        Ranked #{ranking.rank} out of {ranking.total} countries
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Places Section */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Places to Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {country.popularPlaces.map((place, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-border">
                      <div className="relative h-48">
                        <img
                          src={place.imageUrl}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {place.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-4">{place.description}</p>
                        <Button className="w-full">
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CountryDetails;

