import { ethers } from "hardhat";
import {
  HRDiagnose__factory,
  HRDiagnose,
} from "../typechain-types";
import { getProvider, getWallet } from "./Helpers";
import { string } from "hardhat/internal/core/params/argumentTypes";

let contract: HRDiagnose;

async function main() {
  console.log(`START\n`);

  //receiving parameters
  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Diagnose contract address and diagnose hash must be provided");
  const HRDiagnoseContractAddress = parameters[0];
  const diagnoseHash = parameters[1];

  console.log(
    `HRDiagnose contract address: ${HRDiagnoseContractAddress}. `
  );
  
  //inspecting data from public blockchains using RPC connections (configuring the provider)
  const provider = getProvider();
  const lastBlock = await provider.getBlock("latest");
  const lastBlockNumber = lastBlock?.number;
  console.log(`Last block number: ${lastBlockNumber}`);
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);
  console.log(
    `Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`
  );

  //configuring the wallet
  const wallet = getWallet(provider);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance} ETH`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  //attaching the smart contract using Typechain
  const contractFactory = new HRDiagnose__factory(wallet);
  contract = contractFactory.attach(
    HRDiagnoseContractAddress
  ) as HRDiagnose;

  const tx = await contract.diagnoses(diagnoseHash);
  const diagnose: string = tx[0];
  const diagnoseTimestamp: bigint = tx[1];

  // const { diagnose, timestamp  } = tx;
  console.log(`Diagnose details for hash ${diagnoseHash} are: diagnose=${diagnose}, timestamp=${diagnoseTimestamp}\n`);
  console.log('END');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
