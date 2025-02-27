export interface CountryData {
  name: string;
  description: string;
  history: string;
  geography: string;
  culture: string;
  economy: string;
  popularPlaces: Array<{
    name: string;
    description: string;
    imageUrl: string;
  }>;
  rankings: Array<{
    category: string;
    rank: number;
    total: number;
  }>;
}

export const countryData: Record<string, CountryData> = {
  USA: {
    name: "United States",
    description: "A diverse country spanning 50 states across North America, known for its cultural influence, economic power, and natural wonders.",
    history: "Founded in 1776, the United States has evolved from thirteen colonies to become one of the world's leading nations, playing pivotal roles in both World Wars and shaping global politics, technology, and culture.",
    geography: "Featuring diverse landscapes from the Rocky Mountains to the Great Plains, and from the Mississippi River to coastal regions on both the Atlantic and Pacific oceans.",
    culture: "A melting pot of cultures, the US is known for its influential entertainment industry, diverse cuisine, and sports, particularly basketball, baseball, and American football.",
    economy: "The world's largest economy, driven by innovation, technology, services, and manufacturing sectors, with major companies like Apple, Google, and Amazon.",
    popularPlaces: [
      {
        name: "Grand Canyon",
        description: "One of the world's most spectacular natural wonders, carved by the Colorado River.",
        imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
      },
      {
        name: "Statue of Liberty",
        description: "An iconic symbol of freedom and democracy in New York Harbor.",
        imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
      },
      {
        name: "Yellowstone National Park",
        description: "The first national park in the world, known for its wildlife and geothermal features.",
        imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
      },
      {
        name: "Times Square",
        description: "The bustling heart of Manhattan, famous for its bright lights and Broadway theaters.",
        imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15"
      },
      {
        name: "Golden Gate Bridge",
        description: "San Francisco's iconic suspension bridge and architectural marvel.",
        imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3"
      },
      {
        name: "Walt Disney World",
        description: "The world's most visited entertainment resort in Orlando, Florida.",
        imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"
      }
    ],
    rankings: [
      {
        category: "GDP",
        rank: 1,
        total: 195
      },
      {
        category: "Innovation",
        rank: 3,
        total: 195
      }
    ]
  },
  GBR: {
    name: "United Kingdom",
    description: "An island nation with a rich history and global influence.",
    history: "A historic monarchy that has played a significant role in world history.",
    geography: "The UK is known for its diverse landscapes, including the English countryside, the Scottish Highlands, and the English Channel.",
    culture: "The UK is known for its rich cultural heritage, including its music, literature, and art, as well as its contributions to science and technology.",
    economy: "The UK is a major global economy, with a strong financial sector and a strong service sector.",
    popularPlaces: [
      {
        name: "Big Ben",
        description: "The iconic clock tower in London.",
        imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
      },
      {
        name: "Stonehenge",
        description: "Ancient prehistoric monument in Wiltshire.",
        imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
      }
    ],
    rankings: [
      {
        category: "Education",
        rank: 5,
        total: 195
      },
      {
        category: "Finance",
        rank: 4,
        total: 195
      }
    ]
  },
  FRA: {
    name: "France",
    description: "A country known for its culture, cuisine, and art.",
    history: "From the French Revolution to modern times, France has been a cultural leader.",
    geography: "France is known for its diverse landscapes, including the French Alps, the Pyrenees, and the Mediterranean coast.",
    culture: "France is known for its rich cultural heritage, including its music, literature, and art, as well as its contributions to science and technology.",
    economy: "France is a major global economy, with a strong financial sector and a strong service sector.",
    popularPlaces: [
      {
        name: "Eiffel Tower",
        description: "The iconic symbol of Paris.",
        imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
      },
      {
        name: "Palace of Versailles",
        description: "Historic royal château and gardens.",
        imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
      }
    ],
    rankings: [
      {
        category: "Tourism",
        rank: 1,
        total: 195
      },
      {
        category: "Culture",
        rank: 4,
        total: 195
      }
    ]
  }
  // ... Additional countries would be added here with their ISO 3166-1 alpha-3 codes
};
