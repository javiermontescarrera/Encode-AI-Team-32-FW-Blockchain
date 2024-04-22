// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importing OpenZeppelin contracts
import "@openzeppelin/contracts/access/Ownable.sol";


contract HRDiagnose is Ownable {
    // using Strings for uint256;

    struct DiagnoseStruct {
        string diagnose;
        uint256 diagnoseTime;
    }
    mapping (string => DiagnoseStruct) public diagnoses;

    mapping (address => string[]) public patiendDiagnoses;

    event DiagnoseRecorded();

    constructor() Ownable() {
        
    }

    function recordDiagnose(string memory _ipfsHash, string memory _aiDiagnose) external{
        
        diagnoses[_ipfsHash] = DiagnoseStruct({
            diagnose: _aiDiagnose,
            diagnoseTime: block.timestamp
        });

        string[] memory pd = patiendDiagnoses[msg.sender];
        string[] memory newPD = new string[](pd.length + 1);
        
        for (uint i = 0; i < pd.length; i++) {
            newPD[i] = pd[i];
        }
        newPD[pd.length] = _ipfsHash;
        patiendDiagnoses[msg.sender] = newPD;

        emit DiagnoseRecorded();
    }

    function getPatientDiagnoses() public view onlyOwner returns (string[] memory) {
        string[] memory pd = patiendDiagnoses[msg.sender];
        string[] memory result = new string[](pd.length);
        
        for (uint i = 0; i < pd.length; i++) {
            result[i] = pd[i];
        }
        
        return result;
    }
}
