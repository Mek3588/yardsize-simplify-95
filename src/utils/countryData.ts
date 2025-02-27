
export interface CountryData {
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

export const countryData: Record<string, CountryData> = {
  USA: {
    name: "United States",
    description: "A diverse country spanning 50 states across North America.",
    history: "Founded in 1776, the United States has become one of the world's leading nations.",
    popularPlaces: [
      {
        name: "Grand Canyon",
        description: "One of the world's most spectacular natural wonders."
      },
      {
        name: "Statue of Liberty",
        description: "An iconic symbol of freedom and democracy."
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
    popularPlaces: [
      {
        name: "Big Ben",
        description: "The iconic clock tower in London."
      },
      {
        name: "Stonehenge",
        description: "Ancient prehistoric monument in Wiltshire."
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
    popularPlaces: [
      {
        name: "Eiffel Tower",
        description: "The iconic symbol of Paris."
      },
      {
        name: "Palace of Versailles",
        description: "Historic royal château and gardens."
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
