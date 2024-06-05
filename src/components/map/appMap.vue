<template>
    <div>

        <h1 id="w">hello {{ name }}</h1>
        <!-- <input v-model="target" type="text"> -->
        <button @click="klikwou">move point</button>
        <button @click="addPointFeatureLayer">add point</button>
        <p>{{ rerender.toString() }}</p>
        <div id="viewDiv"></div>

    </div>
</template>

<script>
    import control from "./index.js"
    export default control
</script>

<style src="./style.css" scoped></style>
