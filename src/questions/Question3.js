import React, {useEffect, useState} from "react";
import Title from "antd/es/typography/Title";
import Endpoints from "../util/Endpoints";
import GliderMap from "../components/GliderMap";
import StopsTable from "../components/StopsTable";
import StopInfo from "../components/StopInfo";


/**
 * Displaying real-time metrics for our devices' locations and statuses is a critical component of our reporting strategy.
 * This allows us to provide accurate, live data to our clients.
 *
 * Using Translink's JourneyPlanner API, implement an MVP in React for a `real-time reporting dashboard`.
 * What exactly this consists of is up to you, but preferably it will include:
 * - A map component (or a *very* pretty table, lol)
 * - A way to locate/inspect stops
 * - A way to track buses
 * - Information about the routes available
 *
 * As Translink's JourneyPlanner API is supposedly quite complex and undocumented (surprise surprise!) you may find this
 * package useful: https://github.com/McPo/belfast-glider-api-server
 *
 * This file contains the map component and two endpoints to obtain Stop data.
 */

export default function Question3 (props) {

  const [stops, setStops] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [stopInfo, setStopInfo] = useState(null);
  const [isLoadingStops, setIsLoadingStops] = useState(true);
  const [isLoadingStopInfo, setIsLoadingStopInfo] = useState(true);

  useEffect(() => {
    fetchStops();
  }, [])

  const fetchStops = () => {
    setIsLoadingStops(true);
    fetch(Endpoints.STOPS)
      .then(res => res.json())
      .then(newStops => {
        if (newStops.stops.length) {
          const sorted = newStops.stops.sort((x,y)=>x.lat-y.lat);
          setStops(sorted);
          const first = sorted[0].id;
          setSelectedId(first);
          fetchStopInfo(first);
          setIsLoadingStops(false);
        }
      })
      .catch(e => {
        console.log(e);
        setIsLoadingStops(false);
      })
  }

  const fetchStopInfo = (id) => {
    setIsLoadingStopInfo(true);
    fetch(Endpoints.STOP_INFO + '/' + id)
      .then(res => res.json())
      .then(stopInfo => {
        setStopInfo(stopInfo)
        setIsLoadingStopInfo(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoadingStopInfo(false);
      })
  }

  const onSelect = (id) => {
    setSelectedId(id);
    fetchStopInfo(id)
  }

  return (
    <div style={{display:'flex'}}>

      <div style={{marginRight: 20, width: '15%'}}>
        <Title>Stops</Title>
        <StopsTable
          dataSource={stops}
          onSelect={onSelect}
          selectedId={selectedId}
          loading={isLoadingStops}
        />
      </div>

      <div style={{width: '40%'}}>
        <Title>Stop Info</Title>
        <StopInfo
          dataSource={stopInfo}
          loading={isLoadingStopInfo}
        />
      </div>

      <div style={{width: '50%'}}>
        <Title>Map</Title>
        <GliderMap
          stops={stops}
          googleMapURL={Endpoints.GOOGLE_MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px`, margin: 20 }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      </div>


    </div>
  );
}
