# TokenListGovernance









## Methods

### UPDATE_MEMBERS_PERMISSION_ID

```solidity
function UPDATE_MEMBERS_PERMISSION_ID() external view returns (bytes32)
```

The ID of the permission required to call the `addMembers` and `removeMembers` functions.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### UPDATE_VOTING_SETTINGS_PERMISSION_ID

```solidity
function UPDATE_VOTING_SETTINGS_PERMISSION_ID() external view returns (bytes32)
```

The ID of the permission required to call the `updateVotingSettings` function.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### UPGRADE_PLUGIN_PERMISSION_ID

```solidity
function UPGRADE_PLUGIN_PERMISSION_ID() external view returns (bytes32)
```

The ID of the permission required to call the `_authorizeUpgrade` function.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### addMembers

```solidity
function addMembers(uint256[] _members) external nonpayable
```

Adds new members to the token list.

*This function is used during the plugin initialization.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _members | uint256[] | The Members of members to be added. |

### canExecute

```solidity
function canExecute(uint256 _proposalId) external view returns (bool)
```

Checks if a proposal can be executed.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal to be checked. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | True if the proposal can be executed, false otherwise. |

### canVote

```solidity
function canVote(uint256 _proposalId, uint256 _account, enum ITokenMajorityVoting.VoteOption _voteOption) external view returns (bool)
```

Checks if an account can participate on a proposal vote. This can be because the vote - has not started, - has ended, - was executed, or - the voter doesn&#39;t have voting powers.

*The function assumes the queried proposal exists.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The proposal Id. |
| _account | uint256 | The account tokenId to be checked. |
| _voteOption | enum ITokenMajorityVoting.VoteOption | Whether the voter abstains, supports or opposes the proposal. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns true if the account is allowed to vote. |

### createPluginProposal

```solidity
function createPluginProposal(bytes _metadata, IDAO.Action[] _actions, uint256 _allowFailureMap, uint64 _startDate, uint64 _endDate) external nonpayable returns (uint256 proposalId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _metadata | bytes | undefined |
| _actions | IDAO.Action[] | undefined |
| _allowFailureMap | uint256 | undefined |
| _startDate | uint64 | undefined |
| _endDate | uint64 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| proposalId | uint256 | undefined |

### createProposal

```solidity
function createProposal(bytes _metadata, IDAO.Action[] _actions, uint256 _allowFailureMap, uint64 _startDate, uint64 _endDate, enum ITokenMajorityVoting.VoteOption _voteOption, bool _tryEarlyExecution, uint256 _tokenId) external nonpayable returns (uint256 proposalId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _metadata | bytes | undefined |
| _actions | IDAO.Action[] | undefined |
| _allowFailureMap | uint256 | undefined |
| _startDate | uint64 | undefined |
| _endDate | uint64 | undefined |
| _voteOption | enum ITokenMajorityVoting.VoteOption | undefined |
| _tryEarlyExecution | bool | undefined |
| _tokenId | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| proposalId | uint256 | undefined |

### dao

```solidity
function dao() external view returns (contract IDAO)
```

Returns the DAO contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IDAO | The DAO contract. |

### execute

```solidity
function execute(uint256 _proposalId) external nonpayable
```

Executes a proposal.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal to be executed. |

### getProposal

```solidity
function getProposal(uint256 _proposalId) external view returns (bool open, bool executed, struct TokenMajorityVotingBase.ProposalParameters parameters, struct TokenMajorityVotingBase.Tally tally, struct IDAO.Action[] actions, uint256 allowFailureMap)
```

Returns all information for a proposal vote by its ID.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal. |

#### Returns

| Name | Type | Description |
|---|---|---|
| open | bool | Whether the proposal is open or not. |
| executed | bool | Whether the proposal is executed or not. |
| parameters | TokenMajorityVotingBase.ProposalParameters | The parameters of the proposal vote. |
| tally | TokenMajorityVotingBase.Tally | The current tally of the proposal vote. |
| actions | IDAO.Action[] | The actions to be executed in the associated DAO after the proposal has passed. |
| allowFailureMap | uint256 | The bit map representations of which actions are allowed to revert so tx still succeeds. |

### getVoteOption

```solidity
function getVoteOption(uint256 _proposalId, uint256 _account) external view returns (enum ITokenMajorityVoting.VoteOption)
```

Returns whether the account has voted for the proposal.  Note, that this does not check if the account has voting power.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal. |
| _account | uint256 | The account tokenId to be checked. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum ITokenMajorityVoting.VoteOption | The vote option cast by a voter for a certain proposal. |

### implementation

```solidity
function implementation() external view returns (address)
```

Returns the address of the implementation contract in the [proxy storage slot](https://eips.ethereum.org/EIPS/eip-1967) slot the [UUPS proxy](https://eips.ethereum.org/EIPS/eip-1822) is pointing to.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the implementation contract. |

### initialize

```solidity
function initialize(contract IDAO _dao, TokenMajorityVotingBase.VotingSettings _votingSettings, contract IERC721 _tokenCollection, uint256[] _members) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | contract IDAO | undefined |
| _votingSettings | TokenMajorityVotingBase.VotingSettings | undefined |
| _tokenCollection | contract IERC721 | undefined |
| _members | uint256[] | undefined |

### isListed

```solidity
function isListed(uint256 _tokenId) external view returns (bool)
```

Checks if a tokenId is currently on the address list.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | The tokenId being checked. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Whether the tokenId is currently listed. |

### isListedAtBlock

```solidity
function isListedAtBlock(uint256 _tokenId, uint256 _blockNumber) external view returns (bool)
```

Checks if a tokenId is on the address list at a specific block number.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | The tokenId being checked. |
| _blockNumber | uint256 | The block number. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Whether the tokenId is listed at the specified block number. |

### isMember

```solidity
function isMember(uint256 _account) external view returns (bool)
```

Checks if an account is a member of the DAO.

*This function must be implemented in the plugin contract that introduces the members to the DAO.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _account | uint256 | The tokenId of the account to be checked. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Whether the account is a member or not. |

### isMinParticipationReached

```solidity
function isMinParticipationReached(uint256 _proposalId) external view returns (bool)
```

Checks if the participation value defined as $$\texttt{participation} = \frac{N_\text{yes}+N_\text{no}+N_\text{abstain}}{N_\text{total}}$$ for a proposal vote is greater or equal than the minimum participation value.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns `true` if the participation is greater than the minimum participation and `false` otherwise. |

### isSupportThresholdReached

```solidity
function isSupportThresholdReached(uint256 _proposalId) external view returns (bool)
```

Checks if the support value defined as $$\texttt{support} = \frac{N_\text{yes}}{N_\text{yes}+N_\text{no}}$$ for a proposal vote is greater than the support threshold.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns `true` if the  support is greater than the support threshold and `false` otherwise. |

### isSupportThresholdReachedEarly

```solidity
function isSupportThresholdReachedEarly(uint256 _proposalId) external view returns (bool)
```

Checks if the worst-case support value defined as $$\texttt{worstCaseSupport} = \frac{N_\text{yes}}{ N_\text{total}-N_\text{abstain}}$$ for a proposal vote is greater than the support threshold.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns `true` if the worst-case support is greater than the support threshold and `false` otherwise. |

### minDuration

```solidity
function minDuration() external view returns (uint64)
```

Returns the minimum duration parameter stored in the voting settings.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint64 | The minimum duration parameter. |

### minParticipation

```solidity
function minParticipation() external view returns (uint32)
```

Returns the minimum participation parameter stored in the voting settings.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | The minimum participation parameter. |

### minProposerVotingPower

```solidity
function minProposerVotingPower() external view returns (uint256)
```

Returns the minimum voting power required to create a proposal stored in the voting settings.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The minimum voting power required to create a proposal. |

### pluginType

```solidity
function pluginType() external pure returns (enum IPlugin.PluginType)
```

Returns the plugin&#39;s type




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum IPlugin.PluginType | undefined |

### proposalCount

```solidity
function proposalCount() external view returns (uint256)
```

Returns the proposal count determining the next proposal ID.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The proposal count. |

### proxiableUUID

```solidity
function proxiableUUID() external view returns (bytes32)
```



*Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation&#39;s compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### removeMembers

```solidity
function removeMembers(uint256[] _members) external nonpayable
```

Removes existing members from the token list.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _members | uint256[] | The Members of the members to be removed. |

### supportThreshold

```solidity
function supportThreshold() external view returns (uint32)
```

Returns the support threshold parameter stored in the voting settings.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint32 | The support threshold parameter. |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) external view returns (bool)
```

Checks if this or the parent contract supports an interface by its ID.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _interfaceId | bytes4 | The ID of the interface. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns `true` if the interface is supported. |

### tokenlistLength

```solidity
function tokenlistLength() external view returns (uint256)
```

Returns the current length of the token list.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The current token list length. |

### tokenlistLengthAtBlock

```solidity
function tokenlistLengthAtBlock(uint256 _blockNumber) external view returns (uint256)
```

Returns the length of the token list at a specific block number.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _blockNumber | uint256 | The specific block to get the count from. If `0`, then the latest checkpoint value is returned. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The token list length at the specified block number. |

### totalVotingPower

```solidity
function totalVotingPower(uint256 _blockNumber) external view returns (uint256)
```

Returns the total voting power checkpointed for a specific block number.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _blockNumber | uint256 | The block number. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The total voting power. |

### updateVotingSettings

```solidity
function updateVotingSettings(TokenMajorityVotingBase.VotingSettings _votingSettings) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _votingSettings | TokenMajorityVotingBase.VotingSettings | undefined |

### upgradeTo

```solidity
function upgradeTo(address newImplementation) external nonpayable
```



*Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newImplementation | address | undefined |

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes data) external payable
```



*Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newImplementation | address | undefined |
| data | bytes | undefined |

### vote

```solidity
function vote(uint256 _proposalId, enum ITokenMajorityVoting.VoteOption _voteOption, bool _tryEarlyExecution, uint256 _tokenId) external nonpayable
```

Votes for a vote option and, optionally, executes the proposal.

*`_voteOption`, 1 -&gt; abstain, 2 -&gt; yes, 3 -&gt; no*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _proposalId | uint256 | The ID of the proposal. |
| _voteOption | enum ITokenMajorityVoting.VoteOption | The chosen vote option. |
| _tryEarlyExecution | bool | If `true`,  early execution is tried after the vote cast. The call does not revert if early execution is not possible. |
| _tokenId | uint256 | TokenId to use for this vote. |

### votingMode

```solidity
function votingMode() external view returns (enum TokenMajorityVotingBase.VotingMode)
```

Returns the vote mode stored in the voting settings.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum TokenMajorityVotingBase.VotingMode | The vote mode parameter. |



## Events

### AdminChanged

```solidity
event AdminChanged(address previousAdmin, address newAdmin)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousAdmin  | address | undefined |
| newAdmin  | address | undefined |

### BeaconUpgraded

```solidity
event BeaconUpgraded(address indexed beacon)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| beacon `indexed` | address | undefined |

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### MembersAdded

```solidity
event MembersAdded(uint256[] members)
```

Emitted when members are added to the DAO plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| members  | uint256[] | undefined |

### MembersRemoved

```solidity
event MembersRemoved(uint256[] members)
```

Emitted when members are removed from the DAO plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| members  | uint256[] | undefined |

### MembershipContractAnnounced

```solidity
event MembershipContractAnnounced(address indexed definingContract)
```

Emitted to announce the membership being defined by a contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| definingContract `indexed` | address | undefined |

### ProposalCreated

```solidity
event ProposalCreated(uint256 indexed proposalId, address indexed creator, uint64 startDate, uint64 endDate, bytes metadata, IDAO.Action[] actions, uint256 allowFailureMap)
```

Emitted when a proposal is created.



#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId `indexed` | uint256 | undefined |
| creator `indexed` | address | undefined |
| startDate  | uint64 | undefined |
| endDate  | uint64 | undefined |
| metadata  | bytes | undefined |
| actions  | IDAO.Action[] | undefined |
| allowFailureMap  | uint256 | undefined |

### ProposalExecuted

```solidity
event ProposalExecuted(uint256 indexed proposalId)
```

Emitted when a proposal is executed.



#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId `indexed` | uint256 | undefined |

### TokensAdded

```solidity
event TokensAdded(uint256[] tokens)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens  | uint256[] | undefined |

### TokensRemoved

```solidity
event TokensRemoved(uint256[] tokens)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens  | uint256[] | undefined |

### Upgraded

```solidity
event Upgraded(address indexed implementation)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| implementation `indexed` | address | undefined |

### VoteCast

```solidity
event VoteCast(uint256 indexed proposalId, uint256 indexed voter, enum ITokenMajorityVoting.VoteOption voteOption, uint256 votingPower)
```

Emitted when a vote is cast by a voter.



#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId `indexed` | uint256 | undefined |
| voter `indexed` | uint256 | undefined |
| voteOption  | enum ITokenMajorityVoting.VoteOption | undefined |
| votingPower  | uint256 | undefined |

### VotingSettingsUpdated

```solidity
event VotingSettingsUpdated(enum TokenMajorityVotingBase.VotingMode votingMode, uint32 supportThreshold, uint32 minParticipation, uint64 minDuration, uint256 minProposerVotingPower)
```

Emitted when the voting settings are updated.



#### Parameters

| Name | Type | Description |
|---|---|---|
| votingMode  | enum TokenMajorityVotingBase.VotingMode | undefined |
| supportThreshold  | uint32 | undefined |
| minParticipation  | uint32 | undefined |
| minDuration  | uint64 | undefined |
| minProposerVotingPower  | uint256 | undefined |



## Errors

### DaoUnauthorized

```solidity
error DaoUnauthorized(address dao, address where, address who, bytes32 permissionId)
```

Thrown if a call is unauthorized in the associated DAO.



#### Parameters

| Name | Type | Description |
|---|---|---|
| dao | address | The associated DAO. |
| where | address | The context in which the authorization reverted. |
| who | address | The address (EOA or contract) missing the permission. |
| permissionId | bytes32 | The permission identifier. |

### DateOutOfBounds

```solidity
error DateOutOfBounds(uint64 limit, uint64 actual)
```

Thrown if a date is out of bounds.



#### Parameters

| Name | Type | Description |
|---|---|---|
| limit | uint64 | The limit value. |
| actual | uint64 | The actual value. |

### InvalidTokenlistUpdate

```solidity
error InvalidTokenlistUpdate(uint256 tokenId)
```

Thrown when the token list update is invalid, which can be caused by the addition of an existing tokenId or removal of a non-existing tokenId.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The first invalid tokenId. |

### MinDurationOutOfBounds

```solidity
error MinDurationOutOfBounds(uint64 limit, uint64 actual)
```

Thrown if the minimal duration value is out of bounds (less than one hour or greater than 1 year).



#### Parameters

| Name | Type | Description |
|---|---|---|
| limit | uint64 | The limit value. |
| actual | uint64 | The actual value. |

### ProposalCreationForbidden

```solidity
error ProposalCreationForbidden(uint256 sender)
```

Thrown when a sender is not allowed to create a proposal.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | uint256 | The sender tokenId. |

### ProposalExecutionForbidden

```solidity
error ProposalExecutionForbidden(uint256 proposalId)
```

Thrown if the proposal execution is forbidden.



#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId | uint256 | The ID of the proposal. |

### RatioOutOfBounds

```solidity
error RatioOutOfBounds(uint256 limit, uint256 actual)
```

Thrown if a ratio value exceeds the maximal value of `10**6`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| limit | uint256 | The maximal value. |
| actual | uint256 | The actual value. |

### TokenNotOwnedBySender

```solidity
error TokenNotOwnedBySender(uint256 tokenId, address sender)
```

Thrown if the given tokenId is not owned by the sender.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The ID of the token. |
| sender | address | The address that made the call. |

### VoteCastForbidden

```solidity
error VoteCastForbidden(uint256 proposalId, uint256 account, enum ITokenMajorityVoting.VoteOption voteOption)
```

Thrown if an account is not allowed to cast a vote. This can be because the vote - has not started, - has ended, - was executed, or - the account doesn&#39;t have voting powers.



#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId | uint256 | The ID of the proposal. |
| account | uint256 | The tokenId of the _account. |
| voteOption | enum ITokenMajorityVoting.VoteOption | The chosen vote option. |


