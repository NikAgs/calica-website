import { CONTRACT_TYPES, SUPPORTED_NETWORKS } from "$lib/js/globals";
import { getFactoryContract } from "$lib/js/utils";
import {
  getAlchemyProvider,
  getValidationCloudProvider,
} from "$lib/server/nodeProvider";
import { getContractDeployedEvents } from "$lib/server/utils";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const address = url.searchParams.get("address");

  let deployedContracts = [];

  for (let chain of SUPPORTED_NETWORKS) {
    let nodeProvider = getAlchemyProvider(chain);
    // let nodeProvider = getValidationCloudProvider(chain);

    for (let contractType of CONTRACT_TYPES) {
      try {
        let factoryName = getFactoryName(contractType);
        let factoryContract = getFactoryContract(
          factoryName,
          nodeProvider,
          chain
        );

        deployedContracts = [
          ...deployedContracts,
          ...(await getContractDeployedEvents(
            factoryContract,
            contractType,
            address,
            chain
          )),
        ];
      } catch (err) {
        let errorMessage =
          "There was a problem looking up deploy events for contractType: " +
          contractType +
          " on chain: " +
          chain;
        console.log(errorMessage);
        // throw error(500, errorMessage);
      }
    }
  }

  deployedContracts = deployedContracts.filter(
    (v, i, a) => a.findIndex((v2) => v2.cloneAddress === v.cloneAddress) === i
  );

  deployedContracts = deployedContracts.sort((c1, c2) => {
    return c1.blockNumber - c2.blockNumber;
  });

  return json(deployedContracts);
}

function getFactoryName(contractName: string) {
  switch (contractName) {
    case "expense":
      return "expenseSubmissionFactory";
    case "simple":
      return "simpleRevShareFactory";
    case "capped":
      return "cappedRevShareFactory";
    case "swap":
      return "tokenSwapFactory";
  }
}
