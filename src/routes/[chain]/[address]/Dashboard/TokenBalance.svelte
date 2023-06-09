<script lang="ts">
  import Button from "$lib/Flowbite/Button.svelte";
  import Card from "$lib/Flowbite/Card.svelte";
  import TokenIcon from "$lib/Icons/TokenIcon.svelte";
  import { getContractInstance } from "$lib/js/utils";
  import { page } from "$app/stores";
  import { signer } from "svelte-ethers-store";
  import {
    Dropdown,
    DropdownItem,
    InformationCircle,
    ToolbarButton,
    Tooltip,
  } from "flowbite-svelte";

  export let tokenBalances: any;
  export let expenses: any[];

  let contractType = $page.url.searchParams.get("type");

  async function distributeAllTokens() {
    let tokenAddresses = [];

    for (let [tokenAddress, tokenBalance] of Object.entries(tokenBalances)) {
      if (tokenBalance.balance > 0) {
        tokenAddresses.push(tokenAddress);
      }
    }

    if (contractType == "expense") {
      await reimburseExpenses(tokenAddresses);
    } else {
      await withdrawTokens(tokenAddresses);
    }
  }

  async function withdrawTokens(tokenAddresses: string[]) {
    // Hardcoding this with simpleRevShare for now
    let contract = getContractInstance(
      $page.params.address,
      "simpleRevShare",
      $signer
    );

    await contract.withdrawTokens(tokenAddresses);
  }

  async function reimburseExpenses(tokenAddresses: string[]) {
    let expenseIDs = [];

    for (let tokenAddress of tokenAddresses) {
      for (let i = 0; i < expenses.length; i++) {
        let expense = expenses[i];

        if (
          expense.tokenAddress == tokenAddress &&
          expense.amountPaid < expense.cost
        ) {
          expenseIDs.push(i);
        }
      }
    }

    if (expenseIDs.length > 0) {
      let contract = getContractInstance(
        $page.params.address,
        "expenseSubmission",
        $signer
      );

      await contract.reimburseExpenses(expenseIDs);
    }
  }

  async function sendAllToProfitAddress() {
    let tokenAddresses = [];

    for (let [tokenAddress, tokenBalance] of Object.entries(tokenBalances)) {
      if (tokenBalance.balance > 0) {
        tokenAddresses.push(tokenAddress);
      }
    }

    if (tokenAddresses.length == 0) return;

    let contract = getContractInstance(
      $page.params.address,
      "expenseSubmission",
      $signer
    );

    await contract.sendToProfitAddress(tokenAddresses);
  }

  async function swap() {
    let contract = getContractInstance(
      $page.params.address,
      "tokenSwap",
      $signer
    );

    contract.swap();
  }

  function hasExpenseBalanceForToken(tokenAddress: string) {
    for (let expense of expenses) {
      if (
        expense.tokenAddress == tokenAddress &&
        expense.amountPaid < expense.cost
      ) {
        return true;
      }
    }

    return false;
  }

  function canReimburseExpenses() {
    for (let [tokenAddress, tokenBalance] of Object.entries(tokenBalances)) {
      if (
        parseFloat(tokenBalance.balance) > 0 &&
        hasExpenseBalanceForToken(tokenAddress)
      ) {
        return true;
      }
    }

    return false;
  }

  function hasContractBalance() {
    for (let [tokenAddress, tokenBalance] of Object.entries(tokenBalances)) {
      if (parseFloat(tokenBalance.balance) > 0) {
        return true;
      }
    }

    return false;
  }
</script>

<Card class={`${$$props.class}`}>
  <div class="flex flex-row no-wrap justify-between">
    <h5>Contract Balances</h5>

    <ToolbarButton
      class="dots-menu text-gray-700 bg-white dark:text-white dark:bg-gray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        /></svg
      >
    </ToolbarButton>
    <Dropdown triggeredBy=".dots-menu">
      <div on:click={distributeAllTokens}>
        <DropdownItem
          class={contractType == "expense" && !canReimburseExpenses()
            ? "cursor-not-allowed "
            : ""}
          >{contractType == "expense"
            ? "Reimburse All Expenses"
            : "Withdraw All"}</DropdownItem
        >
      </div>
      {#if contractType == "expense"}
        <div on:click={sendAllToProfitAddress}>
          <DropdownItem
            class={!hasContractBalance() ? "cursor-not-allowed " : ""}
            >Send All to Profit Address</DropdownItem
          >
        </div>
      {/if}
      <div on:click={swap}>
        <DropdownItem class={!hasContractBalance() ? "cursor-not-allowed " : ""}
          >Swap</DropdownItem
        >
      </div>
    </Dropdown>
  </div>

  <div class="pr-[10px] mr-[-10px] mt-3 max-h-[97px] overflow-y-auto">
    {#each Object.entries(tokenBalances) as [tokenAddress, tokenBalance]}
      <div class="pt-1 mb-1 flex flex-row gap-x-6 justify-between">
        <div class="flex flex-row gap-x-2">
          <TokenIcon token={tokenBalance.symbol} />
          <p>{tokenBalance.symbol}</p>
        </div>

        <div class="flex flex-row items-center gap-x-5">
          <p>{tokenBalance.balance}</p>
          {#if contractType == "expense" && hasExpenseBalanceForToken(tokenAddress)}
            <Button
              on:click={async () => {
                if (contractType == "expense") {
                  await reimburseExpenses([tokenAddress]);
                } else {
                  await withdrawTokens([tokenAddress]);
                }
              }}
              outline
              class="w-14 h-6 text-xs"
              >Pay <div id="payButton">
                <InformationCircle size="16" />
              </div>
              <Tooltip style="dark" placement="bottom" triggeredBy="#payButton"
                >Pay all expenses in this currency</Tooltip
              ></Button
            >
          {/if}
        </div>
      </div>
    {/each}
  </div>
</Card>
