import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

const MapModal = ({
  showModal,
  setShowModal,
  title,
  target,
  formData,
  setFormData,
  showLocationFirst,
}) => {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [markerPosition, setMarkerPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef(null);

  //   useEffect(() => {
  //     if (showLocationFirst) {
  //       if (target && formData?.[target]?.lat && formData?.[target]?.lng) {
  //         const position = {
  //           lat: Number(formData[target].lat),
  //           lng: Number(formData[target].lng),
  //         };
  //         if (isFinite(position.lat) && isFinite(position.lng)) {
  //           setMarkerPosition(position);
  //           reverseGeocodeMarkerPosition(position);
  //         }
  //       } else if (formData?.lat && formData?.lng) {
  //         const position = {
  //           lat: Number(formData.lat),
  //           lng: Number(formData.lng),
  //         };
  //         if (isFinite(position.lat) && isFinite(position.lng)) {
  //           setMarkerPosition(position);
  //           reverseGeocodeMarkerPosition(position);
  //         }
  //       }
  //     }
  //   }, [formData, target, showLocationFirst]);

  const handleMarkerDragEnd = (coord) => {
    setMarkerPosition(coord);
    if (target) {
      setFormData({
        ...formData,
        [target]: {
          lat: coord.lat.toFixed(6),
          lng: coord.lng.toFixed(6),
        },
      });
    } else {
      setFormData({
        ...formData,
        lat: coord.lat.toFixed(6),
        lng: coord.lng.toFixed(6),
      });
    }
    console.log(coord);
    reverseGeocodeMarkerPosition(coord);
  };

  const reverseGeocodeMarkerPosition = (position) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setSearchInput(results[0].formatted_address);
          //   setSearchedPlace(results[0].formatted_address);
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const handlePlaceSelect = () => {
    const places = searchBox.current.getPlaces();
    if (places.length > 0) {
      const selectedPlace = places[0];
      const position = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      setMarkerPosition(position);
      if (target) {
        setFormData({
          ...formData,
          [target]: {
            lat: position.lat.toFixed(6),
            lng: position.lng.toFixed(6),
          },
        });
      } else {
        setFormData({
          ...formData,
          lat: position.lat.toFixed(6),
          lng: position.lng.toFixed(6),
        });
      }
      setSearchInput(selectedPlace.name);
      //   setSearchedPlace(selectedPlace.name);
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <h6>{title}</h6>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-12 p-0 mb-2">
            <div className="map">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                  }}
                  zoom={10}
                  center={markerPosition}
                >
                  <Marker
                    icon="/sys-icons/map-pin.svg"
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={(e) => {
                      handleMarkerDragEnd({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      });
                    }}
                  />
                  <StandaloneSearchBox
                    onLoad={(ref) => (searchBox.current = ref)}
                    onPlacesChanged={handlePlaceSelect}
                  >
                    <input
                      type="search"
                      placeholder="Search places..."
                      className="mapSearchInput"
                      value={searchInput}
                      onChange={handleInputChange}
                      onKeyDown={handleSearchInputKeyPress}
                    />
                  </StandaloneSearchBox>
                </GoogleMap>
              )}
            </div>
          </div>

          <div className="col-12 p-0">
            <button
              className="button w-100"
              onClick={() => setShowModal(false)}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
