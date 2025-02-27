
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
  AFG: {
    name: "Afghanistan",
    description: "A landlocked country at the crossroads of Central and South Asia.",
    history: "Ancient civilization with a rich history spanning over 50,000 years.",
    popularPlaces: [
      {
        name: "Band-e Amir National Park",
        description: "Series of six deep blue lakes separated by natural dams."
      },
      {
        name: "Bamiyan Valley",
        description: "Historic site known for its Buddhist monuments and caves."
      }
    ],
    rankings: [
      {
        category: "Mineral Resources",
        rank: 15,
        total: 195
      },
      {
        category: "Historical Sites",
        rank: 25,
        total: 195
      }
    ]
  },
  // ... All other countries follow the same pattern
  ZWE: {
    name: "Zimbabwe",
    description: "A landlocked country in Southern Africa known for its dramatic landscapes and diverse wildlife.",
    history: "Rich history dating back to the Kingdom of Zimbabwe and Great Zimbabwe ruins.",
    popularPlaces: [
      {
        name: "Victoria Falls",
        description: "One of the world's largest waterfalls, known locally as 'The Smoke that Thunders'."
      },
      {
        name: "Great Zimbabwe",
        description: "Ancient ruins of an important trading empire."
      }
    ],
    rankings: [
      {
        category: "Natural Resources",
        rank: 28,
        total: 195
      },
      {
        category: "Wildlife Diversity",
        rank: 15,
        total: 195
      }
    ]
  }
};
