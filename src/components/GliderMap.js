import React  from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker} from 'react-google-maps';

const BELFAST_DEFAULT_LOCATION = {
  lat: 54.59742,
  lng: -5.92825
}

const GliderMap = withScriptjs(withGoogleMap((props) => {

  const {stops, selectedId, onSelect} = props;
  const {lat,lng} = selectedId && stops.find((x)=>x.id===selectedId)

  return (
    <GoogleMap
      defaultZoom={13}
      center={selectedId ? {lat,lng} : BELFAST_DEFAULT_LOCATION}
    >
      {stops.map(({lat, lng, name, id})=>(
        <Marker
          position={{lat,lng}}
          label={(id === selectedId) ? name : null }
          onClick={()=>onSelect(id)}
          labelStyle={{fontSize: 50}}
          opacity={ (id === selectedId) ? 1 : 0.2 }
        >
        </Marker>
      ))}
    </GoogleMap>
  )
}))

export default GliderMap;
