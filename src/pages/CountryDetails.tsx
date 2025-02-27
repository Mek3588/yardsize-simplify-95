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
  },
  ESP: {
    name: "Spain",
    description: "Spain is a country on Europe's Iberian Peninsula known for its rich culture, diverse landscapes, and historical significance.",
    history: "From ancient Roman times through the Golden Age of exploration and to modern day, Spain has been a crucial player in world history.",
    popularPlaces: [
      {
        name: "Sagrada Familia",
        description: "Antoni Gaudí's unfinished masterpiece in Barcelona, a stunning example of modernist architecture."
      },
      {
        name: "Alhambra",
        description: "A palace and fortress complex in Granada, showcasing stunning Islamic architecture."
      }
    ],
    rankings: [
      {
        category: "Tourism",
        rank: 2,
        total: 195
      },
      {
        category: "Life Expectancy",
        rank: 4,
        total: 195
      }
    ]
  },
  ITA: {
    name: "Italy",
    description: "Italy is a Southern European country known for its art, architecture, food, and cultural heritage.",
    history: "The birthplace of the Roman Empire and the Renaissance, Italy has profoundly influenced Western civilization.",
    popularPlaces: [
      {
        name: "Colosseum",
        description: "Ancient amphitheater in Rome, symbol of the Roman Empire."
      },
      {
        name: "Venice Canals",
        description: "Historic waterways that serve as the city's main transportation arteries."
      }
    ],
    rankings: [
      {
        category: "Cultural Heritage Sites",
        rank: 1,
        total: 195
      },
      {
        category: "Cuisine",
        rank: 1,
        total: 195
      }
    ]
  },
  RUS: {
    name: "Russia",
    description: "Russia is the world's largest country, spanning Eastern Europe and Northern Asia.",
    history: "From the times of Imperial Russia through the Soviet era to the present day, Russia has been a major world power.",
    popularPlaces: [
      {
        name: "Red Square",
        description: "Moscow's central square, home to the Kremlin and St. Basil's Cathedral."
      },
      {
        name: "Hermitage Museum",
        description: "One of the world's largest art museums, located in St. Petersburg."
      }
    ],
    rankings: [
      {
        category: "Natural Resources",
        rank: 1,
        total: 195
      },
      {
        category: "Territory Size",
        rank: 1,
        total: 195
      }
    ]
  },
  CHN: {
    name: "China",
    description: "China is the world's most populous country with a history spanning thousands of years.",
    history: "One of the world's oldest civilizations, China has been a leader in arts, sciences, and technology throughout history.",
    popularPlaces: [
      {
        name: "Great Wall",
        description: "Ancient defensive wall spanning thousands of miles across northern China."
      },
      {
        name: "Forbidden City",
        description: "Imperial palace complex in Beijing, home to Chinese emperors for 500 years."
      }
    ],
    rankings: [
      {
        category: "Population",
        rank: 1,
        total: 195
      },
      {
        category: "Economy Size",
        rank: 2,
        total: 195
      }
    ]
  },
  JPN: {
    name: "Japan",
    description: "Japan is an island nation in East Asia known for blending ancient traditions with cutting-edge technology.",
    history: "From feudal shogunates to modern economic power, Japan has maintained its unique cultural identity while embracing innovation.",
    popularPlaces: [
      {
        name: "Mount Fuji",
        description: "Japan's highest mountain and an iconic symbol of the country."
      },
      {
        name: "Fushimi Inari Shrine",
        description: "Famous shrine in Kyoto known for its thousands of torii gates."
      }
    ],
    rankings: [
      {
        category: "Technology",
        rank: 3,
        total: 195
      },
      {
        category: "Life Expectancy",
        rank: 2,
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
