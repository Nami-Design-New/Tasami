// import { Accordion, AccordionBody } from "react-bootstrap";
// import ChartCard from "../cards/ChartCard";
// import InterestsLoading from "../../loading/InterestsLoading";
// import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
// import useGetCities from "../../../hooks/countries/useGetCities";
// import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";

// export default function OperatingSectrsList() {
//   const { regions, isLoading } = useGetRegions();
//   const { countries, isCountriesLoading } = useGetCountries();
//   const { cities, isCitiesLoading } = useGetCities();
//   return (
//     <ChartCard title={"قطاعات التشغيل"}>
//       {" "}
//       <div className="area-of-interest">
//         <Accordion defaultActiveKey="0">
//           {isLoading ? (
//             <div>
//               {Array.from({ length: 3 }, (_, i) => (
//                 <InterestsLoading key={i} />
//               ))}
//             </div>
//           ) : (
//             // Real Accordion Content
//             regions.map((category, index) => (
//               <Accordion.Item eventKey={index} key={category.id}>
//                 <Accordion.Header>
//                   <span>{category.title}</span>
//                   <span className="arrow-icon">
//                     <i className="fa-solid fa-angle-left"></i>
//                   </span>
//                 </Accordion.Header>
//                 <AccordionBody>
//                   <div className="tag-list">
//                     {countries.map((country) => (
//                       <div key={country.id}>{country?.title} </div>
//                     ))}
//                   </div>
//                 </AccordionBody>
//               </Accordion.Item>
//             ))
//           )}
//         </Accordion>
//       </div>
//     </ChartCard>
//   );
// }
import { Accordion, AccordionBody } from "react-bootstrap";
import ChartCard from "../cards/ChartCard";
import InterestsLoading from "../../loading/InterestsLoading";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import { useState } from "react";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import InfiniteScroll from "../../loading/InfiniteScroll";

export default function OperatingSectrsList() {
  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions();

  // Track which region/country is open
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  // Fetch countries only when region is opened
  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries(
    activeRegion,
    "off" // DO NOT fetch until manually triggered
  );

  // Fetch cities only when country is opened
  const {
    cities,
    isCitiesLaoding,
    fetchCitiesNextPage,
    hasCitiesNextPage,
    isFetchingCitiesNextPage,
  } = useGetCities(activeCountry, "off");

  // ============ Handlers ============
  const handleRegionToggle = (regionId) => {
    if (activeRegion === regionId) {
      setActiveRegion(null);
      return;
    }

    setActiveRegion(regionId);
    // fetchCountries(); // Load countries for this region
  };

  const handleCountryToggle = (countryId) => {
    if (activeCountry === countryId) {
      setActiveCountry(null);
      return;
    }

    setActiveCountry(countryId);
    // fetchCities(); // Load cities for this country
  };

  return (
    <ChartCard title={"قطاعات التشغيل"}>
      <div className="area-of-interest">
        <Accordion>
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {regions?.map((region, regionIndex) => (
              <Accordion.Item eventKey={regionIndex} key={region?.id}>
                <Accordion.Header
                  onClick={() => handleRegionToggle(region?.id)}
                >
                  <span>{region.title}</span>
                  <span className="arrow-icon">
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                </Accordion.Header>

                <AccordionBody>
                  {activeRegion !== region.id ? (
                    <p className="text-muted"></p>
                  ) : isCountriesLaoding ? (
                    <InterestsLoading />
                  ) : (
                    <Accordion className="nested-accordion">
                      {countries?.length ? (
                        countries.map((country, countryIndex) => (
                          <Accordion.Item
                            eventKey={`country-${countryIndex}`}
                            key={country.id}
                          >
                            <Accordion.Header
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent outer accordion toggle
                                handleCountryToggle(country.id);
                              }}
                            >
                              <span>{country.title}</span>
                              <span className="arrow-icon">
                                <i className="fa-solid fa-angle-left"></i>
                              </span>
                            </Accordion.Header>

                            <AccordionBody>
                              {activeCountry !== country.id ? (
                                <p className="text-muted"></p>
                              ) : isCitiesLaoding ? (
                                <InterestsLoading />
                              ) : (
                                <div className="tag-list  d-flex flex-column gap-3">
                                  {cities?.length ? (
                                    cities.map((city) => (
                                      <div key={city.id} className="tag-item">
                                        {city.title}
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-muted">
                                      لا توجد مدن متاحة.
                                    </p>
                                  )}
                                </div>
                              )}
                            </AccordionBody>
                          </Accordion.Item>
                        ))
                      ) : (
                        <p className="text-muted">لا توجد قطاعات.</p>
                      )}
                    </Accordion>
                  )}
                </AccordionBody>
              </Accordion.Item>
            ))}
          </InfiniteScroll>
        </Accordion>{" "}
        {(isLoading || isFetchingNextPage) && (
          <div>
            {Array.from({ length: 3 }, (_, i) => (
              <InterestsLoading key={i} />
            ))}
          </div>
        )}
      </div>
    </ChartCard>
  );
}
