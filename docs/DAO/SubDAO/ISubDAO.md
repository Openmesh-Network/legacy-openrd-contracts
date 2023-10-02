# ISubDAO









## Methods

### addSubDAO

```solidity
function addSubDAO(address _subDAO) external nonpayable
```

Adds an existing DAO as sub DAO.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _subDAO | address | The address of the DAO to add as sub DAO. |

### createSubDAO

```solidity
function createSubDAO(contract DAOFactory _daoFactory, DAOFactory.DAOSettings _daoSettings, DAOFactory.PluginSettings[] _pluginSettings) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _daoFactory | contract DAOFactory | undefined |
| _daoSettings | DAOFactory.DAOSettings | undefined |
| _pluginSettings | DAOFactory.PluginSettings[] | undefined |

### getSubDAO

```solidity
function getSubDAO(uint256 _index) external view returns (address subDAO)
```

Gets the address of a currently added sub DAO at a specific index.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _index | uint256 | The index of the sub DAO that you want the address of. |

#### Returns

| Name | Type | Description |
|---|---|---|
| subDAO | address | undefined |

### getSubDAOCount

```solidity
function getSubDAOCount() external view returns (uint256 count)
```

Gets the amount of sub DAOs currently added to this DAO.




#### Returns

| Name | Type | Description |
|---|---|---|
| count | uint256 | undefined |

### getSubDAOs

```solidity
function getSubDAOs() external view returns (address[] subDAOArray)
```

Gets the address of all currently added sub DAOs.




#### Returns

| Name | Type | Description |
|---|---|---|
| subDAOArray | address[] | undefined |

### removeSubDAO

```solidity
function removeSubDAO(uint256 _index) external nonpayable
```

Removes an existing DAO as sub DAO.

*If removing multiple in the same transaction, do it back to front (highest index first).*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _index | uint256 | The index of the DAO to remove as sub DAO. |




## Errors

### IndexOutOfBound

```solidity
error IndexOutOfBound(uint256 index, uint256 count)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | undefined |
| count | uint256 | undefined |


