<script lang="ts">
  import classNames from "classnames";
  import { setContext } from "svelte";

  export let divClass: string = "relative overflow-x-auto overflow-y-auto";
  export let striped: boolean = false;
  export let hoverable: boolean = false;
  export let noborder: boolean = false;
  export let shadow: boolean = false;
  export let color:
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "default"
    | "custom" = "default";

  const colors = {
    default: "text-gray-500 dark:text-gray-400",
    blue: "text-blue-100 dark:text-blue-100",
    green: "text-green-100 dark:text-green-100",
    red: "text-red-100 dark:text-red-100",
    yellow: "text-yellow-100 dark:text-yellow-100",
    purple: "text-purple-100 dark:text-purple-100",
    custom: "",
  };

  $: setContext("striped", striped);
  $: setContext("hoverable", hoverable);
  $: setContext("noborder", noborder);
  $: setContext("color", color);
</script>

<div
  class={classNames(
    $$props.class,
    divClass,
    shadow && "shadow-md sm:rounded-lg"
  )}
>
  <table
    {...$$restProps}
    class={classNames("w-full text-left text-sm", colors[color])}
  >
    <slot />
  </table>
</div>
