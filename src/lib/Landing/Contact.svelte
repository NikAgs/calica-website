<script>
  import { goto } from "$app/navigation";
</script>

<div class="relative">
  <div aria-hidden="true" class="hidden sm:block">
    <svg
      class="absolute right-[70%]"
      width="404"
      height="392"
      fill="none"
      viewBox="0 0 404 392"
    >
      <defs>
        <pattern
          id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="4"
            height="4"
            class="text-gray-200"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        width="404"
        height="392"
        fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
      />
    </svg>
  </div>
  <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
    <div
      class="relative overflow-hidden rounded-2xl bg-primary-400 px-6 py-10 shadow-xl sm:px-12 sm:py-20"
    >
      <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
        <svg
          class="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1463 360"
        >
          <path
            class="text-primary-400 text-opacity-40"
            fill="currentColor"
            d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
          />
          <path
            class="text-primary-600 text-opacity-40"
            fill="currentColor"
            d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
          />
        </svg>
      </div>
      <div class="relative">
        <div class="sm:text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's get in touch
          </h2>
          <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-100">
            Interested in using Calica or want to see a demo?
          </p>
        </div>
        <form
          action="#"
          class="mt-12 sm:mx-auto sm:flex sm:max-w-lg sm:justify-center"
        >
          <div class="mt-4 sm:mt-0">
            <button
              on:click={() => {
                goto("/contact");
              }}
              type="submit"
              class="block w-full rounded-md border border-transparent bg-other-800 px-5 py-3 text-base font-medium text-white shadow hover:bg-other-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500 sm:px-10"
              >Contact Us</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
