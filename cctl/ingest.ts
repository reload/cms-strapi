import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const contentTypesUpload = [
  "/media/photo1.jpeg",
  "/media/photo2.jpeg",
  "/media/photo3.jpeg",
  "/media/photo4.jpeg",
  "/media/photo5.jpeg",
  "/media/photo6.jpeg",
];

const contentTypesTypes = ["bolig", "erhverv", "kultur", "skole"];
const contentTypesDistricts = [
  "nørrebro",
  "vesterbro",
  "østerbro",
  "valby",
  "frederiksberg",
  "sydhavn",
  "nordhavn",
  "indreby",
  "amager",
];
const contentTypesGeolocation = [
  [55.67594, 12.56553],
  [55.37594, 12.36553],
  [55.07594, 12.86553],
  [55.17594, 12.11553],
  [55.99594, 12.76553],
  [55.23594, 12.19553],
];
const contentTypesSites = [
  {
    Title: "Our urban living room",
    ShortDescription:
      "On 14 October 2016 the Danish Architecture Center (DAC) opened an exhibition about the Danish architectural practice, Cobe.",
    Description:
      "The exhibition at DAC involved a completely unique concept. In addition to visiting the exhibition, visitors could also visit Cobe and enjoy a close-up experience of some of the buildings they have designed located within walking distance of DAC.",
  },
  {
    Title: "Dreyer’s Architecture Gallery",
    ShortDescription:
      "This exhibition offered a unique peek into the day-to-day reality of three young architectural firms",
    Description:
      "In this exhibition, The Dreyer Foundation and the Danish Architecture Center (DAC) collaborated to create a new exhibition space at DAC. It presented the next wave of Danish architecture, described and disseminated by a number of talented, trend-setting young Danish architectural firms.",
  },
  {
    Title: "Life in China’s giant cities",
    ShortDescription:
      "Visitors could join in on an eye opening journey across China and learn just how big the contrasts between the giant cities of China and the everyday life of their citizens on street level are.",
    Description:
      "In China, large cities are built in a heartbeat and already existing keeps growing to extents, which are nearly impossible to comprehend. The Chinese government just declared that Beijing will soon grow to merge together with two other cities to one giant city with the unbelievable number of 130 million citizens. And this is just one example. As the urbanization and urban development evolves, so does the air pollution – which leads to public health consequences.",
  },
  {
    Title: "Summer exhibition: Let’s play",
    ShortDescription:
      "“Let’s play”, the summer exhibition of 2016, was about how we can use urban space as a place for sport and movement.",
    Description:
      "In summer 2016 the Danish Architecture Center and the plaza in front of the building was converted into a summer, “movement destination”. Outside, in a temporary arena we invited everyone who feels inclined to try their hand at totally new forms of movement. Meanwhile, inside we opened a major exhibition, which explores the subject of movement in the city.",
  },
  {
    Title: "Update - making the city smart",
    ShortDescription:
      "Over the past 10-15 years the Internet and social media have radically transformed our lives.",
    Description:
      "“Update” was the first major exhibition in Denmark to look at Smart City Technologies, which, in the years to come, may significantly change the way, in which our towns and cities operate.",
  },
];
const contentTypesGuides = [
  {
    Name: "Capital of Cool: Copenhagen’s Best New Architecture",
    Header:
      "Explore some of Copenhagen’s most innovative contemporary buildings by the rock stars of Danish architecture. ",
  },
  {
    Name: "A Walk Through Time: Copenhagen’s Architecture",
    Header:
      "Explore some of Copenhagen’s most iconic historic and contemporary architectural landmarks.",
  },
  {
    Name: "BLOX: Danish Architecture Center’s home",
    Header: "A 21st century multi-use “city within the city.",
  },
  {
    Name: "Harbor Architecture",
    Header:
      "Discover Copenhagen’s beautiful harbor transformation on the city’s only architecture cruise.",
  },
  {
    Name: "Exhibition galleries group tour",
    Header:
      "Everyday life in Denmark is worth celebrating because it’s actually quite special.",
  },
];
const contentTypesEvents = [
  {
    header: "Backstage",
    description:
      "Discover the tools that Danish architects, designers and urban planners use to shape the world around us.",
    date: new Date().toISOString(),
  },
  {
    header: "Hello Denmark",
    description:
      "We pay tribute to Danish architecture and design and dive into the myths behind what that has made Denmark and Copenhagen popular throughout the world: the good everyday life.",
    date: new Date().toISOString(),
  },
  {
    header: "SAS Royal Hotel",
    description:
      "The SAS Royal Hotel – now the Radisson Collection Royal Hotel – is one of Arne Jacobsen’s most iconic buildings. The hotel, which in 2020 can celebrate its 60th anniversary, became Denmark’s first skyscraper.",
    date: new Date().toISOString(),
  },
];

/**
 * -----------------------------------------------------------
 */

async function createEntry(
  collectionTypeUrl: string,
  payload: any,
  headers?: any
) {
  try {
    const config = {
      prod: {
        url: "https://www.api.main-bvxea6i-uh4apdzsvuly4.eu-5.platformsh.site",
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0NjA2NTQ1LCJleHAiOjE2MTcxOTg1NDV9.oUaLCf2aT-oihe8S01oF2bWQpKe7dS_B8GHEZWU9Ggk",
      },
      dev: {
        url: "http://localhost:1337",
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0NjA3NjM3LCJleHAiOjE2MTcxOTk2Mzd9.w1mMwH04zxo_mi3upGf1pt0mSszXCqreSWWJ5LLbEjU",
      },
    };

    return axios
      .post(`${config.dev.url}${collectionTypeUrl}`, payload, {
        headers: {
          Authorization: config.dev.token,
          ...headers,
        },
      })
      .then((res) => res.data);
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

/**
 * -----------------------------------------------------------
 */

async function ingestEntries() {
  const mapPickIds = (entries: any[]) => {
    return entries.map((res: { id: number }) => res.id);
  };

  const pickRandomItem = (list: any[]) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  /**
   * Media content types
   */
  const idsMedia = await Promise.all(
    contentTypesUpload.map((c) => {
      const form = new FormData();
      form.append("files", fs.createReadStream(__dirname + c), {
        knownLength: fs.statSync(__dirname + c).size,
      });
      return createEntry("/upload", form, {
        ...form.getHeaders(),
        "Content-Length": form.getLengthSync(),
      });
    })
  ).then((res) => mapPickIds(res.flat()));
  console.log("idsMedia ", idsMedia);

  /**
   * 'Types' content types
   */
  const idsTypes = await Promise.all(
    contentTypesTypes.map((c) =>
      createEntry("/types", {
        Name: c,
      })
    )
  ).then(mapPickIds);
  console.log("idsTypes ", idsTypes);

  /**
   * District content types
   */
  const idsDistrict = await Promise.all(
    contentTypesDistricts.map((c) =>
      createEntry("/districts", {
        Name: c,
      })
    )
  ).then(mapPickIds);
  console.log("idsDistrict ", idsDistrict);

  /**
   * Geolocation content types
   */
  const idsGeolocation = await Promise.all(
    contentTypesGeolocation.map((c) => {
      const [Latitude, Longitude] = c;
      return createEntry("/geolocations", {
        Latitude,
        Longitude,
      });
    })
  ).then(mapPickIds);
  console.log("idsGeolocation ", idsGeolocation);

  /**
   * Sites content types
   */
  const idsSites = await Promise.all(
    contentTypesSites.map((c) =>
      createEntry("/sites", {
        ...c,
        geolocation: [pickRandomItem(idsGeolocation)],
        type: [pickRandomItem(idsTypes)],
        district: [idsDistrict],
        Gallery: [pickRandomItem(idsMedia)],
      })
    )
  ).then(mapPickIds);
  console.log("idsSites ", idsSites);

  /**
   * Guides content types
   */
  const idsGuides = await Promise.all(
    contentTypesGuides.map((c) =>
      createEntry("/guides", {
        ...c,
        geolocation: [pickRandomItem(idsGeolocation)],
        Sites: [0],
      })
    )
  ).then(mapPickIds);
  console.log("idsGuides ", idsGuides);

  /**
   * Events content types
   */
  const idsEvents = await Promise.all(
    contentTypesEvents.map((c) =>
      createEntry("/events", {
        ...c,
        img: [pickRandomItem(idsMedia)],
      })
    )
  ).then(mapPickIds);
  console.log("idsEvents ", idsEvents);
}

ingestEntries();
