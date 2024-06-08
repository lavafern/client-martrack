import ArgisConfig from "@arcgis/core/config"
import ArcgisMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
import Graphic from "@arcgis/core/Graphic"
import { appsocket } from "@/assets/socketio";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


export default {
    data() {
        return {
            name: 'hello',
            view: null,
            map: null,
            graphicsLayer : null,
            long: 118,
            target: null,
            socket : null,
            ready : false,
            rerender:false,
        }
    },
    async created() {
        this.socket = appsocket
    },
    async mounted() {
        this.assignApiKey()
        this.assignMap()
        this.assignMapView()
        this.addFeatureLayer()
        this.socketEvenListener()

    },
    methods: {
        socketEvenListener() {
            let self = this
            this.socket.on("ship-position",async function({mmsi,lat,long}) {
                // if (!arg) {
                    // console.log('www');
                // }
                console.log('socket data :',mmsi);
                if (self.ready) {
                    self.movePoint(mmsi,long,lat)
                }
             })
        },
        assignApiKey() {
            try {
                
                this.argisConfig = ArgisConfig
                this.argisConfig.apiKey =  "AAPK073c8deca2be405e95b769e20c1795b1t_jA8s8z05-lakn5k6jrrD-ocQajqX6CGVF6xMsiby37uh1sCh7rlNC59OJkcnG2";
            } catch (err) {
                console.log('err :',err);
            }
        },
        assignMap() {
            try {
                
                this.map = new ArcgisMap({
                    basemap: "arcgis-navigation"
                })
            } catch (err) {
                console.log('err :',err);
            }
        },
        assignMapView () {
            try {
                
                this.view = new MapView({
                    map: this.map,
                    container: 'viewDiv',
                    center: [120.0, -1.0], // Longitude, latitude
                    zoom: 5, // Zoom level
                })
            } catch (err) {
                console.log('err :',err);
            }
        },
        addFeatureLayer() {
            try {
                const point2 = { //Create a point
                    type: "point",
                    longitude: this.long,
                    latitude: -1.0
                 };

                //  const point = { //Create a point
                    // type: "point",
                    // longitude: 120,
                    // latitude: -1.0
                //  };

                 const simpleMarkerSymbol = {
                    type: "picture-marker",
                    url: 'https://www.shutterstock.com/shutterstock/photos/1689617212/display_1500/stock-vector-simple-ship-line-icon-stroke-pictogram-vector-illustration-isolated-on-a-white-background-1689617212.jpg',
                    // color: [226, 119, 40],  // Orange
                    // outline: {
                        // color: [255, 255, 255], // White
                        // width: 1
                    // }
                 };

                 const pointGraphic2 = new Graphic({
                    geometry: point2,
                    symbol: simpleMarkerSymbol,
                    attributes: {
                        mmsi : '1112'
                    }
                 });

                //  const pointGraphic = new Graphic({
                    // geometry: point,
                    // symbol: simpleMarkerSymbol,
                    // attributes: {
                        // mmsi : '1111'
                    // }
                //  });
                 console.log(pointGraphic2);
                this.FeatureLayer = new FeatureLayer({
                    source: [],
                    objectIdField: "ObjectID",
                    geometryType: "point",
                    fields:  [
                        {
                          name: "ObjectID",
                          alias: "ObjectID",
                          type: "oid"
                        },
                        {
                          name: "mmsi",
                          alias: "MMSI",
                          type: "string"
                        },
                        // add other fields as necessary
                    ]
                })
                this.map.add(this.FeatureLayer)
                this.ready = true
            } catch (err) {
                console.error('add feature layer error');
            }
        },
        async movePoint(mmsi,long,lat) {
            try {

                const points = await this.getAllPoints()
                const targetGraphic = this.selectSpescifiPoints(points,mmsi)

                let updateOption = {}

                if (!targetGraphic) {
                    const point = { //Create a point
                        type: "point",
                        longitude: long,
                        latitude: lat
                     };
    
                     const simpleMarkerSymbol = {
                        type: "picture-marker",
                        url: 'https://www.shutterstock.com/shutterstock/photos/1689617212/display_1500/stock-vector-simple-ship-line-icon-stroke-pictogram-vector-illustration-isolated-on-a-white-background-1689617212.jpg',
                        // color: [226, 119, 40],  // Orange
                        // outline: {
                            // color: [255, 255, 255], // White
                            // width: 1
                        // }
                     };

                     const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: simpleMarkerSymbol,
                        attributes: {
                            mmsi : mmsi
                        }
                     });

                     updateOption.addFeatures = [pointGraphic]

                     return  this.FeatureLayer.applyEdits(updateOption)
                }

                console.log('found targetgraphic :',targetGraphic);

                this.long+=0.01

                targetGraphic.geometry.longitude = long
                targetGraphic.geometry.latitude = lat

                updateOption.deleteFeatures = [targetGraphic]
                targetGraphic.geometry.longitude = long
                targetGraphic.geometry.latitude = lat
                updateOption.addFeatures = [targetGraphic]

                await this.FeatureLayer.applyEdits(updateOption)

                
                console.log('map >>',this.map);
                return

            } catch (err) {
                console.error('err:',err);
            }
        },
        async getAllPoints() {
            try {
                
                const query = await this.FeatureLayer.createQuery();
                query.where = "1 = 1";
                query.outFields = ["*"]
                const results = await this.FeatureLayer.queryFeatures(query);
                console.log('res :',results);
                return results.features
            } catch (err) {
                console.log('err in getallpoints:',err);
            }
        },
        selectSpescifiPoints(points,target) {
            try {
                let targetPoint;

                console.log('points:',points);

                points.forEach(point => {
    
                    console.log(`point ${point.attributes.mmsi} --- target ${target}`);
                    if (point.attributes.mmsi == target) targetPoint = point
                });
                
                console.log('targetpoint:',targetPoint);
                return targetPoint

            } catch (err) {
                console.log('err in selectspecific>',err);
            }
        }
    },
}