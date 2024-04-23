# Sample Hardhat Project

The purpose of this project is to be use for prototyping smart contracts. The final contract should be placed here as well as deployment and testing scripts.

Prerequisites:

```shell
npm install
```

Try running the following:

```shell
# CreateYourDevDotEnvFile
cp .env.example.development .env

# Compile
npx hardhat compile
# DeployTheContract
npx ts-node ./scripts/01_HRDiagnose_Deploy.ts 
```

In this case, the deployed contract address was: 0x0f70D3Fa22B98C1f47B9b10a74c32932C4f59c9E

Tests:
```shell
# RecordADiagnose
npx ts-node ./scripts/02_RecordDiagnose.ts 0x0f70D3Fa22B98C1f47B9b10a74c32932C4f59c9E QmbNvGV8vGQ2tPK995A5VZUECkJK77x3wryd8nEUmmtBjf "t-rex fractured arm"

# ListMyDiagnoses
npx ts-node ./scripts/03_GetMyDiagnoses.ts 0x0f70D3Fa22B98C1f47B9b10a74c32932C4f59c9E

# ListDiagnosesByPatient
npx ts-node ./scripts/04_GetPatientDiagnoses.ts 0x0f70D3Fa22B98C1f47B9b10a74c32932C4f59c9E 0x8757c7D953ea058baCDF82717Caf403Bd01F1099

# GetDiagnoseDetails
npx ts-node ./scripts/05_GetDiagnoseDetails.ts 0x0f70D3Fa22B98C1f47B9b10a74c32932C4f59c9E QmbNvGV8vGQ2tPK995A5VZUECkJK77x3wryd8nEUmmtBjf

```

---
