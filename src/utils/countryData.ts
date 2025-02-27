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
  },
  DEU: {
    name: "Germany",
    description: "A country in Central Europe known for its rich history, technological innovation, and cultural contributions.",
    history: "From medieval times through reunification in 1990, Germany has been central to European history, arts, and science.",
    geography: "Features diverse landscapes from the North Sea and Baltic coasts to the Bavarian Alps in the south.",
    culture: "Known for its contributions to classical music, philosophy, art, and science, as well as its festivals like Oktoberfest.",
    economy: "Europe's largest economy, known for engineering, automotive industry, and technological innovation.",
    popularPlaces: [
      {
        name: "Brandenburg Gate",
        description: "An iconic 18th-century neoclassical monument in Berlin.",
        imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b"
      },
      {
        name: "Neuschwanstein Castle",
        description: "A 19th-century Romanesque Revival palace in Bavaria.",
        imageUrl: "https://images.unsplash.com/photo-1511282491208-11da5975b739"
      },
      {
        name: "Cologne Cathedral",
        description: "A UNESCO World Heritage site and masterpiece of Gothic architecture.",
        imageUrl: "https://images.unsplash.com/photo-1478294226485-0c274d3d2468"
      },
      {
        name: "Black Forest",
        description: "A mountainous region known for its dense forests and picturesque villages.",
        imageUrl: "https://images.unsplash.com/photo-1501429106030-84c53d53c8de"
      },
      {
        name: "East Side Gallery",
        description: "The longest remaining section of the Berlin Wall, covered in artwork.",
        imageUrl: "https://images.unsplash.com/photo-1477285339322-17881f6d1e8c"
      },
      {
        name: "Rothenburg ob der Tauber",
        description: "A well-preserved medieval town in Bavaria.",
        imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b"
      }
    ],
    rankings: [
      {
        category: "GDP",
        rank: 4,
        total: 195
      },
      {
        category: "Innovation",
        rank: 4,
        total: 195
      }
    ]
  },
  JPN: {
    name: "Japan",
    description: "An island nation in East Asia known for its unique blend of traditional culture and modern technology.",
    history: "Rich history spanning ancient imperial dynasties to modern technological leadership.",
    geography: "An archipelago of 6,852 islands, with four main islands featuring mountains and volcanic regions.",
    culture: "Renowned for its unique cultural traditions, including tea ceremonies, martial arts, and anime.",
    economy: "One of the world's largest economies, known for technological innovation and manufacturing.",
    popularPlaces: [
      {
        name: "Mount Fuji",
        description: "Japan's highest mountain and most iconic natural landmark.",
        imageUrl: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65"
      },
      {
        name: "Fushimi Inari Shrine",
        description: "Famous for its thousands of vermillion torii gates.",
        imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1538f3f1"
      },
      {
        name: "Tokyo Skytree",
        description: "The world's tallest tower and a symbol of modern Japan.",
        imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26"
      },
      {
        name: "Arashiyama Bamboo Grove",
        description: "A stunning bamboo forest in Kyoto.",
        imageUrl: "https://images.unsplash.com/photo-1463822646420-805d11467e31"
      },
      {
        name: "Senso-ji Temple",
        description: "Tokyo's oldest Buddhist temple.",
        imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd"
      },
      {
        name: "Shibuya Crossing",
        description: "The world's busiest pedestrian crossing.",
        imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26"
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
  },
  IND: {
    name: "India",
    description: "A diverse country in South Asia known for its rich cultural heritage, ancient civilizations, and modern achievements.",
    history: "One of the world's oldest civilizations with a rich history spanning over 5,000 years.",
    geography: "Features diverse landscapes from the Himalayas to tropical beaches, and deserts to rainforests.",
    culture: "Known for its diverse languages, religions, cuisine, arts, and architecture.",
    economy: "One of the world's fastest-growing major economies, with strengths in IT, pharmaceuticals, and services.",
    popularPlaces: [
      {
        name: "Taj Mahal",
        description: "An iconic marble mausoleum and UNESCO World Heritage site.",
        imageUrl: "https://images.unsplash.com/photo-1506462945848-ac8ea6f609cc"
      },
      {
        name: "Jaipur City Palace",
        description: "A spectacular complex of courtyards, gardens, and buildings.",
        imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245"
      },
      {
        name: "Varanasi Ghats",
        description: "Ancient riverside steps along the sacred Ganges River.",
        imageUrl: "https://images.unsplash.com/photo-1491497895121-3b6c89c7d1f0"
      },
      {
        name: "Kerala Backwaters",
        description: "A network of lagoons, lakes, and canals parallel to the Arabian Sea coast.",
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944"
      },
      {
        name: "Golden Temple",
        description: "The holiest shrine of Sikhism in Amritsar.",
        imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ff907"
      },
      {
        name: "Amber Fort",
        description: "A majestic fort-palace complex built from red sandstone and marble.",
        imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245"
      }
    ],
    rankings: [
      {
        category: "Population",
        rank: 2,
        total: 195
      },
      {
        category: "IT Services",
        rank: 1,
        total: 195
      }
    ]
  }
  // ... Continue with other countries following the same pattern
};
