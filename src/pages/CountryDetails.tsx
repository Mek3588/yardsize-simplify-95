import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CountryData {
  name: string;
  description: string;
  history: string;
  popularPlaces: Array<{
    name: string;
    description: string;
  }>;
  rankings: Array<{
    category: string;
    rank: number;
    total: number;
  }>;
}

// This would typically come from an API, but for now we'll use dummy data
const countryData: Record<string, CountryData> = {
  USA: {
    name: "United States of America",
    description: "The United States of America is a diverse country spanning 50 states across North America.",
    history: "Founded in 1776, the United States declared independence from Great Britain and has since become one of the world's leading nations.",
    popularPlaces: [
      {
        name: "Grand Canyon",
        description: "One of the world's most spectacular natural wonders, carved by the Colorado River."
      },
      {
        name: "Statue of Liberty",
        description: "An iconic symbol of freedom and democracy in New York Harbor."
      }
    ],
    rankings: [
      {
        category: "GDP",
        rank: 1,
        total: 195
      },
      {
        category: "Education",
        rank: 6,
        total: 195
      }
    ]
  },
  UK: {
    name: "United Kingdom",
    description: "The United Kingdom is a sovereign country located off the northwestern coast of continental Europe.",
    history: "With a history stretching back over a thousand years, the UK has been a major influence on global culture, commerce, and politics.",
    popularPlaces: [
      {
        name: "Big Ben",
        description: "The iconic clock tower at the north end of the Houses of Parliament in London."
      },
      {
        name: "Stonehenge",
        description: "A prehistoric monument in Wiltshire, England, consisting of a ring of standing stones."
      }
    ],
    rankings: [
      {
        category: "GDP",
        rank: 6,
        total: 195
      },
      {
        category: "Education",
        rank: 5,
        total: 195
      }
    ]
  },
  FRA: {
    name: "France",
    description: "France is a country in Western Europe known for its rich culture, history, and influence on global arts and sciences.",
    history: "From the French Revolution to modern times, France has been at the forefront of European history and culture.",
    popularPlaces: [
      {
        name: "Eiffel Tower",
        description: "The iconic iron lattice tower on the Champ de Mars in Paris."
      },
      {
        name: "Palace of Versailles",
        description: "The principal royal residence of France from 1682 until the start of the French Revolution."
      }
    ],
    rankings: [
      {
        category: "GDP",
        rank: 7,
        total: 195
      },
      {
        category: "Tourism",
        rank: 1,
        total: 195
      }
    ]
  },
  GER: {
    name: "Germany",
    description: "Germany is a country in Central Europe known for its rich history, technological innovations, and economic strength.",
    history: "Modern Germany was formed in 1871, and has since become Europe's largest economy and a leader in many industrial sectors.",
    popularPlaces: [
      {
        name: "Brandenburg Gate",
        description: "An 18th-century neoclassical monument in Berlin, one of the most well-known landmarks of Germany."
      },
      {
        name: "Neuschwanstein Castle",
        description: "A 19th-century Romanesque Revival palace set in the Bavarian Alps."
      }
    ],
    rankings: [
      {
        category: "GDP",
        rank: 4,
        total: 195
      },
      {
        category: "Manufacturing",
        rank: 3,
        total: 195
      }
    ]
  }
};

const CountryDetails = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const country = countryData[countryCode || ''] || null;

  if (!country) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Map
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Country not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Map
      </Button>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{country.name}</h1>
          <p className="text-gray-600">{country.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">History</h2>
          <p className="text-gray-600">{country.history}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Popular Places</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {country.popularPlaces.map((place, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <p className="text-gray-600">{place.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Global Rankings</h2>
          <div className="space-y-4">
            {country.rankings.map((ranking, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow">
                <h3 className="text-lg font-semibold mb-2">{ranking.category}</h3>
                <p className="text-gray-600">
                  Ranked #{ranking.rank} out of {ranking.total} countries
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
