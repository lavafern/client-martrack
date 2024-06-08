<template>
    <div>

        <h1 id="w">hello {{ name }}</h1>
        <input v-model="target" type="text">
        <button @click="movePoint">move point</button>
        <p>{{ rerender.toString() }}</p>
        <div id="viewDiv"></div>

    </div>
</template>

<script>
    import control from "./index.js"
    export default control
</script>

<style src="./style.css" scoped></style>
