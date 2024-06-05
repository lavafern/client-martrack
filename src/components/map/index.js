import ArgisConfig from "@arcgis/core/config"
import ArcgisMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import { appsocket } from "@/assets/socketio";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


export default {
    data() {
        return {
            name: 'rian',
            view: null,
            map: null,
            graphicsLayer : null,
            long: 118,
            target: null,
            socket : null,
            ready : false,
            rerender:false
        }
    },
    async created() {

        this.socket = appsocket

        
        console.log(this.socket);
    },
    async mounted() {
        this.assignApiKey()
        this.assignMap()
        this.assignMapView()
        this.addFeatureLayer()
        
        let self = this
        this.socket.on("ship-position",async function(arg) {
            if (!arg) {
                console.log('www');
            }
            if (self.ready) {
                self.addPointFeatureLayer()
            }
        })


        // setInterval(() => {
            // if(this.ready) {
// 
                // this.addPointFeatureLayer()
            // }
        // }, 1000);
        

        // console.log('layr>>',graphicsLayers.graphics);
        // console.log('lat>>',graphicsLayers.graphics.items[0].geometry.latitude);
        // console.log('long>>',graphicsLayers.graphics.items[0].geometry.longitude);
    },
    methods: {
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
        addGraphicLayer() {
            try {
                
                this.graphicsLayer = new GraphicsLayer();
                this.map.add(this.graphicsLayer);
                this.ready = true
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
                 console.log(pointGraphic2);
                this.FeatureLayer = new FeatureLayer({
                    source: [],
                    objectIdField: "ObjectID",
                    geometryType: "point"
                })
                this.map.add(this.FeatureLayer)
                this.ready = true
            } catch (err) {
                console.error('add feature layer error');
            }
        },
        async addPointFeatureLayer() {
            try {
                this.long+=0.1
                const point2 = { //Create a point
                    type: "point",
                    longitude: this.long,
                    latitude: -1.0
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

                 const pointGraphic2 = new Graphic({
                    geometry: point2,
                    symbol: simpleMarkerSymbol,
                    attributes: {
                        mmsi : '1112'
                    }
                 });

                const x = await this.FeatureLayer.applyEdits({
                    addFeatures: [pointGraphic2],
                 })

                console.log('layer updated >>',x);

            } catch (err) {
                console.error('err:',err);
            }
        },
        async addPoint() {
            try {
                this.long+=0.1
                const point = { //Create a point
                    type: "point",
                    longitude: 118.0,
                    latitude: -1.0
                 };
                const point2 = { //Create a point
                    type: "point",
                    longitude: this.long,
                    latitude: -1.0
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
                        mmsi : '1111'
                    }
                 });

                 const pointGraphic2 = new Graphic({
                    geometry: point2,
                    symbol: simpleMarkerSymbol,
                    attributes: {
                        mmsi : '1112'
                    }
                 });

                //  await this.graphicsLayer.add(pointGraphic);
                 await this.graphicsLayer.add(pointGraphic2);

                //  function updatePointPosition(longitude, latitude) {
                    const newPoint = {
                      type: "point",
                      longitude: 119.0,
                      latitude: -1.0
                    };
                  
                    // Update the geometry of the pointGraphic
                    pointGraphic.geometry = newPoint;

                    // this.ready = true
                //   }
            } catch (err) {
                console.log('err :',err);
            }

        },
        async movePoint() {
            // console.log(`target >${target}, lat >${lat}, long >${long}`);
            // const points = this.graphicsLayer.graphics.items
            // console.log(lat,long);
            // let changed = null
            // points.forEach((point) => {
                // if(point.attributes.mmsi === target) changed = point
            // });
            // await this.graphicsLayer.remove(changed)
            // changed.geometry.longitude+=0.01
            // changed.geometry.latitude = -1
            // await this.graphicsLayer.add(changed)

            console.log('before >>',this.graphicsLayer.graphics);
            const target = '1112'
            const points = this.graphicsLayer.graphics.items
            console.log('ww',this.graphicsLayer);
            console.log('available',points);
            let changed = null
            points.forEach((point) => {
                console.log(`${point.attributes.mmsi} = ${target}`);
                if(point.attributes.mmsi === target) changed = point
            });
            console.log('changed >>',changed);
            console.log('APP >>',this);
            if (changed) {

                await this.graphicsLayer.remove(changed)
                changed.geometry.longitude+=0.01
                changed.geometry.latitude = -1.0
    
                console.log('after >>',this.graphicsLayer.graphics);
            } else {
                console.log('no grapic found');

            }
            // this.graphicsLayer.add(changed)
        },
        async movePointManual() {
            if (!this.graphicsLayer || !this.view) {
                console.log('graphicsLayer or view is not initialized yet');
                return;
              }
            const target = '1112'
            const points = this.graphicsLayer.graphics.items
            console.log('ww',this.graphicsLayer);
            console.log('available',points);
            let changed = null
            points.forEach((point) => {
                console.log(`${point.attributes.mmsi} = ${target}`);
                if(point.attributes.mmsi === target) changed = point
            });
            console.log('changed >>',changed);
            console.log('APP MANUAN>>',this);
            await this.graphicsLayer.remove(changed)
            await this.view.whenLayerView(this.graphicsLayer)
            // changed.geometry.longitude += 0.1
            // changed.geometry.latitude = -1.0
            // this.graphicsLayer.add(changed)
        },
        klikwou() {
            this.rerender = true
        }
    },
    watch: {
        async rerender() {
            if (this.rerender == true) {
                console.log('WAATCHHEER');
                this.$nextTick(async () => {
                    await this.movePointManual();
                  });
                this.rerender = false
            }
        }
    }
}