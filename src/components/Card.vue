<script setup>
const props = defineProps({
    title: String,
});
</script>

<template>
    <div class="p-6 shadow border border-gray-100 rounded">
        <div v-if="$slots.title || title">
            <div class="flex items-center">
                <div class="flex-grow">
                    <slot name="title">
                        <div class="text-xl font-medium leading-5 text-gray-800">
                            {{ title }}
                        </div>
                    </slot>
                </div>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
