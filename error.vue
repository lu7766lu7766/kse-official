<template>
  <div
    class="flex min-h-screen items-center justify-center bg-background px-4 text-foreground"
  >
    <div class="max-w-md text-center">
      <h1 class="text-7xl font-bold text-foreground">
        {{ error.statusCode || 404 }}
      </h1>
      <h2 class="mt-4 text-xl font-semibold text-foreground">
        {{ error.statusCode === 404 ? "Page not found" : "Something went wrong" }}
      </h2>
      <p class="mt-2 text-sm text-muted-foreground">
        {{
          error.statusCode === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : "An unexpected error occurred."
        }}
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <button
          @click="handleError"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
        >
          Go home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: true,
  },
});

const handleError = () => clearError({ redirect: "/" });
</script>
