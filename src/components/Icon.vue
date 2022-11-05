<script>
export default {
    props: ['use']
}
</script>

<template>
    <svg>
        <use :xlink:href="use"/>
    </svg>
</template>