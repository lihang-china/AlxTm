/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-09-03 15:07:08
 * @LastEditors: Your Name
 * @LastEditTime: 2022-09-03 16:32:57
 */
import './style/index.scss'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useEffect } from 'react';
import {Circle, Fill, Stroke, Style} from 'ol/style';
export default function Gis() {
  useEffect(() => {
    initGis()
  }, [])
  const initGis = () => {
    const map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'Map',
    });
    const fill = new Fill({ color: [178, 99, 37, 0.5] })
    const stroke = new Stroke({
      color: '#3399CC',
      width: 1.25,
    });
    const styles = [
      new Style({
        image: new Circle({
          fill: fill,
          stroke: stroke,
          radius: 5,
        }),
        fill: fill,
        stroke: stroke,
      }),
    ];
  }
  return (
    <div className="gis app-container">
      <div id="Map"></div>
    </div>
  )
}
