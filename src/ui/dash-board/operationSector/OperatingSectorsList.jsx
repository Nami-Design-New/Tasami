import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Accordion, AccordionBody } from "react-bootstrap";
import { toast } from "sonner";
import useDeleteCity from "../../../hooks/dashboard/cities/useDeleteCity";
import useDeleteCountry from "../../../hooks/dashboard/countries/useDeleteCountry";
import useDeleteRegion from "../../../hooks/dashboard/regions/useDeleteRegion";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import InfiniteScroll from "../../loading/InfiniteScroll";
import InterestsLoading from "../../loading/InterestsLoading";
import ConfirmDeleteModal from "../../modals/ConfirmationDeleteModal";
import ChartCard from "../cards/ChartCard";
import EditCityModal from "./EditCityModal";
import EditCountryModal from "./EditCountryModal";
import EditRegionModal from "./EditRegionModal";
import { useTranslation } from "react-i18next";

export default function OperatingSectorsList() {
  const queryClient = new QueryClient();
  const { t } = useTranslation();
  // -------------------- Avtice States -------------------------
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  //  ------------------------- Regions Modal Stats -------------------------------------
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showEditRegionModal, setShowEditRegionModal] = useState(false);
  const [showDeleteRegionModal, setShowDeleteRegionModal] = useState(false);

  //  ------------------------- Regions Hooks -------------------------------------
  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions();

  const { deleteRegion, isDeletingRegion } = useDeleteRegion();

  const handleDeleteRegion = () => {
    deleteRegion(selectedRegion.id, {
      onSuccess: () => {
        setShowDeleteRegionModal(false);
        setSelectedRegion(null);
        queryClient.refetchQueries({ queryKey: ["dashboard-regions"] });
      },
    });
  };

  //  ------------------------- Countries Modal Stats -------------------------------------
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [showEditCountryModal, setShowEditCountryModal] = useState(false);
  const [showDeleteCountryModal, setShowDeleteCountryModal] = useState(false);

  //  ------------------------- Countries Hooks -------------------------------------
  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries(activeRegion, "off");

  const { deleteCountry, isDeletingCountry } = useDeleteCountry();

  const handleDeleteCountry = () => {
    deleteCountry(selectedCountry?.id, {
      onSuccess: (res) => {
        toast.success(res.message);
        setShowDeleteCountryModal(false);
        setSelectedCountry(null);
        queryClient.refetchQueries({ queryKey: ["dashboard-countries"] });
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  //  ------------------------- City Modal Stats -------------------------------------
  const [selectedCity, setSelectedCity] = useState(null);
  const [showEditCityModal, setShowEditCityModal] = useState(false);
  const [showDeleteCityModal, setShowDeleteCityModal] = useState(false);

  //  ------------------------- Cities Hooks -------------------------------------
  const {
    cities,
    isCitiesLaoding,
    fetchCitiesNextPage,
    hasCitiesNextPage,
    isFetchingCitiesNextPage,
  } = useGetCities(activeCountry, "off");

  const { deleteCity, isDeletingCity } = useDeleteCity();

  const handleDeleteCity = () => {
    deleteCity(selectedCity.id, {
      onSuccess: (res) => {
        toast.success(res.message);
        setShowDeleteCityModal(false);
        setSelectedCity(null);
        queryClient.refetchQueries({ queryKey: ["dashboard-cities"] });
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  // ============ Handlers ============
  const handleRegionToggle = (regionId) => {
    if (activeRegion === regionId) {
      setActiveRegion(null);
      return;
    }

    setActiveRegion(regionId);
  };

  const handleCountryToggle = (countryId) => {
    if (activeCountry === countryId) {
      setActiveCountry(null);
      return;
    }

    setActiveCountry(countryId);
  };

  return (
    <ChartCard title={t("dashboard.operatingRegions.operatingSectorsTitle")}>
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
                  <div className="d-flex gap-3">
                    <button
                      className="edit-icon-style"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditRegionModal(true);
                        setSelectedRegion(region);
                      }}
                    >
                      <i className="fa-regular fa-edit"></i>
                    </button>
                    <button
                      className="delete-icon-style"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteRegionModal(true);
                        setSelectedRegion(region);
                      }}
                    >
                      <i className="fa-regular fa-trash"></i>
                    </button>

                    <span className="border px-2 rounded-2">
                      {region?.code}
                    </span>
                    <div className="arrow-icon">
                      <i className="fa-solid fa-angle-left"></i>
                    </div>
                  </div>
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
                            className="nested-accordion-item"
                          >
                            <Accordion.Header
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCountryToggle(country.id);
                              }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={country?.image}
                                  alt={country?.title}
                                  width={"36px"}
                                  height={"32px"}
                                  style={{ borderRadius: "6px" }}
                                />
                                <span>{country?.title}</span>
                              </div>
                              <div className="d-flex gap-3">
                                <button
                                  className="edit-icon-style"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowEditCountryModal(true);
                                    setSelectedCountry(country);
                                  }}
                                >
                                  <i className="fa-regular fa-edit"></i>
                                </button>
                                <button
                                  className="delete-icon-style"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteCountryModal(true);
                                    setSelectedCountry(country);
                                  }}
                                >
                                  <i className="fa-regular fa-trash"></i>
                                </button>

                                <span className="border px-2 rounded-2">
                                  {" "}
                                  {country?.code}{" "}
                                </span>
                                <div className="arrow-icon">
                                  <i className="fa-solid fa-angle-left"></i>
                                </div>
                              </div>
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
                                      <div key={city?.id} className="tag-item">
                                        {city?.title}
                                        <div className="d-flex gap-3">
                                          <button
                                            className="edit-icon-style"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowEditCityModal(true);
                                              setSelectedCity(city);
                                            }}
                                          >
                                            <i className="fa-regular fa-edit"></i>
                                          </button>
                                          <button
                                            className="delete-icon-style"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowDeleteCityModal(true);
                                              setSelectedCity(city);
                                            }}
                                          >
                                            <i className="fa-regular fa-trash"></i>
                                          </button>

                                          <span className="border px-2 rounded-2">
                                            {" "}
                                            {city?.code}
                                          </span>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-muted">
                                      <p className="text-muted">
                                        {t(
                                          "dashboard.operatingRegions.noCities"
                                        )}
                                      </p>
                                    </p>
                                  )}
                                </div>
                              )}
                            </AccordionBody>
                          </Accordion.Item>
                        ))
                      ) : (
                        <p className="text-muted">
                          {t("dashboard.operatingRegions.noCountries")}
                        </p>
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
      {showDeleteCountryModal && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteRegion}
          setShowDeleteModal={setShowDeleteRegionModal}
          showDeleteModal={showDeleteRegionModal}
          loading={isDeletingRegion}
        />
      )}
      {showDeleteCountryModal && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteCountry}
          setShowDeleteModal={setShowDeleteCountryModal}
          showDeleteModal={showDeleteCountryModal}
          loading={isDeletingCountry}
        />
      )}
      {showDeleteCityModal && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteCity}
          setShowDeleteModal={setShowDeleteCityModal}
          showDeleteModal={showDeleteCityModal}
          loading={isDeletingCity}
        />
      )}

      {showEditRegionModal && (
        <EditRegionModal
          showModal={showEditRegionModal}
          setShowModal={setShowEditRegionModal}
          selectedRegion={selectedRegion}
        />
      )}
      {showEditCountryModal && (
        <EditCountryModal
          showModal={showEditCountryModal}
          setShowModal={setShowEditCountryModal}
          selectedCountry={selectedCountry}
        />
      )}
      {showEditCityModal && (
        <EditCityModal
          showModal={showEditCityModal}
          setShowModal={setShowEditCityModal}
          selectedCity={selectedCity}
        />
      )}
    </ChartCard>
  );
}
